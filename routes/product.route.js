var express = require('express');

var controller = require('../controllers/product.controller');

var router = express.Router();

router.get('/show', controller.show);

module.exports = router;