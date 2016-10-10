(function () {




    function UsuarioService ($resource) {

        var service = $resource('/usuarios');

        var cadastrar = function (responsavel) {
            return service.save(responsavel).$promise;

        };

        return {
            cadastrar: cadastrar
        };

    }

    angular.module('procuraAlerta.services')
        .factory('UsuarioService', [
            '$resource',
            UsuarioService
        ]);

})();