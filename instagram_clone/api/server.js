// ========== Server Config ==========

// Import modules
var express = require("express"),
    bodyParser = require("body-parser"),
    multiparty = require("connect-multiparty"),
    mongo = require("mongodb"),
    objectID = require("mongodb").ObjectId,
    fs = require("fs");

// Instanciando Express
var app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(multiparty());

app.use(function(req, res, next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    next();
});

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

    var date = new Date();
    var time_stamp = date.getTime();

    var url_imagem = time_stamp + "_" + req.files.arquivo.originalFilename;
    var path_origem = req.files.arquivo.path;
    var path_destino = "./uploads/" + url_imagem;

    fs.rename(path_origem, path_destino, function(err){
        if(err){
            res.status(500).json({ error : err });
            return;
        }

        var dados = {
            url_imagem : url_imagem,
            titulo : req.body.titulo
        }

        db.open(function (err, mongoclient) {
            mongoclient.collection("posts", function (err, collection) {
                collection.insert(dados, function (err, result) {
                    if (err) {
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

app.get("/imagens/:imagem", function(req, res){

    var img = req.params.imagem;

    fs.readFile("./uploads/"+img, function(err, content){
        if(err){
            res.status(400).json(err);
            return;
        }

        res.writeHead(200, { "content-type" : "image/jpg" });
        res.end(content);
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
                { $push :   {
                                comentarios : {
                                    id_comentario : new objectID(),
                                    comentario : req.body.comentario
                                }
                            } 
                },
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

// DELETE by ID (equivalente Delete)
app.delete("/api/:id", function (req, res) {
    db.open(function (err, mongoclient) {
        mongoclient.collection("posts", function (err, collection) {
            collection.remove({ _id: objectID(req.params.id) }, function(err, result){
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