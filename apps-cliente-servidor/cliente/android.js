var http = require("http");

var buffer_corpo_response = [];

http.get('http://localhost:3000', function(res){

    res.on('data', function(chunk){     // estado 'data' existe enquanto a requisição está em curso
        buffer_corpo_response.push(chunk);
    });

    res.on('end', function(){           // 'end' dispara o evento apenas ao término do carregamento da página
        var corpo_response = Buffer.concat(buffer_corpo_response).toString();
        console.log(corpo_response);
    });

    res.on('error', function(){         // 'error' dispara quando ocorrem erros no fluxo normal

    });
});