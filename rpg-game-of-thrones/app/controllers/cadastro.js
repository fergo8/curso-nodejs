module.exports.cadastro = function(app, req, res){
    res.render("cadastro", { valid : {}, dadosForm : {} });
}

module.exports.cadastrar = function (app, req, res) {
    
    var dadosForm = req.body;

    req.assert("nome", "Nome não pode ficar vazio").notEmpty();
    req.assert("usuario", "Usuário não pode ficar vazio").notEmpty();
    req.assert("senha", "Senha não pode ficar vazio").notEmpty();
    req.assert("casa", "Casa não pode ficar vazio").notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.render("cadastro", { valid : erros, dadosForm : dadosForm });
        return;
    }

    var connection = app.config.dbConnection;
    var UsuariosDAO = new app.app.models.UsuariosDAO(connection);
    UsuariosDAO.inserirUsuario(dadosForm);

    res.send("cadastrar");
}