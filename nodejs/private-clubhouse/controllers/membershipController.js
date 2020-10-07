const User = require('../models/user');

const question = `What is the secret membership passcode?`;

module.exports.auth_check = function(req, res, next) {
    if (!req.user) {
        res.redirect('login');
        return;
    }
    next();
}

module.exports.membership_get = function(req, res, next) {
    if (req.user.isMember) res.redirect(req.user.url);
    res.render('membership_form', { question });
};

module.exports.membership_post = function(req, res, next) {
    if (req.user.isMember) res.redirect(req.user.url);
    if (req.body.answer === process.env.membershipSecret) {
        User.findByIdAndUpdate(req.user._id, {isMember: true}, {}, function(err, updatedUser) {
            if (err) return next(err);
            res.redirect(updatedUser.url);
        });
    } else {
        res.render('membership_form', { question, error: 'Wrong Code'});
    }
};

module.exports.admin_get = function(req, res, next) {
    res.render('admin_form');
}

module.exports.admin_post = function(req, res, next) {
    if (req.body.answer === process.env.adminSecret) {
        User.findByIdAndUpdate(req.user._id, {isAdmin: true}, {}, function(err, updatedUser) {
            if (err) return next(err);
            res.redirect(updatedUser.url);
        });
    } else {
        res.render('admin_form', { error: 'Wrong Code'});
    }
}