const passportJwt = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const errorHelper = require('../helpers/errorCodes');

passport.use('login', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        session: false
    },
    function(email, password, done) {
        User.findOne({ email: email }).select('password').exec(function(err, user) {
            if (err) return done(err);
            if (!user) {
                return done(null, false, {error: errorHelper.login_user_not_found});
            }
            bcrypt.compare(password, user.password, function(err, success) {
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

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.jwtSecret;
opts.issuer = 'api.blog.com';

passport.use('jwt', new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload._id}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));