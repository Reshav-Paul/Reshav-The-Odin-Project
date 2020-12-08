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
    const userMongoIdErrorMessage = {
        error: {
            status: 'Validation_Error',
            errors: [{ msg: mongoIdError.message, param: 'user', location: 'body' }]
        }
    };
    const editorMongoIdErrorMessage = {
        error: {
            status: 'Validation_Error',
            errors: [{ msg: mongoIdError.message, param: 'editor', location: 'body' }]
        }
    };
    let success = false;
    if (req.user.isEditor) {
        success = matchBodyWithUser(res, req.body.editor || req.body.user, req.user, editorMongoIdErrorMessage);
    } else {
        success = matchBodyWithUser(res, req.body.user, req.user, userMongoIdErrorMessage);
    }
    if (success) next();
}

function matchBodyWithUser(res, bodyUserId, reqUser, errorMessage) {
    if (bodyUserId == undefined) {
        res.json(errorMessage);
        return false;
    }
    if (!validator.isMongoId(bodyUserId)) {
        res.json(errorMessage);
        return;
    }
    if (reqUser._id.toString() !== bodyUserId) {
        res.status(401).json({ error: unauth_user });
        return false;
    }
    if (reqUser._id.toString() === bodyUserId)
        return true;
    else {
        res.status(401).json({ error: unauth_user });
        return false;
    }
}