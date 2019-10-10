const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuario");
const { validationResult } = require("express-validator");

// Caraga el formulario para la creación de una cuenta de usuario
exports.formularioCrearCuenta = (req, res) => {
  res.render("crearCuenta", {
    nombrePagina: "Crea tu cuenta en DevFinder",
    tagline: "¡Comienza a publicar tus vacantes de forma gratuita!"
  });
};

// Almacena una cuenta de usuario
exports.agregarUsuario = async (req, res, next) => {
  // Verificar que no existan errores de validación
  const errores = validationResult(req);
  const erroresArray = [];

  // Si hay errores
  if (!errores.isEmpty()) {
    errores.array().map(error => erroresArray.push(error.msg));

    // Enviar los errores de regreso al usuario
    req.flash("error", erroresArray);

    res.render("crearCuenta", {
      nombrePagina: "Crea tu ceunta en DevFinder",
      tagline: "¡Comienza a publicar tus vacantes de forma gratuita!",
      messages: req.flash()
    });
  }

  // Crear el usuario
  const usuario = new Usuario(req.body);

  // await usuario.save();

  res.redirect("/crearCuenta");
};
