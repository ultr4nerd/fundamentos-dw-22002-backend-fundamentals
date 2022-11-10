const passport = require('passport');
const Usuario = require('../models/Usuario');

function crearUsuario(req, res, next) {
  const body = req.body,
    password = body.password;

  delete body.password;
  const usuario = new Usuario(body);
  usuario.hashearPassword(password);
  usuario
    .save()
    .then(user => {
      //Guardando nuevo usuario en MongoDB.
      return res.status(201).json(user.toAuthJSON());
    })
    .catch(next);
}

function obtenerUsuario(req, res, next) {
  const routeUserID = req.params.id;
  const userID = req.usuario.id; // Obteniendo usuario desde MongoDB.

  if (routeUserID && routeUserID !== userID) {
    Usuario.findById(userID, (err, user) => {
      if (err) {
        console.error(err);
        return res.sendStatus(400); // 400 - Bad Request
      }

      if (!user) {
        return res.sendStatus(401); // 401 - Unauthorized
      }

      return res.json(user.publicData());
    }).catch(next);
  } else {
    return res.json(req.usuario);
  }
}

function modificarUsuario(req, res, next) {
  console.log(req.usuario);
  Usuario.findById(req.usuario.id)
    .then(user => {
      if (!user) {
        return res.sendStatus(401);
      }
      let nuevaInfo = req.body;
      if (typeof nuevaInfo.username !== 'undefined')
        user.username = nuevaInfo.username;
      if (typeof nuevaInfo.bio !== 'undefined') user.bio = nuevaInfo.bio;
      if (typeof nuevaInfo.foto !== 'undefined') user.foto = nuevaInfo.foto;
      if (typeof nuevaInfo.ubicacion !== 'undefined')
        user.ubicacion = nuevaInfo.ubicacion;
      if (typeof nuevaInfo.telefono !== 'undefined')
        user.telefono = nuevaInfo.telefono;
      if (typeof nuevaInfo.password !== 'undefined')
        user.crearPassword(nuevaInfo.password);
      user
        .save()
        .then(updatedUser => {
          //Guardando usuario modificado en MongoDB.
          res.status(201).json(updatedUser.publicData());
        })
        .catch(next);
    })
    .catch(next);
}

function eliminarUsuario(req, res) {
  Usuario.findOneAndDelete({ _id: req.usuario.id }).then(r => {
    //Buscando y eliminando usuario en MongoDB.
    res.status(200).send(`Usuario ${req.params.id} eliminado: ${r}`);
  });
}

function iniciarSesion(req, res, next) {
  if (!req.body.email) {
    return res.status(422).json({ errors: { email: 'no puede estar vacío' } });
  }

  if (!req.body.password) {
    return res
      .status(422)
      .json({ errors: { password: 'no puede estar vacío' } });
  }

  passport.authenticate(
    'local',
    { session: false },
    function (err, user, info) {
      if (err) {
        return next(err);
      }

      if (user) {
        return res.json({ user: user.toAuthJSON() });
      } else {
        return res.status(422).json(info);
      }
    }
  )(req, res, next);
}

module.exports = {
  crearUsuario,
  obtenerUsuario,
  modificarUsuario,
  eliminarUsuario,
  iniciarSesion,
};
