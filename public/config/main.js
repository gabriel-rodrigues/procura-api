(function () {

    angular.module('procuraAlerta.controllers', []);
    angular.module('procuraAlerta.services', ['ngResource']);
    angular.module('procuraAlerta.filters', []);
    angular.module('procuraAlerta.directives', []);
    angular.module('procuraAlerta.interceptors', []);


    var procuraAlerta = angular.module('procuraAlerta', [
        'procuraAlerta.controllers',
        'procuraAlerta.services',
        'procuraAlerta.filters',
        'procuraAlerta.directives',
        'procuraAlerta.interceptors',
        'ui.router',
        'textAngular',
        'ngMask',
        'angularMoment',
        'ngStorage',
        'remoteValidation'
    ]);
    
    
    procuraAlerta.config([
        '$stateProvider',
        '$urlRouterProvider',
        '$httpProvider',
        function (stateProvider, urlRouterProvider, httpProvider) {

            // adicionar o interceptador para autenticacao.
            httpProvider.interceptors.push('authInterceptor');

            urlRouterProvider.otherwise('/login');
            stateProvider
                .state('login', {
                    url: '/login',
                    controller: 'LoginController as loginCtrl',
                    templateUrl: 'views/login/index.html',
                    data: {
                        requireLogin: false
                    }

                })
                .state('admin', {
                    abstract: true,
                    url: '/admin',
                    templateUrl: 'views/admin/index.html',
                    data: {
                        requireLogin: true
                    },
                    controller: 'AdminController as adminCtrl'
                })
                .state('admin.cursos', {
                    url: '/cursos',
                    views: {
                        'menu-lateral-esquerdo@admin': {
                            templateUrl: 'views/shared/menu-lateral-esquerdo.html'

                        },
                        'area-conteudo@admin': {
                            templateUrl: 'views/shared/area-conteudo.html'
                        },
                        'conteudo@admin.cursos': {
                            templateUrl: 'views/admin/cursos.admin.html',
                            controller: 'CursoController as cursoCtrl'

                        }
                    }
                })
                .state('admin.cursos.novo', {
                    url: '/novo',
                    views: {
                        'menu-lateral-esquerdo@admin': {
                            templateUrl: 'views/shared/menu-lateral-esquerdo.html'

                        },
                        'area-conteudo@admin': {
                            templateUrl: 'views/shared/area-conteudo.html'
                        },
                        'conteudo@admin.cursos.novo': {
                            templateUrl: 'views/admin/novo.curso.admin.html',
                            controller: 'CursoController as cursoCtrl'

                        }
                    }
                })
                .state('admin.cursos.editar', {
                    url: '/editar/:id',
                    views: {
                        'menu-lateral-esquerdo@admin': {
                            templateUrl: 'views/shared/menu-lateral-esquerdo.html'

                        },
                        'area-conteudo@admin': {
                            templateUrl: 'views/shared/area-conteudo.html'
                        },
                        'conteudo@admin.cursos.editar': {
                            templateUrl: 'views/admin/novo.curso.admin.html',
                            controller: 'CursoController as cursoCtrl'

                        }
                    }
                })

                .state('admin.estagios', {
                    url: '/estagios',
                    views: {
                        'menu-lateral-esquerdo@admin': {
                            templateUrl: 'views/shared/menu-lateral-esquerdo.html'

                        },
                        'area-conteudo@admin': {
                            templateUrl: 'views/shared/area-conteudo.html'
                        },
                        'conteudo@admin.estagios': {
                            templateUrl: 'views/admin/estagios.admin.html',
                            controller: 'EstagioController as estagioCtrl'
                        }
                    }
                })
                .state('admin.estagios.novo', {
                    url: '/novo',
                    views: {
                        'menu-lateral-esquerdo@admin': {
                            templateUrl: 'views/shared/menu-lateral-esquerdo.html'

                        },
                        'area-conteudo@admin': {
                            templateUrl: 'views/shared/area-conteudo.html'
                        },
                        'conteudo@admin.estagios.novo': {
                            templateUrl: 'views/admin/novo.estagio.admin.html',
                            controller: 'EstagioController as estagioCtrl'

                        }
                    }
                })
                .state('admin.estagios.editar', {
                    url: '/editar/:id',
                    views: {
                        'menu-lateral-esquerdo@admin': {
                            templateUrl: 'views/shared/menu-lateral-esquerdo.html'

                        },
                        'area-conteudo@admin': {
                            templateUrl: 'views/shared/area-conteudo.html'
                        },
                        'conteudo@admin.estagios.editar': {
                            templateUrl: 'views/admin/novo.estagio.admin.html',
                            controller: 'EstagioController as estagioCtrl'

                        }
                    }
                })
                .state('admin.materiasOfertadas', {
                    url: '/materias-ofertadas',
                    views: {
                        'menu-lateral-esquerdo@admin': {
                            templateUrl: 'views/shared/menu-lateral-esquerdo.html'

                        },
                        'area-conteudo@admin': {
                            templateUrl: 'views/shared/area-conteudo.html'
                        },
                        'conteudo@admin.materiasOfertadas': {
                            templateUrl: 'views/admin/materias-ofertadas.admin.html',
                            controller: 'MateriaOfertadaController as materiaOfertadaCtrl'
                        }
                    }
                })
                .state('admin.materiasOfertadas.nova', {
                    url: '/nova',
                    views: {
                        'menu-lateral-esquerdo@admin': {
                            templateUrl: 'views/shared/menu-lateral-esquerdo.html'

                        },
                        'area-conteudo@admin': {
                            templateUrl: 'views/shared/area-conteudo.html'
                        },
                        'conteudo@admin.materiasOfertadas.nova': {
                            templateUrl: 'views/admin/nova.materias-ofertadas.admin.html',
                            controller: 'MateriaOfertadaController as materiaOfertadaCtrl'
                        }
                    }
                })



        }
    ])
    .constant('Role', "faculdade")
    .run([
        '$rootScope',
        '$localStorage',
        '$state',
        'Role',
        function (rootScope, $localStorage, state, Role) {

            rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

                var requireLogin = toState.data.requireLogin;

                if(requireLogin && !$localStorage.token){
                    event.preventDefault();

                    state.go('login');
                }
            });

        }
    ]);

})();