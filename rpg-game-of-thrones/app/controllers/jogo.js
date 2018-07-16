module.exports.jogo = function (app, req, res) {
    
    if(req.session.autenticado){
        res.render("jogo");
    }
    else {
        res.send("Necessário realizar login");
    }
}