
(function () {



    function CursoController(cursoService, state, stateParams) {

        var self = this;
        self.cursos = [];
        self.descricaoLegenda = stateParams.id != null ? "Editar Curso" : "Novo Curso";



        self.formulario = {
            nome: null,
            sigla: null,
            materias: [],
            dataCadastro: new Date()
        };

        self.unidades = [{
            chave: 'Campus Taguatinga',
            valor: 'Campus Taguatinga'
        }, {
            chave: 'Campus Guará',
            valor: 'Campus Guará'
        }, {
            chave: 'Campus Ceilândia',
            valor: 'Campus Ceilândia'
        }];

        self.onInit = function () {

            cursoService.recuperarTodos().then(function (cursos) {
                self.cursos = cursos;
            })
            .catch(function(error) {
                    console.log(error);
            });

        };


        self.adicionarMateria = function () {
            self.formulario.materias.push({
                nome: null,
                cargaHoraria: null
            });
        };

        self.removerMaterias = function (indice) {
          self.formulario.materias.splice(indice, 1);
        };

        self.salvar = function () {
           if(stateParams.id) {
               self.editar();
           }
           else {
               self.cadastrar();
           }
        };

        self.editar = function() {
            cursoService.editar(self.formulario).then(function() {
                state.go('admin.cursos');
            })
            .catch(function() {
               alert('Nao foi possivel editar');
            });
        };

        self.cadastrar = function ()  {
            cursoService.cadastrar(self.formulario).then(function (novoCurso) {
                state.go('admin.cursos');

            }).catch(function () {
                alert('Não foi possível salvar');
            });
        };

        self.onInitEditarNovo = function () {
            if(stateParams.id) {
                self.buscarCurso();
            }
        };


        self.buscarCurso = function () {
            cursoService.recuperarPorId(stateParams.id)
                .then(function (curso) {
                    self.formulario = curso;
                })
                .catch(function () {
                    alert('Não foi possível recuperar');
                });
        };

        self.excluir = function (curso) {

            cursoService.excluirPorId(curso._id)
                .then(function () {
                    var index = self.cursos.indexOf(curso);
                    self.cursos.splice(index, 1);
                    alert('Curso excluído com sucesso!');
                })
                .catch(function () {
                    alert('Não foi possível excluir');
                });
        };

    }

    angular.module('procuraAlerta.controllers')
        .controller('CursoController', [
            "CursoService",
            "$state",
            "$stateParams",
            CursoController]);

})();