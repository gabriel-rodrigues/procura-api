
var mongoose = require('../../config/db/mongoose'),
    Schema   = mongoose.Schema;


var MateriaSchema = new Schema({
    nome: {
        type: String,
        required: 'O nome da matéria é obrigatório'
    },
    cargaHoraria: {
        type: Number,
        required: 'A carga horária da matéria é obrigatório'
    }
});


module.exports = MateriaSchema;