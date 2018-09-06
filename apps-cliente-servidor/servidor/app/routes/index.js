module.exports = function(application){
	application.get('/', function(req, res){

		res.format({		// format() = indica em qual formato será o response
			html : function(){
				res.send('Bem-vindo à app NodeJS!');
			},

			json : function(){
				var retorno = {
					body: "Bem-vindo à app NodeJS!"
				}
				res.json(retorno);		// json() = retorna um json
			}
		});

		
	});
}