var express = require("express");
var consign = require("consign");
var app = express();

// Indica o ejs como view engine do projeto
app.set("view engine", "ejs");

// Configurar path das views
app.set("views", "./app/views");

// Configurar path das rotas
consign()
    .include("app/routes")
    .then("config/dbConnection.js")
    .then("app/models")
    .into(app);

module.exports = app;