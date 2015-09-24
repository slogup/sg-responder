
var response = function(req, next, status, body) {
    var tempCallback = req.callback
    if (tempCallback) {
        delete req.callback;
        tempCallback(status, body);
    }
    else {
        next({
            status: status,
            body: body
        });
    }
};

var hjson = function(req, next, status, body) {
    var self = this;
    response(req, next, status, body);
};

var hsend = function(req, next, status, body) {
    var self = this;
    response(req, next, status, body);
};

module.exports.connect = function() {
    return function(req, res, next) {
        res.hjson = hjson;
        res.hsend = hsend;
        next();
    };
};

module.exports.errorHandler = function() {
    return function(err, req, res, next) {
        if (err.status) {
            res.status(err.status).json(err.body);
        } else {
            console.error(err);
            console.error(err.stack);
            res.status(500).send();
        }
    }
};