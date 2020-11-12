const { unauth_user, mongoIdParameterError, mongoIdError } = require('../helpers/errorCodes');
const validator = require('validator');

module.exports.validateUserIdInParam = function (req, res, next) {
    if (!validator.isMongoId(req.params.id)) {
        res.status(400).json({ error: mongoIdParameterError });
        return;
    }
    if (req.user._id.toString() === req.params.id) {
        next();
        return;
    }
    res.status(401).json({ error: unauth_user });
}

module.exports.validateUserIdInBody = function (req, res, next) {
    if (req.body.user == undefined) {
        res.json({
            error: {
                status: 'Validation_Error',
                errors: [{ msg: mongoIdError.message, param: 'user', location: 'body' }]
            } 
        });
        return;
    }
    if (!validator.isMongoId(req.body.user)) {
        res.json({
            error: {
                status: 'Validation_Error',
                errors: [{ msg: mongoIdError.message, param: 'user', location: 'body' }]
            } 
        });
        return;
    }
    if (req.user._id.toString() === req.body.user) {
        next();
        return;
    }
    res.status(401).json({ error: unauth_user });
}