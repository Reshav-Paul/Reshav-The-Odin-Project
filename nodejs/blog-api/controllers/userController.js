const validator = require('validator');
const { body, validationResult } = require('express-validator');

const User = require('../models/user');
const errorHelper = require('../helpers/errorCodes');

module.exports.user_list = function (req, res, next) {
    User.find().exec(function (err, users) {
        if (err) return next(err);
        res.json(users);
    });
};

module.exports.user_details = function(req, res, next) {
    if (!validator.isMongoId(req.params.id)) {
        res.status(400);
        res.json({ error: errorHelper.mongoIdError });
        return;
    }
    User.findById(req.params.id, function(err, user) {
        if (err) return next(err);
        if (!user) {
            res.status(404);
            res.json({ error: errorHelper.user_not_found });
            return;
        }
        res.json(user);
    });
}
