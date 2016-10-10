(function () {

    angular.module('procuraAlerta.services')
        .factory('LoginService', [
            '$resource',
            LoginService
        ]);


    function LoginService ($resource) {

        var svcLogin = $resource('/usuarios/login');

        var realizarLogin = function (responsavel) {
            return svcLogin.save(responsavel).$promise;

        };

        return {
            realizarLogin: realizarLogin
        };

    }

})();