function BaseController(model) {
    this.model = model;
}


BaseController.prototype.tratarNaoEncontrado = function (dado) {
    if(!dado) {
        var error = new Error('Not Found');
        error.status = 404;
        throw error;
    }

    return dado;
};

BaseController.prototype.recuperarTodos = function (request, response, next) {

    this.model.findAsync({})
        .then(function (contatos) {
            response.status(200).json(contatos);
        })
        .catch(next);

};

BaseController.prototype.recuperaPorId = function (request, response, next) {
    var _id = request.params._id;

    this.model.findOneAsync(_id)
        .then(this.tratarNaoEncontrado)
        .then(function (contato) {
            response.status(200).json(contato);
        })
        .catch(next);
};

BaseController.prototype.cadastrar = function (request, response, next) {
    var body = request.body;

    this.model.criarAsync(body)
        .then(function (erro, contato) {
            response.status(201).json(contato);
        })
        .catch(function (e) {
            console.log(e);
            next(e);
        });
};


BaseController.prototype.atualizar = function (request, response, next) {
    var _id  = request.params._id,
        body = request.body;


    this.model.atualizarAsync(_id, body)
        .then(function (error, contatoAtualizado) {
            response.status(200).json(contatoAtualizado);
        })
        .catch(next);


};


BaseController.prototype.remover = function (request, response, next) {
    var _id = request.params._id;

    this.model.removerAsync(_id)
        .then(function (error,contatoExcluido) {
             response.status(204).json({});
        })
        .catch(next);
};



module.exports = BaseController;