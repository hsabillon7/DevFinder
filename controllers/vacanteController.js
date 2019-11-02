const mongoose = require("mongoose");
const Vacante = mongoose.model("Vacante");
const multer = require("multer");
const shortid = require("shortid");

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

// Subir hojas de vida en PDF
exports.subirHojaVida = (req, res, next) => {
  upload(req, res, function(error) {
    if (error) {
      // Errores de multer
      if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
          req.flash("error", [
            "El tamaño del archivo es demasiado grande. Máximo 100Kb"
          ]);
        } else {
          req.flash("error", [error.message]);
        }
      } else {
        // Errores del usuario
        req.flash("error", [error.message]);
      }
      // Redireccionar
      res.redirect("/back");
      return;
    } else {
      return next();
    }
  });
};

// Opciones de configuracion de Multer
const configuracionMulter = {
  // Tamaño máximo del archivo en bytes
  limits: {
    fileSize: 100000
  },
  // Dónde se almacena la hoja de vida
  storage: (fileStorage = multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, __dirname + "../../public/uploads/hojasDeVida");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    }
  })),
  // Verificar que es una imagen válida mediante el mimetype
  // http://www.iana.org/assignments/media-types/media-types.xhtml
  fileFilter(req, file, cb) {
    if (file.mimetype === "application/pdf") {
      // El callback se ejecuta como true or false
      // se retorna true cuando se acepta la imagen
      cb(null, true);
    } else {
      cb(new Error("Formato de archivo no válido. Solo PDF."), false);
    }
  }
};

const upload = multer(configuracionMulter).single("hojaVida");

// Almacena los candidatos en la base de datos
exports.contactar = async (req, res, next) => {
  const vacante = await Vacante.findOne({ url: req.params.url });

  // Si no existe la vacante
  if (!vacante) return next();

  // Si existe la vacante, construir el objeto de tipo candidato
  const nuevoCandidato = {
    nombre: req.body.nombre,
    email: req.body.email,
    hojaVida: req.file.filename
  };

  // Almacenar la vacante
  // Agregar el candidato en la última posición del arreglo
  vacante.candidatos.push(nuevoCandidato);
  await vacante.save();

  // Mensaje flash y redireccionar
  req.flash("correcto", ["Tu hoja de vida ha sido envidada correctamente"]);
  res.redirect("/");
};

// Muestra los candidatos registrados a una vacante
exports.mostrarCandidatos = async (req, res, next) => {
  // Obtener la vacante
  const vacante = await Vacante.findById(req.params.id);

  // Si no se encuentra la vacante
  if (!vacante) return next();

  // Verificar que el usuario autenticado sea igual al autor de la vacante
  if (!vacante.autor.equals(req.user._id)) {
    return next();
  }

  res.render("candidatos", {
    nombrePagina: `Candidatos vacante - ${vacante.titulo}`,
    cerrarSesion: true,
    nombre: req.user.nombre,
    imagen: req.user.imagen,
    candidatos: vacante.candidatos
  });
};

// Buscador
exports.buscarVacantes = async (req, res) => {
  const vacantes = await Vacante.find({
    $text: {
      $search: req.body.q
    }
  });

  // Mostrar las vacantes
  res.render("home", {
    nombrePagina: `Resultados para la búsqueda: ${req.body.q}`,
    barra: true,
    vacantes
  });
};
