const mongoose = require("mongoose");
require("./config/db");
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const router = require("./routes/index");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const passport = require("./config/passport");

// Habilitando el archivo de variables de entorno
require("dotenv").config({ path: "variables.env" });

const app = express();

// Habilitar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Habilitar Handlebars como Template Engine
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "layout",
    helpers: require("./helpers/handlebars")
  })
);

app.set("view engine", "handlebars");

// Definir ruta para archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Creación de la sesión y de la cookie
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// Implementar passport
app.use(passport.initialize());
app.use(passport.session());

// Alertas y flash messages
app.use(flash());

// Crear nuestro middleware para los mensajes
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

app.use("/", router());

app.listen(process.env.PORT);
