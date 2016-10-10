var express           = require('express'),
    router            = express.Router(),
    usuarioModel      = require('../models/usuario.model'),
    usuarioController = require('../controllers/usuario.controller')(usuarioModel),
    authorizeToken   = require('../security/authorize')(['faculdade']);



router.post('/login', usuarioController.login.bind(usuarioController))
    .post('/', usuarioController.cadastrar.bind(usuarioController))
    .put('/:_id', usuarioController.atualizar.bind(usuarioController))
    .post('/nome-usuario-valido', usuarioController.nomeUsuarioValido.bind(usuarioController));


module.exports = router;