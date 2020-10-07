const { body, validationResult } = require('express-validator');
const validator = require('validator');

const Message = require('../models/message');

module.exports.message_auth_check = function(req, res, next) {
    if (!req.user) {
        res.redirect('/login');
        return;
    } else {
        next();
    }
}

module.exports.message_detail = function(req, res, next) {
    if (!validator.isMongoId(req.params.id)) {
        const error = new Error('No such message exists');
        error.status = 404;
        return next(err);
    }
    Message.findById(req.params.id).populate('user').exec(function(err, message) {
        if (err) return next(err);
        message.text = validator.escape(message.text);
        message.user.username = validator.escape(message.user.username);
        message.user.firstName = validator.escape(message.user.firstName);
        if (message.user.lastName) {
            message.user.lastName = validator.escape(message.user.lastName);
        }
        res.render('message_detail', { message });
    });
}

module.exports.message_create_get = function(req, res) {
    res.render('message_create', { action: 'Create'});
}

module.exports.message_create_post = [
    body('message', 'Message must not be empty').trim().isLength({min: 1}),
    function(req, res, next) {
        const message = new Message({
            user: req.user._id,
            text: req.body.message,
        });

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('message_create', { action: 'Create', message, errors });
            return;
        }

        message.save(function(err) {
            if (err) return next(err);
            res.redirect('/');
        });
    }
]