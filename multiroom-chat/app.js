// importando configurações do servidor
var app = require("./config/server");

// escutando na porta 80
app.listen(80, function(){
    console.log("Server ON");
});