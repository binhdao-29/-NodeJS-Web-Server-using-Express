var md5 = require('md5');

var db = require('../db');
const { use } = require('../routes/user.route');

module.exports.login = function(request, response) {
    response.render('auth/login', { users: db.get('users').value() });
};

module.exports.postLogin = function(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var user = db.get('users').find({ email: email}).value();

    if (!user) {
        res.render('auth/login', {
            errors: [
                'User does not exit!'
            ],
            values: req.body
        });
        return;
    }
    var hashPassword = md5(password);
    if (user.password !== hashPassword) {
        res.render('auth/login', {
            errors: [
                'Wrong password!'
            ],
            values: req.body
        });
        return;
    }

    res.cookie('userID', user.id);
    res.redirect('/users');
};