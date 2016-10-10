
var mongoose = require('../../config/db/mongoose'),
    Schema   = mongoose.Schema,
    bcrypt   = require('bcrypt-nodejs');


var UsuarioSchema = new Schema({
    nomeCompleto: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    usuario: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['faculdade', 'aluno'],
        required: true
    },
    dataCadastro: {
        type: Date,
        required: true
    },
    IsPrimeiroAcesso: {
        type: Boolean,
        required: true
    },
    cursoParaEstagio: Schema.Types.ObjectId,
    materiasInteresse: [Schema.Types.ObjectId]

}, {
    collection: 'usuarios'
});

/*UsuarioSchema.pre('save', function (next) {
   var usuario = this;
    console.log(usuario);
    if(!usuario.isModified('senha')) return next();

    bcrypt.genSalt(5, function (err, salt) {
       if(err) return next(err);

        bcrypt.hash(usuario.senha, salt, null, function (err, hash) {
            if(err) return next(err);

            usuario.senha = hash;
            next();
        });
    });
});


UsuarioSchema.methods.verificarSenha = function (senha, next) {
    bcrypt.compare(senha, this.senha, function (err, isMatch) {
       if(err) return next(err);
        next(isMatch);
    });
};*/

var Estagio = mongoose.model('Usuario', UsuarioSchema);
module.exports = Estagio;