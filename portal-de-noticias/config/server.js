var express = require("express");
var app = express();

// Indica o ejs como view engine do projeto
app.set("view engine", "ejs");

// Configurar path das views
app.set("views", "./app/views");

module.exports = app;