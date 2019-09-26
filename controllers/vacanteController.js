const mongoose = require("mongoose");
const Vacante = mongoose.model("Vacante");

exports.formularioNuevaVacante = (req, res) => {
  res.render("nuevaVacante", {
    nombrePagina: "Nueva vacante",
    tagline: "Llena el formulario y publica una nueva vacante"
  });
};
// Opciones de querys Mongoose para CRUDS
// https://mongoosejs.com/docs/queries.html

// Agregar una nueva vacante a la base de datos
exports.agregarVacante = async (req, res) => {
  const vacante = new Vacante(req.body);

  // Crear el arreglo de skills
  vacante.skills = req.body.skills.split(",");

  // Almacenar en la base de datos
  const nuevaVacante = await vacante.save();

  // Redireccionar
  res.redirect(`/vacante/${nuevaVacante.url}`);
};

// Mostrar una vacante
exports.mostrarVacante = async (req, res, next) => {
  const vacante = await Vacante.findOne({ url: req.params.url });

  // Si no hay resultados
  if (!vacante) return next();

  res.render("vacante", {
    nombrePagina: vacante.titulo,
    barra: true,
    vacante
  });
};
