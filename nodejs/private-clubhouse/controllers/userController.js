const validator = require('validator');

const User = require('../models/user');

module.exports.user_detail = function(req, res, next) {
    if (!req.user) {
        res.redirect('/login');
        return;
    }
    if (!validator.isMongoId(req.params.id)) {
        let error = new Error('No such user found');
        error.status = 404;
        return next(err);
    }

    User.findById(req.params.id).exec(function(err, user) {
        if (err) return next(err);
        if (!user) {
            let error = new Error('No such user found');
            error.status = 404;
            return next(err);
        }

        user.username = validator.escape(user.username);
        user.firstName = validator.escape(user.firstName);
        if (user.lastName) {
            user.lastName = validator.escape(user.lastName);
        }
        const isAuthorized = res.locals.currentUser && (res.locals.currentUser.isAdmin 
            || res.locals.currentUser.isMember 
            || req.params.id === res.locals.currentUser._id.toString());

        res.render('user_detail', { user, isAuthorized });
    });
}