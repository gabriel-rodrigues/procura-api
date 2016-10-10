var express                  = require('express'),
    router                   = express.Router(),
    materiaOfertadaModel     = require('../models/materia.ofertada.model'),
    usuarioModel             = require('../models/usuario.model'),
    materiOfertadaController = require('../controllers/materia.ofertada.controller')(materiaOfertadaModel, usuarioModel);



router.post('/', materiOfertadaController.cadastrar.bind(materiOfertadaController))
    .get('/', materiOfertadaController.recuperarTodos.bind(materiOfertadaController))
    .put('/:_id', materiOfertadaController.desativar.bind(materiOfertadaController))


module.exports = router;