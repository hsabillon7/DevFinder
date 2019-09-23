exports.formularioNuevaVacante = (req, res) => {
  res.render("nuevaVacante", {
    nombrePagina: "Nueva vacante",
    tagline: "Llena el formulario y publica una nueva vacante"
  });
};
