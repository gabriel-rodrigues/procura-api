var usuarioSchema = require('../schemas/usuario.schema'),
    BaseModel     = require('../models/base.model');



function UsuarioDAO(model) {
    this.model = model;
}


// definindo a heranca
UsuarioDAO.prototype             = new BaseModel();
UsuarioDAO.prototype.constructor = UsuarioDAO;

UsuarioDAO.prototype.findByLogin = function (query, callback) {
    this.model.findOne(query)
        .exec(callback);
};



UsuarioDAO.prototype.findAlunosByCurso = function (cursos, callback) {
    this.model.find({
        cursoParaEstagio: {
            $in: cursos
        },
        role: "aluno"
    }, {
        _id: 0,
        cursoParaEstagio: 1,
        email: 1
    })
    .exec(callback);
};

UsuarioDAO.prototype.findAlunosInteresseMaterias = function (materias, callback) {
    this.model.find({
        materiasInteresse: {
            $in: materias
        },
        role: "aluno"
    }, {
        id: 1,
        materiasInteresse: 1,
        email: 1
    })
    .exec(callback);
};

module.exports = function () {


    var usuarioDAO = new UsuarioDAO(usuarioSchema);

    return usuarioDAO;
}();