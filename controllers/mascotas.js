const Mascota = require('../models/Mascota');

function crearMascota(req, res) {
  const mascota = new Mascota(req.body);
  mascota.anunciante = req.usuario.id;
  mascota.estado = 'disponible';
  mascota.save().then(mascotaNueva => {
    res.status(201).json(mascotaNueva);
  });
}

function obtenerMascotas(req, res) {
  const mascotaId = req.params.id;

  if (mascotaId) {
    Mascota.findById(mascotaId, function (err, mascota) {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      return res.json(mascota);
    });
  } else {
    // Simulando dos mascotas y respondiendolas
    Mascota.find({}, function (err, docs) {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }

      return res.json(docs);
    });
  }
}

function modificarMascota(req, res) {
  // TODO: Completar
  res.json({ message: 'Incompleto' });
}

function eliminarMascota(req, res) {
  // TODO: Completar
  res.json({ message: 'Incompleto' });
}

module.exports = {
  crearMascota,
  obtenerMascotas,
  modificarMascota,
  eliminarMascota,
};
