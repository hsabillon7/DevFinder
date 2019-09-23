const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const vacanteController = require("../controllers/vacanteController");

module.exports = () => {
  router.get("/", homeController.mostrarTrabajos);
  router.get("/vacante/nueva", vacanteController.formularioNuevaVacante);

  return router;
};
