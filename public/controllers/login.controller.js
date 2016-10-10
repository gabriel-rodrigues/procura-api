(function () {



    function LoginController(loginService, $localStorage, $state, Role, usuarioService) {

        var self = this;
        self.formularioLogin = {
            usuario: null,
            senha: null
        };

        self.formularioRegistrar = {
            nomeCompleto: null,
            email: null,
            usuario: null,
            senha: null,
            role: 'faculdade',
            dataCadastro: new Date(),
            cursoParaEstagio: null,
            materiasInteresse: [],
            IsPrimeiroAcesso: true
        };

        self.indiceAtualAba = 0;

        self.mudarAba = function (indice) {
            self.indiceAtualAba = indice;
        };


        self.realizarLogin = function () {
            loginService.realizarLogin(self.formularioLogin)
                .then(function (data) {

                    if(data.usuario.role == Role) {
                        $localStorage.token = data.token;
                        $state.go('admin.cursos');
                    }
                    else {
                        alert('Você foi localizado no sistema, porém seu perfil é de aluno e não será possível entrar');
                    }

                })
                .catch(function () {
                    alert('Login ou senha incorretos!');
                });
        };


        self.registrarUsuario = function () {
            usuarioService.cadastrar(self.formularioRegistrar)
                .then(function (usuario) {
                    var mensagem = 'O ' +  usuario.nomeCompleto + ' cadastrado com sucesso!';
                    alert(mensagem);
                    self.indiceAtualAba = 0;
                })
                .catch(function () {
                    alert('Nao foi possivel cadastrar.');
                });
        };

    }

    angular.module('procuraAlerta.controllers')
        .controller('LoginController', [
            "LoginService",
            "$localStorage",
            "$state",
            "Role",
            "UsuarioService",
            LoginController]);

})();