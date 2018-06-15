var app = require("./config/server");

// Servidor escutando a porta 3000
app.listen(3000, function(){
    console.log("Server ON");
});