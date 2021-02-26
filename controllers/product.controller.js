var db = require('../db');
var Product = require('../models/product.model');

module.exports.show = async function(req, res, next) {
    var page = parseInt(req.query.page) || 1;
    var perPage = 8;
    var start = ( page -1 ) * perPage;
    var end = page * perPage;
    // Product.find().then(function(products) {
    //     res.render('product/show', {
    //         //    products :  db.get('products').value().slice(start, end)
    //             products : products
    //         });
    // });
    var products = await Product.find();
    res.render('product/show', {
        products : products.slice(start, end)
    });
};
