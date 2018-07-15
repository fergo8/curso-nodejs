// importando módulos necessário ao projeto
var express = require("express");
var consign = require("consign");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");
var expressSession = require("express-session");

// instanciando servidor express
var app = express();

// setando variáveis globais "view engine" e "views"
app.set("view engine", "ejs");
app.set("views", "./app/views");

// implementando Middlewares
app.use(express.static("./app/public"));                // rota dos assets configurada
app.use(bodyParser.urlencoded({ extended : true }));    // body-parser configurado
app.use(expressValidator());                            // express-validator iniciado
app.use(expressSession({                                // express-session configurado
    secret : "wazxdesxcfrdcvgt",
    resave : false,
    saveUninitialized : false
}));

// implementando autoload
consign()
    .include("app/routes")
    .then("app/models")
    .then("app/controllers")
    .then("config/dbConnection.js")
    .into(app);

module.exports = app;