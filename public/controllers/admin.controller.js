(function () {



    function AdminController( $localStorage, $state) {

        var self = this;


        this.logOut = function () {

            var desejaMesmo = confirm('Deseja mesmo sair do sistema?');

            if(desejaMesmo) {
                delete  $localStorage.token;
                $state.go('login');
            }

        };

    }

    angular.module('procuraAlerta.controllers')
        .controller('AdminController', ["$localStorage", "$state", AdminController]);

})();