var BaseController = require('../controllers/base.controller'),
    promise        = require('bluebird'),
    mongoose       = require('mongoose'),
    emailService   = require('../services/email.service'),
    hbs            = require('handlebars');


function EstagioController ( model, usuarioModel ) {
    this.model = promise.promisifyAll(model);
    this.usuarioModel = promise.promisifyAll(usuarioModel);

}

// definindo a heranca
EstagioController.prototype             = new BaseController();
EstagioController.prototype.constructor = EstagioController;

EstagioController.prototype.recuperarTemplateHtml = function () {

    var template = hbs.compile([
        '<h1 style="text-align: center">Olá, temos boas notícias!</h1>',
        '<p>Estamos com vagas de estágio para você, utilize o app e confira.</p>',
    ].join(''));

    var html = template({});

    return html;
};



EstagioController.prototype.cadastrar = function (request, response, next) {
    var estagio = request.body,
        self = this,
        estagioCadastrado = {};

    estagio.cursos.forEach(function (curso) {
       curso = mongoose.Types.ObjectId(curso)
    });


    self.model.criarAsync(estagio)
        .then(function (novoEstagio) {
            estagioCadastrado = novoEstagio;
            return self.usuarioModel.findAlunosByCursoAsync(estagioCadastrado.cursos);
        })
        .then(function (alunos) {
            var emailsEnviar = [];

            alunos.forEach(function (aluno) {
               emailsEnviar.push(aluno.email);
            });

            if(emailsEnviar.length > 0) {
                return emailService.enviar({
                    from: 'gabrielll.bsb@hotmail.com',
                    to: emailsEnviar.join(','),
                    subject: 'Procura Alerta | Estágio',
                    html: self.recuperarTemplateHtml()
                });
            }

            return response.status(201).json(estagioCadastrado);
        })
        .then(function () {
            return response.status(201).json(estagioCadastrado);
        })
        .catch(function (e) {
            next(e);
        });
};


module.exports   = function (estagioModel, usuarioModel) {
  return new EstagioController(estagioModel, usuarioModel);
};
