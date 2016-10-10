var usuarioModel     = require('../models/usuario.model'),
    jwt              = require('jwt-simple'),
    configuracoes    = require('config'),
    promise          = require('bluebird');


function AuthorizeValidation(roles) {
    this.roles = roles || [];
}

AuthorizeValidation.prototype.isPermitido = function (roleUsuario) {
    var permitido = false;

    for(var i = 0; i < this.roles.length; i ++) {
        if(roleUsuario === this.roles[i]) {
            permitido = true;
        }
    }


    return permitido;
};

AuthorizeValidation.prototype.validar = function (request, response, next) {


    var token = request.body && request.body.access_tokey || request.query && request.query.access_token || request.headers['x-access-token'];
    var self  = this;

    console.log(this);

    // 1
    if(token) {
        try {
            var decoded = jwt.decode(token, configuracoes.seguranca.chaveSecreta);

            //
            if(decoded.exp <= Date.now()) {
                response.json(400, { error: 'Acesso Expirado, faça login novamente' });
            }

            var modelo = promise.promisifyAll(usuarioModel);
            modelo.model.findOneAsync({ _id: decoded.iss })
                .then(function (responsavel) {

                    if(self.roles.length === 0) {
                        return next();
                    }

                    else {
                        var autorizado = self.isPermitido(responsavel.role);
                        if(autorizado)
                            return next();

                        response.sendStatus(401).json({
                            message: 'Acesso Negado'
                        });
                    }
                })
                .catch(function (e) {
                    response.sendStatus(500).json({message: "erro ao procurar usuario do token."})
                });
        }
        catch(err) {
            console.log(err);
            return response.status(401).json({
                message: 'Erro: seu token é inválido'
            });
        }
    }
    else {
        response.status(401).json({ message: 'Token não encontrado ou informado' });
    }

};

module.exports = function (roles) {

  return new AuthorizeValidation(roles);
};