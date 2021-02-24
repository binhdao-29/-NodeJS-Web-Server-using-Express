var shortid = require('shortid');
var db = require('../db');

module.exports = function(req, res, next) {
    if (!req.signedCookies.sessionId) {
        var sessionId  = shortid.generate();
        res.cookie('sessionId', sessionId, {
            signed : true
        });

        db.get('sessions').push({
            id : sessionId
        }).write();
    }
    var sessionId2  = req.signedCookies.sessionId;

    var cart = db.get('sessions')
    .find({ id : sessionId2 })
    .get('cart')
    .value();

    var s = 0;
    for ( var c in cart) {
        s += cart[c];
    }

    res.locals.total = s;
    next();
};