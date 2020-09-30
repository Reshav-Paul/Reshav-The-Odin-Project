var express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.user == undefined) {
	  res.redirect('/login');
	  return;
  }
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  if (req.user != undefined) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', function(req, res, next) {
  if (req.user != undefined) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

router.post('/signup', [
  body('username', 'Please enter a valid email address').trim().isLength({min: 1}).isEmail(),
  body('password', 'Password cannot be empty').isLength({min: 1}),
  body('password').custom((value, { req }) => {
    if (value !== req.body.confirmPassword) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),
  body('firstName', 'First name must not be empty').trim().isLength({min: 1}),
  body('firstName', 'First name can only consist of alphabetic characters').isAlpha(),
  body('lastName', 'Last name is optional. But if provided, it must not be empty.')
    .isLength({min: 1}).trim().isLength({min: 1}),
  function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('signup', {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        errors: errors
      });
      return;
    }
    
    bcrypt.hash(req.body.password, parseInt(process.env.passwordHashSecret), function(err, hashedPassword) {

      if (err) return next(err);
      const userData = {
        username: req.body.username,
        password: hashedPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      };
  
      const user = new User(userData);

      user.save(function(err) {
        if (err) return next(err);
        // TODO: perform login
        res.redirect('/');
      });
    });    
  }
]);

module.exports = router;
