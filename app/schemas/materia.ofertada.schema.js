
var mongoose       = require('../../config/db/mongoose'),
    Schema         = mongoose.Schema;


var MateriaCompletaSchema = new Schema({
    nome: {
        type: String,
        required: 'O nome da matéria é obrigatório'
    },
    cargaHoraria: {
        type: String,
        required: 'A carga horária da matéria é obrigatório'
    },
    unidades: {
        type: [String],
        required: true
    },
    dataCadastro: {
        type: Date,
        requried: true
    }
});



var MateriasOfertadas = new Schema({
    curso: {
        type: String,
        required: true,
    },
    materia:MateriaCompletaSchema,
    IsAtivada: {
        type: Boolean,
        required: true,
        default: true
    }


}, {
    collection: 'materiasOfertadas'
});

var MateriasOfertadas = mongoose.model('MateriasOfertadas', MateriasOfertadas);
module.exports = MateriasOfertadas;