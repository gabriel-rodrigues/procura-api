var promise        = require('bluebird'),
    moment         = require('moment'),
    jwt            = require('jwt-simple'),
    configuracoes  = require('config'),
    BaseController = require('../controllers/base.controller');

function UsuarioController( model ) {
    this.model = promise.promisifyAll(model);

}

// definindo a heranca
UsuarioController.prototype             = new BaseController();
UsuarioController.prototype.constructor = UsuarioController;




UsuarioController.prototype.login = function (request, response) {

    var usuario = request.body.usuario || '',
        senha   = request.body.senha   || '';

    if(usuario === '' || senha === '') {
        return response.sendStatus(401);
    }

    // primeiro passo, localizar no banco
    this.model.findByLoginAsync({ usuario: usuario, senha: senha })
        .then(function (_usuario) {

            // passo gerar o token com periodo
            var tempoExpirar = moment().add(7, 'days').valueOf();
            var token = jwt.encode({
                iss: _usuario._id,
                exp: tempoExpirar

            }, configuracoes.seguranca.chaveSecreta);

            return response.json({
                token: token,
                expires: tempoExpirar,
                usuario: _usuario
            });

        })
        .catch(function (error) {
            return response.sendStatus(401);
        });

};

UsuarioController.prototype.nomeUsuarioValido = function (request, response) {
    var usuario = request.body.value;

    this.model.findWithFieldsAsync({ usuario: usuario }, {})
        .then(function (usuarios) {

            var retorno = {
                isValid: null,
                value: usuario
            };

            if(usuarios.length === 0) {
                retorno.isValid = true;
            }
            else {
                retorno.isValid = false;
            }


            response.status(200).json(retorno);
        })
        .catch(function (e) {
            console.log(e);
            response.status(500).json({ message: e});
        });
};



module.exports   = function (usuarioModel) {
    return new UsuarioController(usuarioModel);
};