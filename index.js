const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const router = require("./routes/index");

const app = express();

// Habilitar Handlebars como Template Engine
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "layout"
  })
);

app.set("view engine", "handlebars");

// Definir ruta para archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

app.use("/", router());

app.listen(8000);
