const mongoose = require("mongoose");
const Vacante = mongoose.model("Vacante");

exports.formularioNuevaVacante = (req, res) => {
  res.render("nuevaVacante", {
    nombrePagina: "Nueva vacante",
    tagline: "Llena el formulario y publica una nueva vacante",
    cerrarSesion: true,
    nombre: req.user.nombre
  });
};
// Opciones de querys Mongoose para CRUDS
// https://mongoosejs.com/docs/queries.html

// Agregar una nueva vacante a la base de datos
exports.agregarVacante = async (req, res) => {
  const vacante = new Vacante(req.body);

  // Agregrando el usuario que crea la vacante
  vacante.autor = req.user._id;

  // Crear el arreglo de skills
  vacante.skills = req.body.skills.split(",");

  // Almacenar en la base de datos
  const nuevaVacante = await vacante.save();

  // Redireccionar
  res.redirect(`/vacante/${nuevaVacante.url}`);
};

// Mostrar una vacante
exports.mostrarVacante = async (req, res, next) => {
  // Utilizar populate para obtener los datos del Object_ID
  const vacante = await Vacante.findOne({ url: req.params.url }).populate(
    "autor"
  );

  // Si no hay resultados
  if (!vacante) return next();

  res.render("vacante", {
    nombrePagina: vacante.titulo,
    barra: true,
    vacante
  });
};

// Muestra el formulario para editar una vacante
exports.formularioEditarVacante = async (req, res, next) => {
  const vacante = await Vacante.findOne({ url: req.params.url });

  // Si no existe la vacante
  if (!vacante) return next();

  res.render("editarVacante", {
    nombrePagina: `Editar ${vacante.titulo}`,
    vacante,
    cerrarSesion: true,
    nombre: req.user.nombre
  });
};

// Almacenar una vacante editada
exports.editarVacante = async (req, res, next) => {
  const vacanteEditada = req.body;

  // Convertir las skills a un arreglo de skills
  vacanteEditada.skills = req.body.skills.split(",");

  console.log(vacanteEditada);

  // Almacenar la vacante editada
  const vacante = await Vacante.findOneAndUpdate(
    { url: req.params.url },
    vacanteEditada,
    {
      new: true,
      runValidators: true
    }
  );

  res.redirect(`/vacante/${vacante.url}`);
};

// Eliminar una vacante
exports.eliminarVacante = async (req, res) => {
  // Obtener el id de la vacante
  const { id } = req.params;

  const vacante = await Vacante.findById(id);

  if (verificarUsuario(vacante, req.user)) {
    // El usuario es el autor de la vacante
    vacante.remove();
    res.status(200).send("La vacante ha sido eliminada correctamente");
  } else {
    // El usuario no es el autor, no permitir eliminación
    res.status(403).send("Error al momento de eliminar la vacante");
  }
};

// Verificar que el autor de una vacante sea el usuario enviado
const verificarUsuario = (vacante = {}, usuario = {}) => {
  if (!vacante.autor.equals(usuario._id)) {
    return false;
  }

  return true;
};
