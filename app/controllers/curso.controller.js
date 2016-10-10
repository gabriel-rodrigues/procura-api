var BaseController = require('../controllers/base.controller'),
    promise        = require('bluebird');

function CursoController ( model, usuarioModel, estagioModel) {
    this.model        = promise.promisifyAll(model)
    this.usuarioModel = promise.promisifyAll(usuarioModel);
    this.estagioModel = promise.promisifyAll(estagioModel);

}

// definindo a heranca
CursoController.prototype             = new BaseController();
CursoController.prototype.constructor = CursoController;

Array.prototype.contains = function (item, prop) {
    var contains = false;

    for(var i = 0; i < this.length; i ++ ){

        if(prop === "") {
            if(item.toString() === this[i].toString()) {
                contains = true;
                break;
            }
        }

        else if(! (this[i][prop] instanceof Array)) {
            if (item.toString() === this[i][prop].toString()) {
                contains = true;
                break;
            }
        }
        else {
            contains = this[i][prop].contains(item, '');
        }
    }

    return contains;
};

CursoController.prototype.recuperaPorId = function (request, response, next) {
    var _id            = request.params._id,
        matriculasId   = [],
        self           = this,
        curso          = {},
        materias       = [];

    self.model.findOneAsync(_id)
        .then(function (resultado) {
            curso = resultado;
            //response.status(200).json(contato);
            //contato.materias
            if(curso.materias.length > 0) {
                curso.materias.forEach(function (materia) {
                    matriculasId.push(materia._id);
                });

                return self.usuarioModel.findAlunosInteresseMateriasAsync(matriculasId);
            }
            else {
                response.status(200).json(curso);
            }
        })
        .then(function (alunos) {

            curso.materias.forEach(function(materia) {

                materias.push({
                    nome: materia.nome,
                    cargaHoraria: materia.cargaHoraria,
                    isPermitidoExcluir: alunos.contains(materia._id, 'materiasInteresse') ? false: true,
                    _id: materia._id
                });
            });


            response.status(200).json({
                _id: curso._id,
                nome: curso.nome,
                sigla: curso.sigla,
                materias: materias
            });
        })
        .catch(next);
};


CursoController.prototype.recuperarTodos = function (request, response, next) {
    var _cursosId = [];
    var self      = this,
        alunos    = [],
        estagios  = [],
        _cursos    = [],
        resultadoFinal = [];

    self.model.findAsync({})
        .then(function (retorno) {
            _cursos = retorno;

            _cursos.forEach(function (curso) {
                _cursosId.push(curso._id);
            });

            return self.usuarioModel.findAlunosByCursoAsync(_cursosId);
        })
        .then(function (alunosEncontrados) {
            alunos = alunosEncontrados;
            return self.estagioModel.findEstagiosByCursoAsync(_cursosId);
        })
        .then(function (estagiosEncontrados) {
            estagios = estagiosEncontrados;
            _cursos.forEach(function (curso) {
                if(alunos.contains(curso._id, 'cursoParaEstagio') || estagios.contains(curso._id, 'cursos')) {
                    curso.isPermitidoExcluir = false;
                }
                else {
                    curso.isPermitidoExcluir = true;
                }

                resultadoFinal.push({
                    isPermitidoExcluir: curso.isPermitidoExcluir,
                    nome: curso.nome,
                    sigla: curso.sigla,
                    materias: curso.materias,
                    _id: curso._id
                });
            });

            response.status(200).json(resultadoFinal);
        })
        .catch(next);
};

CursoController.prototype.recuperarCursoSimples = function (request, response, next) {


    this.model.findWithFieldsAsync({}, { nome: 1 })
        .then(function (cursos) {
            response.status(200).json(cursos);
        })
        .catch(next);
};




module.exports   = function (cursoModel, usuarioModel, estagioModel) {
    return new CursoController(cursoModel, usuarioModel, estagioModel);
};
