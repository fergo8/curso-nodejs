module.exports.jogo = function(app, req, res){
    
    if(req.session.autorizado !== true){
        res.send("Necessário realizar login");
        return;
    }

    var comando_invalido = "N";

    if(comando_invalido == "S"){
        comando_invalido = "S"
    }

    var usuario = req.session.usuario;
    var casa = req.session.casa;

    var connection = app.config.dbConnection;
    var JogoDAO = new app.app.models.JogoDAO(connection);

    JogoDAO.iniciarJogo(res, usuario, casa, comando_invalido);
}

module.exports.sair = function(app, req, res){
    req.session.destroy(function(err){
        res.render("index", { valid : {} });
    });
}

module.exports.suditos = function(app, req, res){
    if (req.session.autorizado !== true) {
        res.send("Necessário realizar login");
        return;
    }

    res.render("aldeoes", { valid : {} });
}

module.exports.pergaminhos = function(app, req, res){
    if (req.session.autorizado !== true) {
        res.send("Necessário realizar login");
        return;
    }

    res.render("pergaminhos", { valid : {} });
}

module.exports.ordenar_acao_sudito = function(app, req, res){
    if (req.session.autorizado !== true) {
        res.send("Necessário realizar login");
        return;
    }

    var dadosForm = req.body;

    req.assert("acao", "Nenhuma ação escolhida").notEmpty();
    req.assert("quantidade", "Defina uma quantidade").notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.redirect("jogo?comando_invalido=S");
        return;
    }

    var connection = app.config.dbConnection;
    var JogoDAO = new app.app.models.JogoDAO(connection);

    dadosForm.usuario = req.session.usuario;
    JogoDAO.acao(dadosForm);

    res.send("Tudo ok!");
}