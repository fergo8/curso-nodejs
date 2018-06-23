module.exports.formulario_adicao_noticia = function(app, req, res){
    res.render("admin/form_add_noticia", {valid: {}, noticia: {}});
}

module.exports.noticias_salvar = function(app, req, res){
    var noticia = req.body;

    req.assert('titulo', 'Título precisa ser preenchido').notEmpty();
    req.assert('resumo', 'Resumo precisa ser preenchido').notEmpty();
    req.assert('resumo', 'Resumo deve conter entre 10 e 100 caracteres').len(10, 100);
    req.assert('autor', 'Autor precisa ser preenchido').notEmpty();
    req.assert('data_noticia', 'Data precisa ser preenchida').notEmpty();
    req.assert('noticia', 'Notícia precisa ser preenchida').notEmpty();

    var erros = req.validationErrors();
    if(erros){
        res.render("admin/form_add_noticia", {valid: erros, noticia: noticia});
        return;
    }

    var connection = app.config.dbConnection();
    var noticiasModel = new app.app.models.NoticiasDAO(connection);

    noticiasModel.salvarNoticia(noticia, function(error, result){
        res.redirect("/noticias");
    });
}