const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuario");

// Configurar la estrategia a utilizar
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      const usuario = await Usuario.findOne({ email });
      console.log(usuario);

      //   Si el usuario no existe
      if (!usuario) {
        return done(null, false, {
          message: ["El correo electrónico no es válido"]
        });
      }

      // El usuario existe, verificar si la contraseña es correcta
      const verificarPassword = usuario.compararPassword(password);

      //   Si el password es incorrecto
      if (!verificarPassword) {
        return done(null, false, {
          message: ["La contraseña ingresada es incorrecta"]
        });
      }

      //  El usuario existe y la contraseña es correcta
      return done(null, usuario);
    }
  )
);

passport.serializeUser((usuario, done) => done(null, usuario._id));

passport.deserializeUser(async (id, done) => {
  const usuario = await Usuario.findById(id).exec();

  return done(null, usuario);
});

module.exports = passport;
