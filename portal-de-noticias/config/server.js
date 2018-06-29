var express = require("express");
var consign = require("consign");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");

var app = express();

// Indica o ejs como view engine do projeto
app.set("view engine", "ejs");

// Configurar path das views
app.set("views", "./app/views");

// Middlewares
app.use(express.static("./app/public"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(expressValidator());

// Configurar path das rotas
consign()
    .include("app/routes")
    .then("config/dbConnection.js")
    .then("app/models")
    .then("app/controllers")
    .into(app);

module.exports = app;