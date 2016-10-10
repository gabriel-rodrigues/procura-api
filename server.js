var app = require('./config/express/express')();


// server na escula
var server = app.listen(app.get('port'),function () {
    var host  = server.address().address,
        porta = server.address().port;

    console.log('Servidor na esculta em: http://%s:%s', host, porta);
});