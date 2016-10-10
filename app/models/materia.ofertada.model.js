var materiaOfertadaSchema = require('../schemas/materia.ofertada.schema'),
    BaseModel     = require('../models/base.model');


function MateriaOfertadaDAO(model) {
    this.model = model;
}


// definindo a heranca
MateriaOfertadaDAO.prototype             = new BaseModel();
MateriaOfertadaDAO.prototype.constructor = MateriaOfertadaDAO;



MateriaOfertadaDAO.prototype.desativar = function (query, callback) {
    this.model.update(query, {
        $set: {
            IsAtivada: false
        }
    })
    .exec(callback);
};

module.exports = function () {


    var materiaOfertadaDAO = new MateriaOfertadaDAO(materiaOfertadaSchema);

    return materiaOfertadaDAO;
}();