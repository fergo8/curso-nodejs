// importando server
var app = require("./config/server");

// parametrizando a porta de escuta
app.listen(3000, function(){
    console.log("Server ON");
});