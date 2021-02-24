require('dotenv').config();

var express = require('express');
var db = require('./db.js');
var cookieParser = require('cookie-parser');

var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middlewaer');

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var productRoute = require('./routes/product.route');
var cartRoute = require('./routes/cart.route');
var port = 3000;
var app = express();
app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static('public'));
app.use(cookieParser(process.env.SECTION_SECRET));
app.use(sessionMiddleware);

app.get('/', function(request, response) {
    response.render('index', { users: db.get('users').value() });
});

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/product', productRoute);
app.use('/cart', cartRoute);


app.listen(port, function() {
    console.log('Example express listening...');
});

