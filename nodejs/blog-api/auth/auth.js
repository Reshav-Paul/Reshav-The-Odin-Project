const passportJwt = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const Editor = require('../models/editor');
const errorHelper = require('../helpers/errorCodes');

passport.use('user-login', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        session: false
    },
    function (email, password, done) {
        User.findOne({ email: email }, 'email password').exec(function (err, user) {
            if (err) return done(err);
            if (!user) {
                return done(null, false, { error: errorHelper.login_user_not_found });
            }
            bcrypt.compare(password, user.password, function (err, success) {
                if (err) return done(err);
                if (success) {
                    return done(null, user);
                } else {
                    return done(null, false, errorHelper.login_wrong_password);
                }
            })
        });
    }
));

passport.use('editor-login', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        session: false
    },
    function (email, password, done) {
        Editor.findOne({ email: email }, 'email password').exec(function (err, editor) {
            if (err) return done(err);
            if (!editor) {
                return done(null, false, { error: errorHelper.login_user_not_found });
            }
            bcrypt.compare(password, editor.password, function (err, success) {
                if (err) return done(err);
                if (success) {
                    return done(null, editor);
                } else {
                    return done(null, false, errorHelper.login_wrong_password);
                }
            })
        });
    }
));

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.jwtSecret;

passport.use('jwt-auth', new JwtStrategy(opts, function (jwt_payload, done) {
    if (jwt_payload.user.isEditor) {
        Editor.findById(jwt_payload.user._id, function (err, editor) {
            if (err) {
                return done(err, false);
            }
            if (editor) {
                editor.isEditor = true;
                return done(null, editor);
            } else {
                return done(null, false);
            }
        });
    } else {
        User.findById(jwt_payload.user._id, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }    
}));

passport.use('editor-jwt-auth', new JwtStrategy(opts, function (jwt_payload, done) {
    Editor.findById(jwt_payload.user._id, function (err, editor) {
        if (err) {
            return done(err, false);
        }
        if (editor) {
            editor.isEditor = true;
            return done(null, editor);
        } else {
            return done(null, false);
        }
    });
}));
