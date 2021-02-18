var express = require('express');
var low = require('lowdb');
var shortid = require('shortid');
var app = express();
var port = 3000;
app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var db = low(adapter);
// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
  .write()

app.get('/', function(request, response) {
    response.render('index', { users: db.get('users').value() });
});

app.get('/users', function(request, response) {
    response.render('index', { users: db.get('users').value() });
});

app.get('/users/search', function(request, response) {
    var q = request.query.q;
    var users = db.get('users').value();
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

app.get('/users/:id', function(req, res){
    var id = req.params.id;
    var user = db.get('users').find( { id: id }).value();
    res.render('users/view', {
        user: user
    });
});

app.post('/users/create', function(req, res){
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
});

app.listen(port, function() {
    console.log('Example express listening...');
});

