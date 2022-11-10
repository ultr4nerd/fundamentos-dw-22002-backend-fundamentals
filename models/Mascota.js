const mongoose = require('mongoose');

const mascotaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  categoria: { type: String, enum: ['perro', 'gato', 'otro'] },
  fotos: [String],
  descripcion: { type: String, required: true },
  anunciante: { type: mongoose.ObjectId, ref: 'Usuario' },
  ubicacion: String,
  estado: { type: String, enum: ['adoptado', 'disponible', 'pendiente'] },
});

mascotaSchema.methods.publicData = function () {
  return {
    id: this._id,
    nombre: this.nombre,
    categoria: this.categoria,
    fotos: this.fotos,
    descripcion: this.descripcion,
    anunciante: this.anunciante,
    ubicacion: this.ubicacion,
    estado: this.estado,
  };
};

module.exports = mongoose.model('Mascota', mascotaSchema);
