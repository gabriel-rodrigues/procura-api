var mongoose = require('mongoose'),
    config   = require('config');

'use strict';


function _connection() {
    var usuario     = config.get('mongo.usuario'),
        senha       = config.get('mongo.senha'),
        servidor    = config.get('mongo.servidor'),
        porta       = config.get('mongo.porta'),
        baseDados   = config.get('mongo.baseDados'),
        autorizacao = usuario ? usuario + ':' + senha + '@' : '';

    return 'mongodb://'+ autorizacao + servidor + ':' + porta + '/' + baseDados;
}

mongoose.connect(_connection());
var db =  mongoose.connection;
db.on('error', function (error) {
    console.log(error);
});

db.once('open', function (callback) {
    console.log('conectou com o mongodb');
});


module.exports = mongoose;