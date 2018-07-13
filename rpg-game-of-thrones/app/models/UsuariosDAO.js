function UsuariosDAO(connection){
    this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
    this._connection.open(function(err, mongoclient){
        
    });
}

module.exports = function(){
    return UsuariosDAO;
}