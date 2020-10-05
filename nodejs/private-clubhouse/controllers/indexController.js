const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const passport = require('passport');

module.exports.index_get = function (req, res, next) {
    if (!req.user) {
        res.redirect('/login');
        return;
    }
    res.render('index', { title: 'Express' });
}

module.exports.login_get = function (req, res, next) {
    if (req.user) {
        res.redirect('/');
        return;
    }
    res.render('login');
}

module.exports.login_post = [
    body('username', 'Please enter a valid email').trim().isLength({min: 1}).isEmail(),
    function(req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('login', { errors: errors });
            return;
        }        
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login'
        })(req, res, next);
    }
];

module.exports.logout_get = function(req, res, next) {
    req.logout();
    res.redirect('/login');
}

module.exports.signup_get = function (req, res, next) {
    if (req.user != undefined) {
        res.redirect('/');
        return;
    }
    res.render('signup');
}

module.exports.signup_post = [
    body('username', 'Please enter a valid email address').trim().isLength({ min: 1 }).isEmail(),
    body('password', 'Password cannot be empty').isLength({ min: 1 }),
    body('password').custom((value, { req }) => {
        if (value !== req.body.confirmPassword) {
            throw new Error('Password confirmation does not match password');
        }
        return true;
    }),
    body('firstName', 'First name must not be empty').trim().isLength({ min: 1 }),
    body('firstName', 'First name can only consist of alphabetic characters').isAlpha(),
    body('lastName', 'Last name is optional. But if provided, it must not be empty.')
        .isLength({ min: 1 }).trim().isLength({ min: 1 }),
    function (req, res, next) {
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

        bcrypt.hash(req.body.password, parseInt(process.env.passwordHashSecret), function (err, hashedPassword) {

            if (err) return next(err);
            const userData = {
                username: req.body.username,
                password: hashedPassword,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            };

            const user = new User(userData);

            user.save(function (err) {
                if (err) return next(err);
                passport.authenticate('local', {
                    successRedirect: '/',
                    failureRedirect: '/login'
                })(req, res, next);
            });
        });
    }
];