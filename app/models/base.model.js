
function BaseModelDAO() {
    this.model = null;
}

BaseModelDAO.prototype.find = function (query, callback) {
    this.model.find(query).exec(callback);
};

BaseModelDAO.prototype.findWithFields = function (query, fields, callback) {

    this.model.find(query, fields).exec(callback);
};

BaseModelDAO.prototype.findOne = function (_id, callback) {
    var query = {
        _id: _id
    };

    this.model.findOne(query).exec(callback);
};

BaseModelDAO.prototype.criar = function (data, callback) {
    var model = new this.model(data);

    model.save(function (error, resultado) {
        callback(error, resultado);
    });
};

BaseModelDAO.prototype.atualizar = function(_id, data, callback) {
    var query = {
        _id: _id
    };

    this.model.update(query, data).exec(function (error, resultado) {
        callback(error, resultado);
    });
};

BaseModelDAO.prototype.remover = function(_id, callback) {
    var query = {
        _id: _id
    };

    this.model.remove(query).exec(function (error, resultado) {
        callback(error, resultado);
    });
};

BaseModelDAO.prototype.count = function (query, callback) {
    this.model.count(query).exec(callback);
};


module.exports = BaseModelDAO;