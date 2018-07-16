module.exports.jogo = function(app, req, res){
    
    if(req.session.autorizado){
        res.render("jogo", { img_casa : req.session.casa });
    }
    else {
        res.send("Necessário realizar login");
    }
}

module.exports.sair = function(app, req, res){
    req.session.destroy(function(err){
        res.render("index", { valid : {} });
    });
}