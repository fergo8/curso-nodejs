module.exports = function(app){
    app.post("/chat", function(req, res){
        res.render("chat");
    });

    app.get("/chat", function(req, res){
        res.render("chat");
    });
}