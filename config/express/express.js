var methodOverride  = require('method-override'),
    bodyParser      = require('body-parser'),
    express         = require('express'),
    jwt             = require('jwt-simple');



module.exports = function () {
    var app = express();

    // variaveis de ambiente
    app.set('port', 2020);

    // middleware
    app.use(express.static('./public'));

    // configuracao do server
    app.use(methodOverride('X-HTTP-Method'));
    app.use(methodOverride('X-HTTP-Method-Override'));
    app.use(methodOverride('X-Method-Override'));
    app.use(methodOverride('_method'));

//parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));


    app.set('view engine', 'ejs');
    app.set('views', './views');

// remover o pedido do favicon
    app.use(function (request, response, next) {
        if(request.url === '/favicon.icon') {
            response.writeHead(200, {
                'Content-Type': 'image/x-icon'
            });
        }
        else {
            next();
        }
    });


// configurando as rotas
    app.use('/', require('../../app/routes/main.router'));

// tratando os erros
    app.use(function (request, response, next) {
        var error = new Error('Not Found');
        error.status = 404;
        next(error);
    });

    app.use(function (error, request, response, next) {
        response.status(error.status || 500).json({ error: error.message });
    });

    return app;
};