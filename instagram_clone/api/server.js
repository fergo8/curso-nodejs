var express = require("express"),
    bodyParser = require("body-parser"),
    mongodb = require("mongodb");

var app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

var port = 8080;

app.listen(port);

console.log("HTTP Server on port"+port);

app.get("/", function(req, res){
    res.send({ msg : "Olá" });
});