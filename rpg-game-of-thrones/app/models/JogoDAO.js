function JogoDAO(connection){
    this._connection = connection();
}

JogoDAO.prototype.gerarParametros = function(usuario){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("jogo", function(err, collection){
            collection.insert( {
                usuario : usuario,
                moeda : 15,
                suditos : 10,
                temor : Math.floor(Math.random() * 1000),
                sabedoria: Math.floor(Math.random() * 1000),
                comercio: Math.floor(Math.random() * 1000),
                magia: Math.floor(Math.random() * 1000)
            } );
            mongoclient.close();
        });
    });
}

JogoDAO.prototype.iniciarJogo = function (res, usuario, casa, msg){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("jogo", function(err, collection){
            collection.find({ usuario : usuario }).toArray(function(err, result){
                
                res.render("jogo", {
                    img_casa: casa,
                    jogo: result[0],
                    msg: msg
                });
            });
            mongoclient.close();
        });
    });
}

JogoDAO.prototype.acao = function(acao){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("acao", function(err, collection){

            var date = new Date();
            var tempo = null;

            switch (parseInt(acao.acao)){
                case 1:
                    tempo = 1 * 60 * 60000;
                    break;
                case 2:
                    tempo = 2 * 60 * 60000;
                    break;
                case 3:
                    tempo = 5 * 60 * 60000;
                    break;
                case 4:
                    tempo = 5 * 60 * 60000;
                    break;
            }

            acao.acao_termina = date.getTime() + tempo;
            collection.insert(acao);
            mongoclient.close();
        });
    });
}

JogoDAO.prototype.getAcoes = function(res, usuario){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("acao", function(err, collection){
            collection.find({ usuario : usuario }).toArray(function(err, result){
                res.render("pergaminhos", { acoes : result });
            });
            mongoclient.close();
        });
    });
}

module.exports = function(){
    return JogoDAO;
}