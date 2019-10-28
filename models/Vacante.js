const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slug");
const shortid = require("shortid");

// Definición del schema
// https://mongoosejs.com/docs/guide.html#models
// Tipos de schemas en Mongoose
// https://mongoosejs.com/docs/schematypes.html
const vacanteSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: "El nombre de la vacante es requerido",
    trim: true
  },
  empresa: {
    type: String,
    trim: true
  },
  ubicacion: {
    type: String,
    required: " La ubicación de trabajo es requerida",
    trim: true
  },
  salario: {
    type: String,
    default: 0,
    trim: true
  },
  contrato: {
    type: String,
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  url: {
    type: String,
    lowercase: true
  },
  skills: [String],
  candidatos: [
    {
      nombre: String,
      email: String,
      hojaVida: String
    }
  ],
  autor: {
    type: mongoose.Schema.ObjectId,
    ref: "Usuario",
    required: "El autor es obligatorio"
  }
});
// Hooks para generar la URL (en Mongoose se conoce como middleware)
vacanteSchema.pre("save", function(next) {
  // Crear la URL
  const url = slug(this.titulo);
  this.url = `${url}-${shortid.generate()}`;

  next();
});

module.exports = mongoose.model("Vacante", vacanteSchema);
