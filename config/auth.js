const { expressjwt: jwt } = require('express-jwt');
const config = require('../config');

function getTokenFromHeader(req) {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }

  return null;
}

const estrategia = {
  secret: config.jwtSecret,
  algorithms: ['HS256'],
  requestProperty: 'usuario',
  getToken: getTokenFromHeader,
};

const auth = {
  requerido: jwt(estrategia),
  opcional: jwt({ ...estrategia, credentialsRequired: false }),
};

module.exports = auth;
