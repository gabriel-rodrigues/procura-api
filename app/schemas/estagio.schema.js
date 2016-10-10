
var mongoose = require('../../config/db/mongoose'),
    Schema   = mongoose.Schema;


var EstagioSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    quantidade: {
        type: Number,
        required: true
    },
    dataInicio: {
        type: Date,
        required: true
    },
    dataTermino: {
        type: Date,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    dataCadastro: {
        type: Date,
        required: true
    },
    cursos:[Schema.Types.ObjectId]

}, {
    collection: 'estagios'
});

var Estagio    = mongoose.model('Estagio', EstagioSchema);
module.exports = Estagio;