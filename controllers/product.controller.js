var db = require('../db');

module.exports.show = function(req, res, next) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 8;
    var start = ( page -1 ) * perPage;
    var end = page * perPage;
    res.render('product/show', {
       products :  db.get('products').value().slice(start, end)
    });
};
