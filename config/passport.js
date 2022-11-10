const passport = require('passport'); //Importando passport, middleware para autenticación.
const LocalStrategy = require('passport-local').Strategy; //Importando estrategia autenticación. --> passport-local
const Usuario = require('../models/Usuario');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    function (email, password, done) {
      Usuario.findOne({ email: email })
        .then(function (user) {
          if (!user || !user.validarPassword(password)) {
            return done(null, false, {
              errors: { 'email o contraseña': 'equivocado(a)' },
            });
          }
          return done(null, user);
        })
        .catch(done);
    }
  )
);
