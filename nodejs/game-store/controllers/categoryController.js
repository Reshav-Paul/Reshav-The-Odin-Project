let async = require('async');
let { body, validationResult } = require('express-validator');

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

    function (req, res, next) {
        const errors = validationResult(req);
        const {name, abbreviation, description, imageUrl} = req.body;
        const categoryData = {name, description};
        if (imageUrl.length > 0) categoryData.imageUrl = imageUrl;
        if (abbreviation.length > 0) categoryData.abbreviation = abbreviation;
        
        const category = new Category(categoryData);

        if (!errors.isEmpty()) {
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