module.exports.jogo = function(app, req, res){
    
    if(req.session.autorizado !== true){
        res.send("Necessário realizar login");
        return;
    }

    var msg = "";

    if (req.query.msg != ""){
        msg = req.query.msg;
    }

    var usuario = req.session.usuario;
    var casa = req.session.casa;

    var connection = app.config.dbConnection;
    var JogoDAO = new app.app.models.JogoDAO(connection);

    JogoDAO.iniciarJogo(res, usuario, casa, msg);
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

    var connection = app.config.dbConnection;
    var JogoDAO = new app.app.models.JogoDAO(connection);

    var usuario = req.session.usuario;
    JogoDAO.getAcoes(res, usuario);
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
        res.redirect("jogo?msg=ERROR");
        return;
    }

    var connection = app.config.dbConnection;
    var JogoDAO = new app.app.models.JogoDAO(connection);

    dadosForm.usuario = req.session.usuario;
    JogoDAO.acao(dadosForm);

    res.redirect("jogo?msg=SUCCESS");
}

module.exports.revogar_ordem = function(app, req, res){
    if (req.session.autorizado !== true) {
        res.send("Necessário realizar login");
        return;
    }

    var url_query = req.query;

    var connection = app.config.dbConnection;
    var JogoDAO = new app.app.models.JogoDAO(connection);

    JogoDAO.revogarOrdem(url_query.id_acao, res);
}