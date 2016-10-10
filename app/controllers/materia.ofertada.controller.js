var BaseController = require('../controllers/base.controller'),
    promise        = require('bluebird'),
    usuarioModel   = require('../models/usuario.model'),
    mongoose       = require('mongoose'),
    emailService   = require('../services/email.service'),
    hbs            = require('handlebars');


function MateriaOfertadaController ( model ) {
    this.model = promise.promisifyAll(model);
    this.modelUsuario = promise.promisifyAll(usuarioModel);

}

// definindo a heranca
MateriaOfertadaController.prototype             = new BaseController();
MateriaOfertadaController.prototype.constructor = MateriaOfertadaController;

MateriaOfertadaController.prototype.recuperarTodos = function (request, response, next) {
    this.model.findAsync({
        IsAtivada: true
    })
    .then(function (materias) {
        response.status(200).json(materias);
    })
    .catch(function (e) {
        next(e);
    });
};

MateriaOfertadaController.prototype.recuperarTemplateHtml = function (oferta) {
    var template = hbs.compile([
        '<h1 style="text-align: center">Olá, temos boas notícias!</h1>',
        '<p>Esse semestre ,estaremos ofertando {{materia.nome}} do curso {{curso}} na(s) seguinte(s) unidade(s):</p>',
        '<ul style="list-style:none;padding-bottom:30px">',
            '{{#each materia.unidades}}',
                '<li>{{this}}</li>',
            '{{/each}}',
        '</li>'

    ].join(''));

    var html = template(oferta);
    return html;
};


MateriaOfertadaController.prototype.cadastrar = function (request, response, next) {
    var oferta = request.body,
        ofertaCriada = {},
        self = this;


    self.model.criarAsync(oferta)
        .then(function (materiasOfertadas) {
            ofertaCriada  = materiasOfertadas;
            console.log(ofertaCriada);
            return self.modelUsuario.findAlunosInteresseMateriasAsync([mongoose.Types.ObjectId(oferta.materia.id)]);
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
                    subject: 'Procura Alerta | Nova matéria ofertada',
                    html: self.recuperarTemplateHtml(ofertaCriada)
                });
            }
            response.status(201).json(ofertaCriada);
        })
        .then(function (enviado) {
            response.status(201).json(ofertaCriada);
        })
        .catch(function (e) {
            next(e);
        });
};


MateriaOfertadaController.prototype.desativar = function (request, response, next) {
    var id   = request.params._id;
    this.model.desativarAsync({ _id: id })
        .then(function (error, resultado) {
            response.status(200).json(resultado);
        })
        .catch(function (e) {
            next(e);
        });

};


module.exports  = function (materiaOfertadaModel, usuarioModel) {
    return new MateriaOfertadaController(materiaOfertadaModel, usuarioModel);
};
