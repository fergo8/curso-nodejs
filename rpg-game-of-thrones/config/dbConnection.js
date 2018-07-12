// importando módulo mongoDB
var mongo = require("mongodb");

var connMongoDB = function(){
    console.log("Conexão com MongoDB estabelecida");
    var db = new mongo.Db(
        "got",              // nome do banco de dados
        new mongo.Server(   // objeto de conexão com o banco de dados
            "localhost",    // parâmetro 1: string com endereço do server
            27017,          // parâmetro 2: porta de conexão
            {}              // parâmetro 3: objeto de configurações adicionais
        ),
        {}                  // objeto de configurações adicionais
    );
    return db;
}

module.exports = function(){
    return connMongoDB;
}