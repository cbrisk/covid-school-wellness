require('dotenv/config');
const express = require('express');
const pg = require('pg');
const argon2 = require('argon2');
const authenticateUser = require('./authenticate-user');
const authorizationMiddleware = require('./authorization-middleware');
const staticMiddleware = require('./static-middleware');

const app = express();

app.use(staticMiddleware);

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

app.post('/api/sign-up', (req, res, next) => {
  const { username, password, name } = req.body;
  if (!username || !password || !name) {
    throw new ClientError(400, 'name, username, password, and user-type are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("name", "username", "password", "role")
        values ($1, $2, $3)
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



app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
