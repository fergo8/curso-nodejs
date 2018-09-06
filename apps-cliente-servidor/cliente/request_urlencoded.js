var http = require("http");

var opcoes = {
    hostname : "localhost",                                 // endereço padrão
    port : 3000,                                            // porta do server
    path : "/",                                             // local padrão
    method : "post",                                        // método de envio via post
    headers : {
        "Accept" : "application/json",                      // propriedade do header
        "Content-type": "application/x-www-form-urlencoded" // propriedade do header
    }
}

// Content-type
var html = "nome=Andrea"; // x-www-form-urlencoded

var buffer_corpo_response = [];

var req = http.request(opcoes, function (res) {

    res.on('data', function (chunk) { // estado 'data' existe enquanto a requisição está em curso
        buffer_corpo_response.push(chunk);
    });

    res.on('end', function () {       // 'end' dispara o evento apenas ao término do carregamento da página
        var corpo_response = Buffer.concat(buffer_corpo_response).toString();
        console.log(corpo_response);
    });

    res.on('error', function () {     // 'error' dispara quando ocorrem erros no fluxo normal

    });
});

req.write(html);
req.end();