const validator = require('validator');
const { body, validationResult } = require('express-validator');

const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');
const errorHelper = require('../helpers/errorCodes');

module.exports.comment_list = function (req, res, next) {
    Comment.find().exec(function (err, comments) {
        if (err) return next(err);
        res.json(comments);
    });
}

module.exports.comment_detail = function (req, res, next) {
    if (!validator.isMongoId(req.params.id)) {
        res.status(404).json(errorHelper.mongoIdParameterError);
        return;
    }
    Comment.findById(req.params.id).exec(function (err, comment) {
        if (err) return next(err);
        if (!comment) {
            res.status(404).json(errorHelper.comment_not_found);
            return;
        }
        res.json(comment);
    });
}

module.exports.comment_create = [
    body('text', errorHelper.validationErrors.no_comment_text).exists().bail().trim().isLength({ min: 1 }),
    body('dateCreated', errorHelper.validationErrors.date_wrong_format).optional({ checkFalsy: true }).isISO8601(),
    body('user', errorHelper.mongoIdError.message).exists().isMongoId(),
    body('post', errorHelper.mongoIdError.message).exists().isMongoId(),
    function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({
                error: { status: 'Validation_Error', errors: errors.array() }
            });
            return;
        }
        const { text, user, post } = req.body;
        let commentData = { text, user, post };
        if (req.body.dateCreated) commentData.dateCreated = req.body.dateCreated;

        User.findById(user, function (err, fetchedUser) {
            if (err) return next(err);
            if (!fetchedUser) {
                res.status(404).json(errorHelper.user_not_found);
                return;
            }
            Post.findById(post, function (err, fetchedPost) {
                if (err) return next(err);
                if (!fetchedPost) {
                    res.status(404).json(errorHelper.post_not_found);
                    return;
                }

                let comment = new Comment(commentData);
                comment.save(function (err, savedComment) {
                    if (err) return next(err);
                    res.json(savedComment);
                });
            });
        });
    }
];

module.exports.comment_update = [
    body('text', errorHelper.validationErrors.no_comment_text).exists({ checkFalsy: true }).trim().isLength({ min: 1 }),
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
        const { text } = req.body;

        Comment.findById(req.params.id, function (err, comment) {
            if (err) return next(err);
            if (!comment) {
                res.status(404).json(errorHelper.comment_not_found);
                return;
            }
            if (comment.text === text) {
                res.json(comment);
                return;
            }
            comment.text = text;
            comment.save(function(err, updatedComment) {
                if (err) return next(err);
                res.json(updatedComment);
            });
        });
    }
];

module.exports.comment_delete = function(req, res, next) {
    if (!validator.isMongoId(req.params.id)) {
        res.status(400).json({ error: errorHelper.mongoIdParameterError });
        return;
    }
    Comment.findByIdAndRemove(req.params.id, function(err, deletedComment) {
        if (err) return next(err);
        if (!deletedComment) {
            res.status(404).json(errorHelper.comment_not_found);
            return;
        }
        res.json(deletedComment);
    });
}

module.exports.comment_user = function(req, res, next) {
    if (!validator.isMongoId(req.params.id)) {
        res.status(400).json({ error: errorHelper.mongoIdParameterError });
        return;
    }
    Comment.findById(req.params.id).exec(function(err, comment) {
        if (err) return next(err);
        if (!comment) {
            res.status(404).json(errorHelper.comment_not_found);
            return;
        }
        User.findById(comment.user).exec(function(err, user) {
            if (err) return next(err);
            if (!user) {
                res.status(404).json(errorHelper.user_not_found);
                return;
            }
            res.json(user);
        });
    });
}

module.exports.comment_post = function(req, res, next) {
    if (!validator.isMongoId(req.params.id)) {
        res.status(400).json({ error: errorHelper.mongoIdParameterError });
        return;
    }
    Comment.findById(req.params.id).exec(function(err, comment) {
        if (err) return next(err);
        if (!comment) {
            res.status(404).json(errorHelper.comment_not_found);
            return;
        }
        Post.findById(comment.post).exec(function(err, post) {
            if (err) return next(err);
            if (!post) {
                res.status(404).json(errorHelper.post_not_found);
                return;
            }
            res.json(post);
        });
    });
}