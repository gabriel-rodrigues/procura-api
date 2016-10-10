var express        = require('express'),
    router         = express.Router()
    authorizeToken = require('../security/authorize')(['faculdade', 'aluno']);



router.use('/estagios', authorizeToken.validar.bind(authorizeToken), require('./estagio.router'));
router.use('/cursos', authorizeToken.validar.bind(authorizeToken), require('./curso.router'));
router.use('/usuarios', require('./usuario.router'));
router.use('/materias-ofertadas',authorizeToken.validar.bind(authorizeToken), require('./materia.ofertada'));

module.exports = router;