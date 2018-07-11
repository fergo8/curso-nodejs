// importando módulos necessário ao projeto
var express = require("express");
var consign = require("consign");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");

// instanciando servidor express
var app = express();

// setando variáveis globais "view engine" e "views"
app.set("view engine", "ejs");
app.set("views", "./app/views");

// implementando Middlewares
app.use(express.static("./app/public"));
app.use(bodyParser.urlencoded({ extended : true }));
app.use(expressValidator());

// implementando autoload
consign()
    .include("app/routes")
    .then("app/models")
    .then("app/controllers")
    .into(app);

module.exports = app;