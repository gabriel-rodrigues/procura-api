var express           = require('express'),
    router            = express.Router(),
    estagioModel      = require('../models/estagio.model'),
    usuarioModel      = require('../models/usuario.model'),
    estagioController = require('../controllers/estagio.controller')(estagioModel, usuarioModel);



router.post('/', estagioController.cadastrar.bind(estagioController))
    .get('/', estagioController.recuperarTodos.bind(estagioController))
    .get('/:_id', estagioController.recuperaPorId.bind(estagioController))
    .put('/:_id', estagioController.atualizar.bind(estagioController))
    .delete('/:_id', estagioController.remover.bind(estagioController));



module.exports = router;