const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const homeController = require("../controllers/homeController");
const vacanteController = require("../controllers/vacanteController");
const usuarioController = require("../controllers/usuarioController");
const authController = require("../controllers/authController");

module.exports = () => {
  router.get("/", homeController.mostrarTrabajos);
  router.get("/vacante/nueva", vacanteController.formularioNuevaVacante);
  router.post("/vacante/nueva", vacanteController.agregarVacante);

  // Mostrar una vacante
  router.get("/vacante/:url", vacanteController.mostrarVacante);

  // Editar una vacante
  router.get("/vacante/editar/:url", vacanteController.formularioEditarVacante);
  router.post("/vacante/editar/:url", vacanteController.editarVacante);

  // Crear un usuario
  router.get("/crearCuenta", usuarioController.formularioCrearCuenta);
  router.post(
    "/crearCuenta",
    [
      // Verificar los atributos del formulario
      // https://express-validator.github.io/docs/index.html
      check("nombre", "El nombre de usuario es requerido.")
        .not()
        .isEmpty()
        .escape(),
      check("email", "El correo electrónico es requerido.")
        .not()
        .isEmpty(),
      check("email", "El correo electrónico no es vålido.")
        .isEmail()
        .normalizeEmail(),
      check("password", "La contraseña es requerida.")
        .not()
        .isEmpty(),
      check("confirmpassword", "Debe ingresar la confirmación de tu contraseña")
        .not()
        .isEmpty(),
      check(
        "confirmpassword",
        "La confirmación de la contraseña no coincide con tu contraseña"
      ).custom((value, { req }) => value === req.body.password)
    ],
    usuarioController.agregarUsuario
  );

  // Iniciar sesión
  router.get("/iniciarSesion", usuarioController.formularioInicioSesion);
  router.post("/iniciarSesion", authController.autenticarUsuario);

  return router;
};
