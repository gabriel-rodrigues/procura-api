
var mongoose = require('../../config/db/mongoose'),
    Schema   = mongoose.Schema;


var AlunoSchema = new Schema({
    nomeCompleto: {
        type: String,
        required: true
    },
    email: {
        type: Number,
        required: true
    },
    login: {
        type: Date,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    dataCadastro: {
        type: Date,
        required: true
    },
    cursoParaEstagio: Schema.Types.ObjectId,
    materiasInteresse: [Schema.Types.ObjectId]


}, {
    collection: 'estagios'
});

var Estagio = mongoose.model('Estagio', EstagioSchema);
module.exports = Estagio;