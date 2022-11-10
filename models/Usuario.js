const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const config = require("../config")

const usuarioSchema = mongoose.Schema(
  {
    username: {
      //Definiendo cada campo con sus tipo sde datos y validaciones.
      type: String,
      unique: true, //este campo no se puede repetir
      lowercase: true,
      required: [true, 'no puede estar vacío'],
      match: [/^[a-zA-Z0-9]+$/, 'es inválido'],
      index: true,
    },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: {
      type: String,
      unique: true, //este campo no se puede repetir
      lowercase: true,
      required: [true, 'no puede estar vacío'],
      match: [/\S+@\S+\.\S+/, 'es inválido'],
      index: true,
    },
    ubicacion: String,
    telefono: String,
    bio: String,
    foto: String,
    tipo: { type: String, enum: ['normal', 'anunciante'] },
    hash: String, //este campo se utilizará para la sesión
    salt: String, //este campo se utilizará para la sesión
  },
  { timestamps: true }
);

// Plugins
usuarioSchema.plugin(uniqueValidator, { message: 'Ya existe' });

// Methods
usuarioSchema.methods.hashearPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex'); // generando un hash utilizando la sal
};

usuarioSchema.methods.validarPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
  return this.hash === hash;
};

usuarioSchema.methods.generarToken = function() {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 2); // 2 días antes de expirar

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, config.jwtSecret);
};

usuarioSchema.methods.toAuthJSON = function(){
  return {
    username: this.username,
    email: this.email,
    token: this.generarToken()
  };
};

usuarioSchema.methods.publicData = function(){
  return {
    id: this.id,
    username: this.username,
    email: this.email,
    nombre: this.nombre,
    apellido: this.apellido,
    bio: this.bio,
    foto: this.foto,
    tipo: this.tipo,
    ubicacion: this.ubicacion,
    telefono: this.telefono,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

module.exports = mongoose.model('Usuario', usuarioSchema);
