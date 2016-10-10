var BaseModel     = require('../models/base.model'),
    cursoSchema   = require('../schemas/curso.schema'),
    usuarioDao    = require('../models/usuario.model');


function CursoDAO(model) {
    this.model = model;

}


// definindo a heranca
CursoDAO.prototype             = new BaseModel();
CursoDAO.prototype.constructor = CursoDAO;



module.exports = function () {


    var cursoDAO = new CursoDAO(cursoSchema);

    return cursoDAO;
}();