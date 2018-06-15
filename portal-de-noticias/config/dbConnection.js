var mysql = require("mysql");

var connMysql = function(){
        console.log("Conexao DB ON");
        return mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : '1234',
        database : 'portal_noticias'
    });
}

module.exports = function() {
    console.log("Modulo conexao DB ON")
    return connMysql;
};