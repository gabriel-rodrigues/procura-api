;(function () {


    angular.module('procuraAlerta.interceptors', [])
        .factory('authInterceptor', [
            '$q',
            '$localStorage',
            '$timeout',
            '$injector',

            function ($q, $localStorage, $timeout, $injector) {

                var $state;

                $timeout(function () {
                    $state = $injector.get('$state');
                });

                return {
                    request: function (config) {
                        config.headers = config.headers || {};

                        if($localStorage.token) {
                            config.headers['x-access-token'] = $localStorage.token;
                        }

                        return config;
                    },
                    response: function (response) {
                        return response || $q.when(response);
                    },
                    responseError: function (response) {
                        if(response.status === 401) {
                            $state.go('login');
                        }
                        else if (response.status === 400){
                            $state.go('login');
                        }

                        return $q.reject(response);
                    }
                };
            }]);

})();