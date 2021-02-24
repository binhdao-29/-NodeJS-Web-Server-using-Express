var db = require('../db');
var shortid = require('shortid');


module.exports.create = function(req, res, next) {
    res.render('transfer/create');
};

module.exports.postTransfer = function(req, res, next) {
    var data = {
        id: shortid.generate(),
        amount: parseInt(req.body.amount),
        accountIdId: req.body.accountId,
        userId: req.signedCookies.userID
    }
    db.get('transfers').push(data).write();
    res.redirect('/transfer/create');
};