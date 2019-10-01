const mongoose = require("mongoose");
const Vacante = mongoose.model("Vacante");

exports.mostrarTrabajos = async (req, res, next) => {
  // Obtener todos los documentos de las vacantes
  const vacantes = await Vacante.find();

  console.log(vacantes);

  // Si no hay vacantes
  if (!vacantes) return next();

  res.render("home", {
    nombrePagina: " DevFinder",
    tagline: "Encuentra y publica trabajos para desarrolladores",
    barra: true,
    boton: true,
    vacantes
  });
};
