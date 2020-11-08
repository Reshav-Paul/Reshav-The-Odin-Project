const jwt = require('jsonwebtoken');
const passport = require('passport');

module.exports.user_login = function(req, res, next) {
    passport.authenticate('user-login', function(err, user, message) {
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

module.exports.editor_login = function(req, res, next) {
    passport.authenticate('editor-login', function(err, editor, message) {
        if (err || !editor) {
            if (message) {
                res.json(message);
                return;
            }
            const error = new Error('An Error Occured');
            return next(error);
        }
        req.login(
            editor,
            { session: false },
            err => {
            if (err) return next(err);
            const body = { _id: editor._id, email: editor.email, isEditor: true };
            const token = jwt.sign({ user: body }, process.env.jwtSecret);

            return res.json({
                login: true,
                email: editor.email,
                token: token,
            });
        });
    })(req, res, next);
}

module.exports.jwt_auth = passport.authenticate('jwt-auth', { session: false });
module.exports.editor_jwt_auth = passport.authenticate('editor-jwt-auth', { session: false });