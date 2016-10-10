(function () {



    function MateriaOfertadaService(resource) {

        var service = resource('/materias-ofertadas/:_id', {
            _id: '@_id'
        }, {
            desativar: {
                'method': 'PUT'
            }
        });


        var cadastrar = function (form) {
            return service.save(form).$promise;
        };

        var recuperarTodos = function() {
            return service.query().$promise;
        };

        var desativar = function (form) {
            return service.desativar(form).$promise;
        };

        return {
            cadastrar: cadastrar,
            recuperarTodos: recuperarTodos,
            desativar: desativar
        };
    }

    angular.module('procuraAlerta.services')
        .service('MateriaOfertadaService', ["$resource", MateriaOfertadaService]);

})();