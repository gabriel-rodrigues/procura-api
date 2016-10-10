(function () {



    function MateriaOfertadaController(cursoService, materiaOfertadaService, $state) {

        var self = this;
        self.cursos = [];
        self.formulario = {
            curso: null,
            materiaSelecionada: null

        };
        self.materiasOfertadas = [];


        self.unidades = [
            'Faculdade Projeção, Campus Taguatinga',
            'Colégio e Faculdade Projeção, Campus Guará',
            'Faculdade Projeção, Campus Taguatinga Norte',
            'Faculdade Projeção, Campus Ceilândia'
        ];


        self.onInit = function () {
            materiaOfertadaService.recuperarTodos()
                .then(function (materias) {
                    self.materiasOfertadas = materias;
                })
                .catch(function () {
                    alert('Não foi possível recuperar as matérias!');
                });
        };

        self.onInitNova = function () {
            self.onInit();

            cursoService.recuperarTodos()
                .then(function (cursos) {
                    self.cursos = cursos;
                })
                .catch(function () {
                    alert('Não foi possível recuperar os Cursos');
                });
        };


        self.selecionar = function (materia) {
          if(!materia.unidades) {
              materia.unidades = [];
              angular.forEach(self.unidades, function () {
                 materia.unidades.push(false);
              });
          }

          self.formulario.materiaSelecionada = materia;
        };

        self.podeSalvar = function () {
            if(self.formulario.curso == null || self.formulario.materiaSelecionada == null)
                return false;

            var algumaUnidadeFoiMarcada = false;

            for(var i = 0; i < self.formulario.materiaSelecionada.unidades.length; i ++) {
                if(self.formulario.materiaSelecionada.unidades[i]) {
                    algumaUnidadeFoiMarcada = true;
                    break;
                }
            }

            return algumaUnidadeFoiMarcada;
        };

        self.recuperarMateriaOfertadaParaCastrar = function () {
            var materiaOfertada = {
                curso: self.formulario.curso.nome,
                materia: {
                    id: self.formulario.materiaSelecionada._id,
                    nome: self.formulario.materiaSelecionada.nome,
                    cargaHoraria: self.formulario.materiaSelecionada.cargaHoraria + ' Hora(s)',
                    unidades: []
                },
                dataCadastro: new Date()
            };

            for(var i = 0, unidades = self.formulario.materiaSelecionada.unidades; i < unidades.length; i++) {
                if(unidades[i] === true) {
                    materiaOfertada.materia.unidades.push(self.unidades[i]);
                }
            }

            return materiaOfertada;
        };


        self.salvar = function () {
            materiaOfertadaService.cadastrar(self.recuperarMateriaOfertadaParaCastrar())
                .then(function (resultado) {
                   alert('Matéria Ofertada com sucesso!');
                    $state.go('admin.materiasOfertadas');
                })
                .catch(function (e) {
                    alert('Não foi possível ofertar a matéria. Tente novamente.');
                });
        };

        self.desativar = function (oferta) {
           var desejaMesmo = confirm('Deseja mesmo desativar essa operação?');

            if(desejaMesmo) {
                materiaOfertadaService.desativar(oferta)
                    .then(function (ofertaDesativada) {
                        var indice = self.materiasOfertadas.indexOf(oferta);
                        self.materiasOfertadas.splice(indice, 1);
                        alert('Oferta desativada com sucesso!');
                    })
                    .catch(function () {
                        alert('Não foi possível desativar, tente novamente.');
                    });
            }
        };

    }

    angular.module('procuraAlerta.controllers')
        .controller('MateriaOfertadaController', [
            "CursoService",
            "MateriaOfertadaService",
            "$state",
            MateriaOfertadaController
        ]);

})();