(function () {



    function EstagioController(estagioService, state, stateParams, cursoService, moment, filter) {

        var self = this;
        self.estagios = [];
        self.descricaoLegenda = stateParams.id != null ? "Editar Estágio" : "Novo Estágio";
        self.cursos           = [];
        self.formulario = {
            titulo: null,
            quantidade: null,
            descricao: null,
            cursos: new Array(1),
            dataCadastro: new Date()
        };

        self.podeCadastrar = function () {
            if(stateParams.id != null)
                return true;

            return self.cursos.length > 0;
        };

        self.onInit = function () {
            estagioService.recuperarTodos()
                .then(function (estagios) {
                    self.estagios = estagios;
                })
                .catch(function () {
                    alert('Não foi possível recuperar todos os estágios');
                });
        };

        self.configurarCursosDisponiveis = function () {
            cursoService.recuperarTodosSimples()
                .then(function (cursos) {
                    self.cursos = cursos;
                })
                .catch(function () {
                    alert('Não foi possível recuperar todos os cursos');
                })
        };


        self.buscarEstagioParaEditar = function () {
            estagioService.recuperarPorId(stateParams.id)
                .then(function (estagio) {
                    estagio.dataInicio  = filter('date')(estagio.dataInicio, 'dd/MM/yyyy');
                    estagio.dataTermino = filter('date')(estagio.dataTermino, 'dd/MM/yyyy');
                    self.formulario = estagio;
                })
                .catch(function() {
                    alert('Não foi possível recuperar o estágio');
                });
        };

        self.onInitNovoEditar = function (){
            self.configurarCursosDisponiveis();
            if(stateParams.id != null) {
                self.buscarEstagioParaEditar();
            }
        };


        self.adicionarCurso = function () {
            if(self.formulario.cursos.length < self.cursos.length) {
                self.formulario.cursos.push(null);
            }
            else {
                alert('Como possui apenas ' + self.cursos.length + ' curso(s) cadastrado(s), não poderá adicionar mais curso para esse estágio.');
            }
        };

        self.removerCurso = function (indice) {
            self.formulario.cursos.splice(indice, 1);
        };

        self.formatarDatasParaJavaScript = function () {
            self.formulario.dataInicio  = moment(self.formulario.dataInicio, "DD/MM/YYYY").toDate();
            self.formulario.dataTermino = moment(self.formulario.dataTermino, "DD/MM/YYYY").toDate();
        };

        self.removerCursosIguais = function () {
            function somenteUnicos(value, index, self) {
                return self.indexOf(value) === index;
            }

            var cursosUnicos = self.formulario.cursos.filter( somenteUnicos );
            self.formulario.cursos = cursosUnicos;
        };

        self.cadastrar = function () {
            self.formatarDatasParaJavaScript();
            self.removerCursosIguais();
            estagioService.cadastrar(self.formulario)
                .then(function () {
                    state.go('admin.estagios');
                })
                .catch(function () {
                    alert('Nao foi possivel salvar um novo estágio..');
                });
        };

        self.editar = function () {
            self.formatarDatasParaJavaScript();
            self.removerCursosIguais();
            estagioService.editar(self.formulario)
                .then(function () {
                    state.go('admin.estagios');
                })
                .catch(function () {
                    alert('Nao foi possivel salvar um novo estágio..');
                });
        };

        self.salvar = function () {
            if(stateParams.id != null) {
                //editar
                self.editar();
            }
            else {
                //criar
                self.cadastrar();
            }
        };

        self.excluir = function (estagio) {
            estagioService.excluirPorId(estagio._id)
                .then(function () {
                    var indice = self.estagios.indexOf(estagio);
                    self.estagios.splice(indice, 1);
                    alert('Estágio excluido com sucesso!');
                })
                .catch(function () {
                    alert('Nao foi possivel excluir o estágio..');
                });
        };

    }

    angular.module('procuraAlerta.controllers')
        .controller('EstagioController', [
            "EstagioService",
            "$state",
            "$stateParams",
            "CursoService",
            "moment",
            "$filter",
            EstagioController
        ]);

})();