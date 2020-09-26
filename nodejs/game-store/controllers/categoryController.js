let async = require('async');
let { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

let Category = require('../models/Category');
let Game = require('../models/Game');

module.exports.index = function(req, res) {
    res.redirect('/categories');
};

module.exports.category_list = function (req, res, next) {
    Category.find().exec(function (err, results) {
        if (err) return next(err);
        res.render('index', { error: err, data: results });
    });
};

module.exports.category_detail = function (req, res, next) {
    async.parallel({
        category: function(callback) {
            Category.findById(req.params.id).exec(callback);
        },
        games: function(callback) {
            Game.find({'category': req.params.id}).exec(callback);
        }
    }, function (err, results) {
        if (err) return next(err);
        res.render('category_detail', {category: results.category, games: results.games});
    });
};

module.exports.category_create_get = function(req, res, next) {
    res.render('category_create');
};

module.exports.category_create_post = [
    body('name', 'Name must not be empty').trim().escape().isLength({min: 1}),
    body('description', 'Description must not be empty').trim().escape().isLength({min: 1}),
    body('abbreviation', 'Something wrong with the abbreviation').optional({checkFalsy: true}).escape(),
    body('imageUrl', 'Something wrong with the image url').optional({checkFalsy: true}).escape(),

    function (req, res, next) {
        const errors = validationResult(req);
        const {name, abbreviation, description, imageUrl} = req.body;
        const categoryData = {name, description};
        if (imageUrl.length > 0) categoryData.imageUrl = imageUrl;
        if (abbreviation.length > 0) categoryData.abbreviation = abbreviation;
        
        const category = new Category(categoryData);

        if (!errors.isEmpty()) {
            if (imageUrl.length == 0) category.imageUrl = '';
            res.render('category_create', {category: category, errors: errors});
            return;
        } else {
            category.save(function(err) {
                if (err) return next(err);
                res.redirect(category.url);
            });
        }
    }
];

module.exports.category_delete_get = function(req, res, next) {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.redirect('/');
        return;
    }
    async.parallel({
        category: function(callback) {
            Category.findById(req.params.id).exec(callback);
        },
        games: function(callback) {
            Game.find({category: req.params.id}).exec(callback);
        }
    }, function(err, results) {
        if (err) return next(err);

        if (results.category == undefined) {
            res.redirect('/categories/');
            return;
        }

        res.render('category_delete', {category: results.category, games: results.games});
    });
};

module.exports.category_delete_post = function(req, res, next) {
    async.parallel({
        category: function(callback) {
            Category.findById(req.params.id).exec(callback);
        },
        games: function(callback) {
            Game.find({category: req.params.id}).exec(callback);
        }
    }, function(err, results) {
        if (err) return next(err);

        if (results.games.length > 0) {
            res.render('category_delete', {category: results.category, games: results.games});
            return;
        } else {
            Category.findByIdAndRemove(results.category._id, function(err) {
                if (err) return next(err);
                res.redirect('/categories/');
            });
        }
    });
};