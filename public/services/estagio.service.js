(function () {



    function EstagioService(resource) {

        var service = resource('/estagios/:_id', {
            _id: '@_id'
        }, {
            'editar': {
                'method': 'PUT'
            }
        });


        var recuperarTodos = function() {
            return service.query().$promise;
        };

        var cadastrar = function (form) {
            return service.save(form).$promise;
        };


        var recuperarPorId = function (id) {
            return service.get({
                _id: id
            }).$promise;
        };


        var excluirPorId = function (id) {
            return service.delete({
                _id: id
            }).$promise;
        };

        var editar = function (form) {
            return service.editar(form).$promise;
        };

        return {
            recuperarTodos: recuperarTodos,
            cadastrar: cadastrar,
            recuperarPorId: recuperarPorId,
            excluirPorId: excluirPorId,
            editar: editar
        };
    }

    angular.module('procuraAlerta.services')
        .service('EstagioService', ["$resource", EstagioService]);

})();