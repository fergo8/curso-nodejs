module.exports = function(app){
    app.get("/formulario_adicao_noticia", function(req, res){
        res.render("admin/form_add_noticia");
    });
};