const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const homeController = require("../controllers/homeController");
const vacanteController = require("../controllers/vacanteController");
const usuarioController = require("../controllers/usuarioController");
const authController = require("../controllers/authController");

module.exports = () => {
  router.get("/", homeController.mostrarTrabajos);
  router.get(
    "/vacante/nueva",
    authController.verificarUsuario,
    vacanteController.formularioNuevaVacante
  );
  router.post(
    "/vacante/nueva",
    authController.verificarUsuario,
    vacanteController.agregarVacante
  );

  // Mostrar una vacante
  router.get("/vacante/:url", vacanteController.mostrarVacante);

  // Editar una vacante
  router.get(
    "/vacante/editar/:url",
    authController.verificarUsuario,
    vacanteController.formularioEditarVacante
  );
  router.post(
    "/vacante/editar/:url",
    authController.verificarUsuario,
    vacanteController.editarVacante
  );

  // Eliminar una vacante
  router.delete("/vacante/eliminar/:id", vacanteController.eliminarVacante);

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

  // Cerrar sesión
  router.get("/cerrarSesion", authController.cerrarSesion);

  // Administrar vacantes
  router.get(
    "/administrar",
    authController.verificarUsuario,
    authController.administrarVacantes
  );

  // Editar el perfil del usuario
  router.get(
    "/editarPerfil",
    authController.verificarUsuario,
    usuarioController.formularioEditarPerfil
  );
  router.post(
    "/editarPerfil",
    authController.verificarUsuario,
    usuarioController.subirImagen,
    usuarioController.editarPerfil
  );

  // Recibir información de candidatos
  router.post(
    "/vacante/:url",
    vacanteController.subirHojaVida,
    vacanteController.contactar
  );

  // Muestra los candidatos por vacante
  router.get(
    "/candidatos/:id",
    authController.verificarUsuario,
    vacanteController.mostrarCandidatos
  );

  // Reestablecer la contraseña del usuario
  router.get(
    "/reestablecerPassword",
    authController.formularioReestablecerPassword
  );
  router.post("/reestablecerPassword", authController.enviarToken);

  return router;
};
