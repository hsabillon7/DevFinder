const passport = require("passport");
const mongoose = require("mongoose");
const Vacante = mongoose.model("Vacante");

exports.autenticarUsuario = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/iniciarSesion",
  failureFlash: true,
  badRequestMessage: ["Debes ingresar ambos campos"]
});
