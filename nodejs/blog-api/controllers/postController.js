const { body, validationResult, param } = require('express-validator');
const validator = require('validator');

const errorHelper = require('../helpers/errorCodes');
const Post = require('../models/post');
const Editor = require('../models/editor');
const Comment = require('../models/comment');

function checkPublishFlagExistence(value) {
    if (value == undefined) return false;
    return true;
}

module.exports.published_posts_list = function (req, res, next) {
    Post.find({ isPublished: true }).exec(function (err, posts) {
        if (err) return next(err);
        res.json(posts);
    });
}

module.exports.all_posts_list = function (req, res, next) {
    Post.find().exec(function (err, posts) {
        if (err) return next(err);
        res.json(posts);
    });
}

module.exports.post_detail = function (req, res, next) {
    if (!validator.isMongoId(req.params.id)) {
        res.json({ error: errorHelper.mongoIdParameterError });
        return;
    }
    Post.findById(req.params.id).exec(function (err, post) {
        if (err) return next(err);
        if (!post) {
            res.json({error: errorHelper.post_not_found});
            return;
        }
        res.json(post);
    });
}

module.exports.post_create = [
    body('title', errorHelper.validationErrors.no_title).exists().trim(),
    body('text', errorHelper.validationErrors.no_body_text).exists().trim(),

    body('isPublished', errorHelper.validationErrors.published_flag_wrong_format)
        .if(checkPublishFlagExistence).isBoolean(),

    body('datePublished', errorHelper.validationErrors.date_wrong_format)
        .optional({ checkFalsy: true }).isISO8601(),

    body('editor', errorHelper.mongoIdError.message).exists().bail().isMongoId(),

    async function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({
                error: { status: 'Validation_Error', errors: errors.array() }
            });
            return;
        }
        const { title, text, editor } = req.body;
        let postData = { title, text, editor };
        if (typeof req.body.isPublished === 'boolean') postData.isPublished = req.body.isPublished;
        if (req.body.datePublished) postData.datePublished = Date.parse(req.body.datePublished);

        try {
            let fetchedEditor = await Editor.findById(editor);
            if (!fetchedEditor) {
                res.json({error: errorHelper.editor_not_found});
                return;
            }

            let post = new Post(postData);
            post.save(function (err, createdPost) {
                if (err) return next(err);
                res.json(createdPost);
            });
        } catch (error) {
            return next(error);
        }
    }
];

module.exports.post_delete = [
    param('id', errorHelper.mongoIdParameterError).exists().isMongoId(),
    function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.json({ error: errorHelper.mongoIdParameterError });
            return;
        }

        Post.findById(req.params.id).exec(function (err, post) {
            if (err) return next(err);
            if (!post) {
                res.json({error: errorHelper.post_not_found});
                return;
            }
            if (post.editor.toString() !== req.user._id.toString()) {
                res.status(401).send('Unauthorized');
                return;
            }

            post.remove(function (err, removedPost) {
                if (err) return next(err);
                Comment.deleteMany({ post: post._id }, function(err, deleteRes) {
                    if (err) return next(err);
                    res.json(removedPost);
                });                
            });
        });
    }
];

module.exports.post_update = [
    body('title', errorHelper.validationErrors.no_title)
        .optional().trim().isLength({ min: 1 }),
    body('text', errorHelper.validationErrors.no_body_text)
        .optional().trim().isLength({ min: 1 }),

    body('isPublished', errorHelper.validationErrors.published_flag_wrong_format).
        if(checkPublishFlagExistence).isBoolean(),

    body('datePublished', errorHelper.validationErrors.date_wrong_format)
        .optional({ checkFalsy: true }).isISO8601(),

    body('editor', errorHelper.mongoIdError.message)
        .optional({ checkFalsy: true }).isMongoId(),

    async function (req, res, next) {
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
        if (req.body.editor) {
            if (req.user._id.toString() !== req.body.editor) {
                res.status(401).send('Unauthorized');
                return;
            }
        }

        let data = req.body;
        const { title, text, isPublished, datePublished } = data;

        try {
            Post.findById(req.params.id).exec(function (err, post) {
                if (err) return next(err);
                if (!post) {
                    res.json({ error: errorHelper.post_not_found });
                    return;
                }
                if (post.editor.toString() !== req.user._id.toString()) {
                    res.status(401).send('Unauthorized');
                    return;
                }

                post.title = title || post.title;
                post.text = text || post.text;
                if (isPublished != undefined) post.isPublished = isPublished;
                post.editor = data.editor || post.editor;

                if (post.isPublished) {
                    if (datePublished) post.datePublished = datePublished;
                    else post.datePublished = post.datePublished || Date.now();
                }
                if (!post.isPublished && post.datePublished) post.datePublished = undefined;

                post.save(function (err, updatedPost) {
                    if (err) return next(err);
                    res.json(updatedPost);
                });
            });
        } catch (error) {
            return next(error);
        }
    }
];

module.exports.post_editor = function (req, res, next) {
    if (!validator.isMongoId(req.params.id)) {
        res.json({ error: errorHelper.mongoIdParameterError });
        return;
    }
    Post.findById(req.params.id, 'editor').exec(function (err, post) {
        if (err) return next(err);
        if (!post) {
            res.json({ error: errorHelper.post_not_found });
            return;
        }
        Editor.findById(post.editor).exec(function (err, editor) {
            if (err) return next(err);
            if (!editor) {
                res.json({ error: errorHelper.editor_not_found });
                return;
            }
            res.json(editor);
        });
    });
}

module.exports.post_comments = function (req, res, next) {
    if (!validator.isMongoId(req.params.id)) {
        res.json({ error: errorHelper.mongoIdParameterError });
        return;
    }
    Comment.find({ post: req.params.id }).exec(function (err, comments) {
        if (err) return next(err);
        res.json(comments);
    });
}