var express = require('express');
var userRoute = require('./routes/user.route');
var port = 3000;
var app = express();
app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', function(request, response) {
    response.render('index', { users: db.get('users').value() });
});

app.use('/users',userRoute);

app.listen(port, function() {
    console.log('Example express listening...');
});

