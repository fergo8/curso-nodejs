module.exports.jogo = function(app, req, res){
    
    if(req.session.autorizado !== true){
        res.send("Necessário realizar login");
        return;
    }

    var usuario = req.session.usuario;
    var casa = req.session.casa;

    var connection = app.config.dbConnection;
    var JogoDAO = new app.app.models.JogoDAO(connection);

    JogoDAO.iniciarJogo(res, usuario, casa);
}

module.exports.sair = function(app, req, res){
    req.session.destroy(function(err){
        res.render("index", { valid : {} });
    });
}