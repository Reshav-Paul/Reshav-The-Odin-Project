require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('../routes/index');
var apiRouter = require('../routes/api');
var dbHandler = require('./mongoTestConfig');

var app = express();
dbHandler.connect();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/close', function (req, res, next) {
    dbHandler.closeDatabase();
    res.send('app closed');
    server.close(function () { console.log('Doh :('); });
})

var server = app.listen(3000, function () {
    console.log('Listening :)');    
});
