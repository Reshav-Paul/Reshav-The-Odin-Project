const User = require('../models/user');

const question = `What is the secret membership passcode?`;

module.exports.membership_get = function(req, res, next) {
    if (!req.user) res.redirect('/login');
    res.render('membership_form', { question });
};

module.exports.membership_post = function(req, res, next) {
    if (!req.user) res.redirect('/login');
    if (req.body.answer == process.env.membershipSecret) {
        User.findByIdAndUpdate(req.user._id, {isMember: true}, {}, function(err, updatedUser) {
            if (err) return next(err);
            res.redirect(updatedUser.url);
        });       
    } else {
        res.render('membership_form', { question, error: 'Wrong Code'});
    }
};