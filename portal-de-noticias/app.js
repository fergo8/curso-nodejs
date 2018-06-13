var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home/index");
});

app.get("/formulario_adicao_noticia", function(req, res){
    res.render("admin/form_add_noticia");
});

app.get("/noticias", function(req, res){
    res.render("noticias/noticias");
});

// Servidor escutando a porta 3000
app.listen(3000, function(){
    console.log("Server ON");
});