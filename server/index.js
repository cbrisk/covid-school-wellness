require('dotenv/config');
const express = require('express');
const pg = require('pg');
const argon2 = require('argon2');
const dayjs = require ('dayjs');
const authenticateUser = require('./authenticate-user');
const authorizationMiddleware = require('./authorization-middleware');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');

const app = express();

app.use(staticMiddleware);

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

app.post('/api/sign-up', (req, res, next) => {
  const { name, username, password, role } = req.body;
  if (!name || !username || !password || !role) {
    throw new ClientError(400, 'name, username, password, and role are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("name", "username", "password", "role")
        values ($1, $2, $3, $4)
        on conflict ("username")
        do nothing
        returning "userId"
      `;
      const params = [name, username, hashedPassword, role];
      return db.query(sql, params)
        .then(result => {
          const [userId] = result.rows;
          if (!userId) {
            throw new ClientError(400, 'That username is not available.');
          }
          return authenticateUser(username, password, db)
            .then(result => {
              res.status(201).json(result);
            });
        });
    })
    .catch(err => {
      next(err);
    });
});

app.post('/api/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  authenticateUser(username, password, db)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      next(err);
    });
});

app.use(authorizationMiddleware);

app.get('/api/coming-today/date/:date', (req, res, next) => {
  const { userId } = req.user;
  const { date } = req.params;
  const sql = `
    select *
      from "dailyAttendees"
      where "userId" = $1
      and TO_CHAR("date", 'yyyy-mm-dd') = $2
  `;
  const params = [userId, date];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/stay-home', (req, res, next) => {
  const { userId } = req.user;
  const sql = `
    select *
      from "stayAtHome"
      where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      next(err);
    });
});

app.post('/api/coming-today', (req, res, next) => {
  const { userId } = req.user;
  const { date } = req.body;
  const sql = `
    insert into "dailyAttendees" ("userId", "date")
    values ($1, $2)
  `;
  const params = [userId, date];
  db.query(sql, params)
    .then(result => {
      res.sendStatus(201);
    })
    .catch(err => {
      next(err);
    });
});

app.post('/api/stay-home', (req, res, next) => {
  const { userId } = req.user;
  const { date } = req.body;
  const sql = `
    insert into "stayAtHome" ("userId", "returnDate")
    values ($1, $2)
  `;
  const params = [userId, date];
  db.query(sql, params)
    .then(result => {
      res.sendStatus(201);
    })
    .catch(err => {
      next(err);
    });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
