var BaseModel     = require('../models/base.model'),
    estagioSchema = require('../schemas/estagio.schema'),
    mongoose      = require('mongoose');


function EstagioDAO(model) {
    this.model = model;
}


// definindo a heranca
EstagioDAO.prototype             = new BaseModel();
EstagioDAO.prototype.constructor = EstagioDAO;


EstagioDAO.prototype.findEstagiosByCurso = function (cursos, callback) {
    this.model.find({
        cursos: {
            $in: cursos
        }
    }, {
        _id: 0,
        cursos: 1
    })
    .exec(callback);
};


module.exports = function () {


    var estagioDAO = new EstagioDAO(estagioSchema);

    return estagioDAO;
}();