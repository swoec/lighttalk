var express = require('express'),
    routes = require('./routes'),
    topics = require('./routes/talks'),
    http = require('http'),
    path = require('path');
var URL = require('url');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/home', function (req, res) {
    res.sendFile(__dirname + "/" + "Lindex.html");
});
app.get('/', topics.list);

app.get('/topics', topics.list);

app.get('/topics/maxid', topics.getMax);

app.post('/topics/topic', topics.add);

app.get('/topics/title', topics.findByName);

var server = app.listen(3001, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("access link is  http://%s:%s", host, port);
});
