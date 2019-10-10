const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const bcrypt = require("bcrypt");

// Definición del schema
const usuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  token: String,
  expira: Date
});
// Hooks (método) para hash + salt password
usuarioSchema.pre("save", function(next) {
  const user = this;

  // Si el password ya fué modificado (ya hasheado)
  if (!user.isModified("password")) {
    return next();
  }

  // Generar el salt y si no hay error, hashear el password
  // Se almacena tanto el hash+salt para evitar ataques
  // de rainbow table.
  bcrypt.genSalt(10, (err, salt) => {
    // Si hay un error no continuar
    if (err) return next(err);

    // Si se produjo el salt, realizar el hash
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

// Hooks para poder pasar los errores de MongoBD hacia express validator
usuarioSchema.post("save", function(error, doc, next) {
  // Verificar que es un error de MongoDB
  if (error.name === "MongoError" && error.code === 11000) {
    next(
      "Ya exite un usuario con la dirección de correo electrónico ingresada"
    );
  } else {
    next(error);
  }
});

module.exports = mongoose.model("Usuario", usuarioSchema);
