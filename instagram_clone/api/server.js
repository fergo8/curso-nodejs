// ========== Server Config ==========

// Import modules
var express = require("express"),
    bodyParser = require("body-parser"),
    mongo = require("mongodb"),
    objectID = require("mongodb").ObjectId;

// Instanciando Express
var app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

// Definindo port
var port = 8080;
app.listen(port);

console.log("HTTP Server on port: "+port);

// ========== DB Conection ==========

// Instanciando objeto db para conexão com MongoDB
var db = new mongo.Db(
    "instaclone",
    new mongo.Server("localhost", 27017, {}),
    {}
);

// ========== API RESTful ==========

// Rota da página principal da API
app.get("/", function(req, res){
    res.send({ msg : "Página Principal" });
});

// POST (equivalente Create)
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

// GET (equivalente Read)
app.get("/api", function(req, res){
    db.open(function(err, mongoclient){
        mongoclient.collection("posts", function(err, collection){
            collection.find().toArray(function(err, result){
                if(err){
                    res.json(err);
                }
                else {
                    res.json(result);
                }
                mongoclient.close();
            });
        });
    });
});

// GET by ID (equivalente Read)
app.get("/api/:id", function (req, res) {
    db.open(function (err, mongoclient) {
        mongoclient.collection("posts", function (err, collection) {
            collection.find(objectID(req.params.id)).toArray(function (err, result) {
                if (err) {
                    res.json(err);
                }
                else {
                    res.json(result);
                }
                mongoclient.close();
            });
        });
    });
});

// PUT by ID (equivalente Update)
app.put("/api/:id", function (req, res) {
    db.open(function (err, mongoclient) {
        mongoclient.collection("posts", function (err, collection) {
            collection.update(
                { _id : objectID(req.params.id) },
                { $set : {
                    nome : req.body.nome,
                    foto : req.body.foto
                } },
                {},
                function(err, result){
                    if(err){
                        res.json(err);
                    }
                    else {
                        res.json(result);
                    }
                    mongoclient.close();
                }
            );
        });
    });
});