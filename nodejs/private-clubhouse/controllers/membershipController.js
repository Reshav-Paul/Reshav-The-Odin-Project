const User = require('../models/user');

const question = `You are living in a 100-floor apartment block.
    You know that there is one floor in the block, such that if you drop a light bulb from there or anywhere higher, 
    it will crash upon hitting the ground. If you drop a light bulb from any floor underneath it however, 
    the light bulb will remain intact. If you have two light bulbs at your disposal, 
    how many drop attempts do you need such that you can surely find which the floor in question is?`;

module.exports.membership_get = function(req, res, next) {
    if (!req.user) res.redirect('/login');    
    res.render('membership_form', { question });
};

module.exports.membership_post = function(req, res, next) {
    if (req.body.answer == '14') {
        User.findByIdAndUpdate(req.user._id, {isMember: true}, {}, function(err, updatedUser) {
            if (err) return next(err);
            res.redirect(updatedUser.url);
        });       
    } else {
        res.render('membership_form', { question, error: 'Wrong Answer'});
    }
};