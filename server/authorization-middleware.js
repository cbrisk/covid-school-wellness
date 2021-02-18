const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');

function authorizationMiddleware(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) {
    throw new ClientError(401, 'authentication required');
  }
  jwt
    .verify(token, process.env.TOKEN_SECRET, (err, result) => {
      if (err) {
        next(err);
      }
      req.user = result;
      next();
    });
}

module.exports = authorizationMiddleware;
