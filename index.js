var express = require('express');
var app = express();
var port = 3000;
app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var users = [
    { name: 'Tom'},
    { name: 'Haley'},
    { name: 'Alex'},
    { name: 'John'}
];
app.get('/', function(request, response) {
    response.render('index', { users: users });
});

app.get('/users', function(request, response) {
    response.render('index', { users: users });
});

app.get('/users/search', function(request, response) {
    var q = request.query.q;
    var matchUsers = users.filter(function(user){
        return user.name.indexOf(q) !== -1;
    });
    response.render('users/index', {
        users: matchUsers,
        name: q
    });
});

app.get('/users/create', function(req, res){
    res.render('users/create');
});

app.post('/users/create', function(req, res){
    users.push(req.body);
    res.redirect('/users');
});

app.listen(port, function() {
    console.log('Example express listening');
});

