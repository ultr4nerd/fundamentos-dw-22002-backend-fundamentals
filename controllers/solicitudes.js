const Solicitud = require('../models/Solicitud');

let idCount = 1;
let idMascota = 7;

function crearSolicitud(request, response) {
  const solicitud = new Solicitud(idCount, idMascota);
  response.status(201).send(solicitud);
  idCount++;
  idMascota++;
}

function obtenerSolicitudes(req, res) {
  // Simulando dos solicitudes y respondiendolas
  var solicitud1 = new Solicitud(1, 7);
  var solicitud2 = new Solicitud(2, 8);
  res.send([solicitud1, solicitud2]);
}

function modificarSolicitud(req, res) {
  // simulando una solicitud previamente existente que el usuario modificará
  var solicitud = new Solicitud(1, 7);
  var modificaciones = req.body;
  solicitud = { ...solicitud, ...modificaciones };
  res.send(solicitud);
}

function eliminarSolicitud(req, res) {
  res.status(204).send({ message: `Solicitud eliminada` });
}

module.exports = {
  crearSolicitud,
  obtenerSolicitudes,
  modificarSolicitud,
  eliminarSolicitud,
};
