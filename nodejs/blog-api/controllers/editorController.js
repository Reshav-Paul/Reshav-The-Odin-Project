const validator = require('validator');
const { body, validationResult } = require('express-validator');

const Editor = require('../models/editor');
const Post = require('../models/post');
const errorHelper = require('../helpers/errorCodes');

const editorCreationValidationChain = [
    body('email', errorHelper.validationErrors.invalid_email).exists().bail().trim().isEmail(),
    body('password', errorHelper.validationErrors.no_password).exists().bail().isLength({ min: 5 }),
    body('username', errorHelper.validationErrors.no_username).exists().bail().trim(),
    body('firstName', errorHelper.validationErrors.no_first_name).exists().trim(),
    body('firstName', errorHelper.validationErrors.numeric_first_name).not().isNumeric(),
    body('lastName', errorHelper.validationErrors.no_last_name).exists().trim(),
    body('lastName', errorHelper.validationErrors.numeric_last_name).not().isNumeric(),
];

const editorUpdationValidationChain = [
    body('email', errorHelper.validationErrors.invalid_email).optional({ checkFalsy: true }).trim().isEmail(),
    body('firstName', errorHelper.validationErrors.numeric_first_name).optional({ checkFalsy: true }).trim().not().isNumeric(),
    body('lastName', errorHelper.validationErrors.numeric_last_name).optional({ checkFalsy: true }).trim().not().isNumeric(),
];

module.exports.editor_list = function (req, res, next) {
    Editor.find().exec(function (err, editors) {
        if (err) return next(err);
        res.json(editors);
    });
};

module.exports.editor_details = function (req, res, next) {
    if (!validator.isMongoId(req.params.id)) {
        res.status(400).json({ error: errorHelper.mongoIdParameterError });
        return;
    }
    Editor.findById(req.params.id, function (err, editor) {
        if (err) return next(err);
        if (!editor) {
            res.status(404).json({ error: errorHelper.editor_not_found });
            return;
        }
        res.json(editor);
    });
}

module.exports.editor_create = [
    ...editorCreationValidationChain,
    function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({
                error: { status: 'Validation_Error', errors: errors.array() }
            });
            return;
        }

        const { email, password, firstName, lastName, username } = req.body;
        const editorData = { email, password, firstName, lastName, username };

        let editor = new Editor(editorData);
        editor.save(function (err, createdEditor) {
            if (err) {
                if (err.code == 11000) {
                    res.json({ error: errorHelper.duplicate_email });
                    return;
                }
                return next(err);
            }
            let { __v, password, ...responseObject } = createdEditor.toJSON();
            res.json(responseObject);
        });
    }
];

module.exports.editor_delete = function (req, res, next) {
    if (!validator.isMongoId(req.params.id)) {
        res.status(400);
        res.json({ error: errorHelper.mongoIdParameterError });
        return;
    }
    Editor.findById(req.params.id, function (err, editor) {
        if (err) return next(err);
        if (!editor) {
            res.status(404).json({ error: errorHelper.editor_not_found });
            return;
        }
        editor.remove(function (err, deletedEditor) {
            if (err) return next(err);
            res.json(deletedEditor);
        });
    });
}


module.exports.editor_update = [
    ...editorUpdationValidationChain,
    function (req, res, next) {
        if (!validator.isMongoId(req.params.id)) {
            res.status(400).json({ error: errorHelper.mongoIdParameterError });
            return;
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({
                error: { status: 'Validation_Error', errors: errors.array() }
            });
            return;
        }
        const editorData = {};
        const data = req.body;

        if (data.email) editorData.email = data.email;
        if (data.firstName) editorData.firstName = data.firstName;
        if (data.lastName) editorData.lastName = data.lastName;
        if (data.username) editorData.username = data.username;

        if (Object.keys(editorData).length === 0) {
            Editor.findById(req.params.id, function (err, editor) {
                if (err) return next(err);
                res.json(editor);
            });
        } else {
            Editor.findByIdAndUpdate(req.params.id, editorData, function (err, editor) {
                if (err) {
                    if (err.code == 11000) {
                        res.json({ error: errorHelper.duplicate_email });
                        return;
                    }
                    return next(err);
                }
                res.json(editor);
            });
        }
    }
];

module.exports.editor_posts = function (req, res, next) {
    if (!validator.isMongoId(req.params.id)) {
        res.status(400).json({ error: errorHelper.mongoIdParameterError });
        return;
    }
    Post.find({ editor: req.params.id }).exec(function(err, posts) {
        if (err) return next(err);
        res.json(posts);
    });
}