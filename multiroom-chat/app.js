// importando configurações do servidor
var app = require("./config/server");

// escutando na porta 80
var server = app.listen(3000, function(){
    console.log("Server ON");
});

var io = require("socket.io").listen(server);

app.set("io", io); // definindo variável global "io" com o valor da var io

// criando conexão por websocket
io.on("connection", function(socket){
    console.log("User online");

    socket.on("disconnect", function(){
        console.log("User offline");
    });

    socket.on("msgParaServer", function(data){
        socket.emit(
            "msgParaCliente",
            { apelido : data.apelido, mensagem : data.mensagem }
        );

        socket.broadcast.emit(
            "msgParaCliente",
            { apelido: data.apelido, mensagem: data.mensagem }
        );
    });
});