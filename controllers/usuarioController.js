const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuario");

// Caraga el formulario para la creación de una cuenta de usuario
exports.formularioCrearCuenta = (req, res) => {
  res.render("crearCuenta", {
    nombrePagina: "Crea tu cuenta en DevFinder",
    tagline: "¡Comienza a publicar tus vacantes de forma gratuita!"
  });
};

// Almacena una cuenta de usuario
exports.agregarUsuario = async (req, res, next) => {
  // Crear el usuario
  const usuario = new Usuario(req.body);

  await usuario.save();

  res.redirect("/crearCuenta");
};
