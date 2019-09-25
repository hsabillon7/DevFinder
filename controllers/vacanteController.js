const mongoose = require("mongoose");
const Vacante = mongoose.model("Vacante");

exports.formularioNuevaVacante = (req, res) => {
  res.render("nuevaVacante", {
    nombrePagina: "Nueva vacante",
    tagline: "Llena el formulario y publica una nueva vacante"
  });
};

// Agregar una nueva vacante a la base de datos
exports.agregarVacante = async (req, res) => {};
