const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const vacanteController = require("../controllers/vacanteController");

module.exports = () => {
  router.get("/", homeController.mostrarTrabajos);
  router.get("/vacante/nueva", vacanteController.formularioNuevaVacante);
  router.post("/vacante/nueva", vacanteController.agregarVacante);

  // Mostrar una vacante
  router.get("/vacante/:url", vacanteController.mostrarVacante);

  // Editar una vacante
  router.get("/vacante/editar/:url", vacanteController.formularioEditarVacante);
  router.post("/vacante/editar/:url", vacanteController.editarVacante);

  return router;
};
