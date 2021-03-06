require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const validator = require('validator');

var indexRouter = require('./routes/index');
var messageRouter = require('./routes/message');
const usersRouter = require('./routes/users');
const User = require('./models/user');

var app = express();

mongoose.connect(process.env.mongoDbUrl, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({username: username}).exec(function(err, user) {
      if (err) return done(err);

      if (!user) {
        return done(null, false, { msg: 'Incorrect Username' });
      }
      bcrypt.compare(password, user.password, function (err, res) {
        if (res) {
          user.username = validator.escape(user.username);
          user.firstName = validator.escape(user.firstName);
          if (user.lastName) {
            user.lastName = validator.escape(user.lastName);
          }
          return done(null, user);
        } else {
          return done(null, false, { msg: 'Incorrect Password' });
        }
      });
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id).exec(function(err, user) {
    user.username = validator.escape(user.username);
    user.firstName = validator.escape(user.firstName);
    if (user.lastName) {
      user.lastName = validator.escape(user.lastName);
    }
    done(err, user);
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(session({secret: process.env.sessionSecret, resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});
app.use('/', indexRouter);
app.use('/message', messageRouter);
app.use('/user', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
