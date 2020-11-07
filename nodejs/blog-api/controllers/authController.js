const jwt = require('jsonwebtoken');
const passport = require('passport');

module.exports.login = function(req, res, next) {
    passport.authenticate('login', function(err, user, message) {
        if (err || !user) {
            if (message) {
                res.json(message);
                return;
            }
            const error = new Error('An Error Occured');
            return next(error);
        }
        req.login(
            user,
            { session: false },
            err => {
            if (err) return next(err);
            const body = { _id: user._id, email: user.email };
            const token = jwt.sign({ user: body }, process.env.jwtSecret);

            return res.json({
                login: true,
                email: user.email,
                token: token,
            });
        });
    })(req, res, next);
}

module.exports.auth_jwt = passport.authenticate('jwt', { session: false });