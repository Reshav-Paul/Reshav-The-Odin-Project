var express = require('express');
var path = require('path');

var app = express();

function timestampMiddleware(req, res, next) {
    let currentdate = new Date();
    let datetime = "Request Made At Time: " + currentdate.getDate() + "/"
    + (currentdate.getMonth()+1)  + "/" 
    + currentdate.getFullYear() + " @ "  
    + currentdate.getHours() + ":"  
    + currentdate.getMinutes() + ":" 
    + currentdate.getSeconds();
    console.log(datetime);

    next();
}

app.use(express.static('style'));
app.use(timestampMiddleware);
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.get('/index', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});
app.get('/about', function(req, res) {
    res.sendFile(path.join(__dirname, '/about.html'));
});
app.get('/contact-me', function(req, res) {
    res.sendFile(path.join(__dirname, '/contact-me.html'));
});
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/404.html'));
});
app.listen(3000);