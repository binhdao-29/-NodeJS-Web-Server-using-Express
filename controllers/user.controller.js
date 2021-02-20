var db = require('../db');
var shortid = require('shortid');
module.exports.index = function(request, response) {
    response.render('index', { users: db.get('users').value() });
};

module.exports.search = function(request, response) {
    var q = request.query.q;
    var users = db.get('users').value();
    var matchUsers = users.filter(function(user){
        return user.name.indexOf(q) !== -1;
    });
    response.render('users/index', {
        users: matchUsers,
        name: q
    });
};

module.exports.create = function(req, res){
    res.render('users/create');
};

module.exports.get = function(req, res){
    var id = req.params.id;
    var user = db.get('users').find( { id: id }).value();
    res.render('users/view', {
        user: user
    });
};

module.exports.post = function(req, res){
    req.body.id = shortid.generate();
    
    db.get('users').push(req.body).write();
    res.redirect('/users');
};