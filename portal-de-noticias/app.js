var app = require("./config/server");

// Organizando as rotas de cada página do portal
var rotaHome = require("./app/routes/home")(app);
var rotaFormulario = require("./app/routes/formulario_adicao_noticia")(app);
var rotaNoticias = require("./app/routes/noticias")(app);

// Servidor escutando a porta 3000
app.listen(3000, function(){
    console.log("Server ON");
});