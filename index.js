var express = require('express');
var app = express();
var port = 3000;
app.set('views', './views');
app.set('view engine', 'pug');
app.get('/', function(request, response) {
    response.render('index', {
        users: [
            { name: 'Tom'},
            { name: 'Haley'},
            { name: 'Alex'}
        ]
    });
});
app.get('/user', function(request, response) {
    response.send('Users List');
});
app.listen(port, function() {
    console.log('Example express listening');
});

