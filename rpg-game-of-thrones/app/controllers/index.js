module.exports.index = function(app, req, res){
    res.render("index", { valid : {} } );
}

module.exports.autenticar = function(app, req, res){

    var dadosForm = req.body;

    req.assert("usuario", "Usuário não pode ficar vazio").notEmpty();
    req.assert("senha", "Senha não pode ficar vazia").notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.render("index", { valid : erros } );
        return;
    }

    var connection = app.config.dbConnection;
    var UsuariosDAO = new app.app.models.UsuariosDAO(connection);

    UsuariosDAO.autenticar(dadosForm, req, res);

}