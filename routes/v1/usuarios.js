const express = require('express');
const userControllers = require('../../controllers/usuarios');
const auth = require('../../config/auth');

const router = express.Router();

// GET /v1/usuarios
router.get('/', auth.requerido, userControllers.obtenerUsuario); // Mi perfil
// GET /v1/usuarios/:id
router.get('/:id', auth.requerido, userControllers.obtenerUsuario);  // Usuario con ID
// POST /v1/usuarios
router.post('/', auth.opcional, userControllers.crearUsuario);
// POST /v1/usuarios/ingresar
router.post('/ingresar', auth.opcional, userControllers.iniciarSesion);
// PUT /v1/usuarios/:id
router.put('/:id', auth.requerido, userControllers.modificarUsuario);
// DELETE /v1/usuarios/:id
router.delete('/:id', auth.requerido, userControllers.eliminarUsuario);

module.exports = router;
