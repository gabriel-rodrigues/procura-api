var mongoose       = require('../../config/db/mongoose'),
    MateriaSchema  = require('../schemas/materia.schema'),
    Schema         = mongoose.Schema;


var CursoSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    sigla: {
      type: String,
      required: true
    },
    dataCadastro: {
        type: Date,
        required: true
    },
    materias:[MateriaSchema]
}, {
    collection: 'cursos'
});


var Curso = mongoose.model('Curso', CursoSchema);

module.exports = Curso;