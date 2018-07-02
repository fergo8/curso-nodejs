// importando módulos
var express = require("express");
var consign = require("consign");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");

// iniciando servidor
var app = express();

// setando variáveis "view engine" e "views" do express
app.set("view engine", "ejs");
app.set("views", "./app/views");

// iniciando middlewares
app.use(express.static("./app/public"));
app.use(bodyParser.urlencoded({extended : true}));
app.use(expressValidator());

// iniciando o autoload
consign()
    .include("./app/routes")
    .then("./app/models")
    .then("./app/controllers")
    .into(app);

// exportando o objeto app
module.exports = app;