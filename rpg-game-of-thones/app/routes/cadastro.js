module.exports = function (app) {
    app.get("/cadastro", function(req, res){
        app.app.controllers.cadastro.cadastro(app, req, res);
    });
}