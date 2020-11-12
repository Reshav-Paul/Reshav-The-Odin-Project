const validator = require('validator');
const { body, validationResult } = require('express-validator');

const User = require('../models/user');
const Comment = require('../models/comment');
const errorHelper = require('../helpers/errorCodes');

const userCreationValidationChain = [
    body('email', errorHelper.validationErrors.invalid_email).exists().bail().trim().isEmail(),
    body('password', errorHelper.validationErrors.no_password).exists().bail().isLength({ min: 5 }),
    body('firstName', errorHelper.validationErrors.no_first_name).exists().trim(),
    body('firstName', errorHelper.validationErrors.numeric_first_name).not().isNumeric(),
    body('lastName', errorHelper.validationErrors.numeric_last_name).optional({ checkFalsy: true }).trim().not().isNumeric(),
];

const userUpdationValidationChain = [
    body('email', errorHelper.validationErrors.invalid_email).optional({ checkFalsy: true }).trim().isEmail(),
    body('firstName', errorHelper.validationErrors.numeric_first_name).optional({ checkFalsy: true }).trim().not().isNumeric(),
    body('lastName', errorHelper.validationErrors.numeric_last_name).optional({ checkFalsy: true }).trim().not().isNumeric(),
];

module.exports.user_list = function (req, res, next) {
    User.find().exec(function (err, users) {
        if (err) return next(err);
        res.json(users);
    });
};

module.exports.user_details = function (req, res, next) {
    if (!validator.isMongoId(req.params.id)) {
        res.json({ error: errorHelper.mongoIdParameterError });
        return;
    }
    User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        if (!user) {
            res.json({ error: errorHelper.user_not_found });
            return;
        }
        res.json(user);
    });
}

module.exports.user_create = [
    ...userCreationValidationChain,
    function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({
                error: { status: 'Validation_Error', errors: errors.array() }
            });
            return;
        }

        const { email, password, firstName } = req.body;
        const userData = { email, password, firstName };
        if (req.body.lastName) userData.lastName = req.body.lastName;

        let user = new User(userData);
        user.save(function (err, createdUser) {
            if (err) {
                if (err.code == 11000) {
                    res.json({ error: errorHelper.duplicate_email });
                    return;
                }
                return next(err);
            }
            let { __v, password, ...responseObject } = createdUser.toJSON();
            res.json(responseObject);
        });
    }
];

module.exports.user_delete = function (req, res, next) {
    if (!validator.isMongoId(req.params.id)) {
        res.json({ error: errorHelper.mongoIdParameterError });
        return;
    }
    User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        if (!user) {
            res.json({ error: errorHelper.user_not_found });
            return;
        }
        user.remove(function (err, deletedUser) {
            if (err) return next(err);
            Comment.updateMany({ user: user._id }, { user: undefined }, function(err, updateRes) {
                if (err) return next(err);
                res.json(deletedUser);
            });            
        })
    });
}


module.exports.user_update = [
    ...userUpdationValidationChain,
    function (req, res, next) {
        if (!validator.isMongoId(req.params.id)) {
            res.json({ error: errorHelper.mongoIdParameterError });
            return;
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({
                error: { status: 'Validation_Error', errors: errors.array() }
            });
            return;
        }
        const userData = {};
        const data = req.body;

        if (data.email) userData.email = data.email;
        if (data.firstName) userData.firstName = data.firstName;
        if (data.lastName) userData.lastName = data.lastName;

        if (Object.keys(userData).length === 0) {
            User.findById(req.params.id, function (err, user) {
                if (err) return next(err);
                res.json(user);
            });
        } else {
            User.findByIdAndUpdate(req.params.id, userData, function (err, user) {
                if (err) {
                    if (err.code == 11000) {
                        res.json({ error: errorHelper.duplicate_email });
                        return;
                    }
                    return next(err);
                }
                res.json(user);
            })
        }
    }
];

module.exports.user_comments = function (req, res, next) {
    if (!validator.isMongoId(req.params.id)) {
        res.json({ error: errorHelper.mongoIdParameterError });
        return;
    }
    Comment.find({ user: req.params.id }).exec(function (err, comments) {
        if (err) return next(err);
        res.json(comments);
    });
}