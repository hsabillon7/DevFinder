exports.mostrarTrabajos = (req, res) => {
  res.render("home", {
    nombrePagina: " DevFinder",
    tagline: "Encuentra y publica trabajos para desarrolladores",
    barra: true,
    boton: true
  });
};
