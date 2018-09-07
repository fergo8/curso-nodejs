var express = require("express"),
    bodyParser = require("body-parser"),
    mongo = require("mongodb");

var app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

var port = 8080;

app.listen(port);

var db = new mongo.Db(
    "instaclone",
    new mongo.Server("localhost", 27017, {}),
    {}
);

console.log("HTTP Server on port: "+port);

app.get("/", function(req, res){
    res.send({ msg : "Olá" });
});

app.post("/api", function(req, res){
    var dados = req.body;

    db.open(function(err, mongoclient){
        mongoclient.collection("posts", function(err, collection){
            collection.insert(dados, function(err, result){
                if(err){
                    res.send(err);
                }
                else {
                    res.send(result);
                }
                mongoclient.close();
            });
        });
    });
});