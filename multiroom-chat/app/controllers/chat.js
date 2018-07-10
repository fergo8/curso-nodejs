module.exports.iniciaChat = function(app, req, res){

    var dadosForm = req.body;
    
    req.assert("apelido", "Apelido é obrigatório").notEmpty();
    req.assert("apelido", "Apelido deve ter entre 3 e 15 caracteres").len(3,15);

    var erros = req.validationErrors();

    if(erros){
        res.render("index", {valid : erros});
        return;
    }

    app.get("io").emit(
        "msgParaCliente",
        {apelido : dadosForm.apelido, mensagem : " entrou no chat"}
    );

    res.render("chat", { dadosForm : dadosForm });
}