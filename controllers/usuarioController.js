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
  console.log(req.body);

  // Verificar que no existan errores de validación
  const errores = validationResult(req);
  const erroresArray = [];

  // Si hay errores
  if (!errores.isEmpty()) {
    errores.array().map(error => erroresArray.push(error.msg));

    // Enviar los errores de regreso al usuario
    req.flash("error", erroresArray);

    res.render("crearCuenta", {
      nombrePagina: "Crea tu cuenta en DevFinder",
      tagline: "¡Comienza a publicar tus vacantes de forma gratuita!",
      messages: req.flash()
    });
    return;
  }

  // Crear el usuario
  const usuario = new Usuario(req.body);

  // tratar de almacenar el usuario
  try {
    await usuario.save();
  } catch (error) {
    // Ingresar el error al arreglo de errores
    erroresArray.push(error);
    req.flash("error", erroresArray);

    // renderizar la página con los errores
    res.render("crearCuenta", {
      nombrePagina: "Crea tu cuenta en DevFinder",
      tagline: "¡Comienza a publicar tus vacantes de forma gratuita!",
      messages: req.flash()
    });
  }
};

// Mostrar el formulario de inicio de sesión
exports.formularioInicioSesion = (req, res) => {
  res.render("iniciarSesion", {
    nombrePagina: "Iniciar sesión en DevFinder"
  });
};
