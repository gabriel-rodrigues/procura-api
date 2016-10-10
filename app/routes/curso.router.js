var express           = require('express'),
    router            = express.Router(),
    cursoModel        = require('../models/curso.model'),
    usuarioModel      = require('../models/usuario.model'),
    estagioModel      = require('../models/estagio.model'),
    cursoController   = require('../controllers/curso.controller')(cursoModel, usuarioModel, estagioModel);



router.post('/', cursoController.cadastrar.bind(cursoController))
    .get('/simples', cursoController.recuperarCursoSimples.bind(cursoController))
    .get('/', cursoController.recuperarTodos.bind(cursoController))
    .get('/:_id', cursoController.recuperaPorId.bind(cursoController))
    .put('/:_id', cursoController.atualizar.bind(cursoController))
    .delete('/:_id', cursoController.remover.bind(cursoController));



module.exports = router;