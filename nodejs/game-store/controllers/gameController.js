let Game = require('../models/Game');
let Category = require('../models/Category');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');

module.exports.game_detail = function (req, res, next) {
    Game.findById(req.params.id).populate('category')
        .exec(function (err, results) {
            if (err) return next(err);
            res.render('game_detail', { game: results });
        });
};

module.exports.game_create_get = function (req, res, next) {
    Category.find().exec(function (err, results) {
        if (err) return next(err);
        res.render('game_create', { categories: results });
    });
};


module.exports.game_create_post = [
    (req, res, next) => {
        if (!(req.body.category instanceof Array)) {
            if (req.body.category == undefined) {
                req.body.category = [];
            } else {
                req.body.category = new Array(req.body.category);
            }
        }
        next();
    },
    body('name', 'Name must not be empty').trim().escape().isLength({ min: 1 }),
    body('description', 'Description must not be empty').trim().escape().isLength({ min: 1 }),
    body('releaseDate', 'Please provide a valid release date').optional({ checkFalsy: true }).isISO8601(),
    body('price', 'Please provide a valid price').trim().escape().optional({ checkFalsy: true }).isCurrency(),
    body('imageUrl', 'Please provide a valid image URL').optional({ checkFalsy: true }).isURL(),
    body('category', 'Please select atleast one category').isArray({ min: 1 }),
    body('category.*', 'We got an invalid category ID. Please select an available category.').isMongoId(),

    (req, res, next) => {
        const { name, description, releaseDate, category, price, imageUrl } = req.body;
        const gameData = { name, description, category };

        if (releaseDate.length > 0) gameData.releaseDate = releaseDate;
        if (price.length > 0) gameData.price = price;
        if (imageUrl.length > 0) gameData.imageUrl = imageUrl;

        let game = new Game(gameData);

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            game.save(function(err) {
                if (err) return next(err);
                res.redirect(game.url);
                return;
            });
        } else {
            Category.find().exec(function (err, results) {
                if (err) return next(err);

                if (game.category == undefined) game.category = [];
                for (let category of results) {
                    if (game.category.indexOf(category._id) > -1) {
                        category.checked = 'true';
                    }
                }
                if (imageUrl.length == 0) game.imageUrl = '';
                res.render('game_create', { categories: results, game: game, errors: errors });
            });
        }        
    }
];

module.exports.game_delete_get = function(req, res, next) {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.redirect('/');
        return;
    }
    Game.findById(req.params.id).exec(function(err, result) {
        if (err) return next(err);
        if (result == undefined) {
            res.redirect('/');
            return;
        }
        res.render('game_delete', {game: result});
    });
};

module.exports.game_delete_post = function(req, res, next) {
    Game.findById(req.params.id).exec(function(err, result) {
        if (err) return next(err);

        let redirectionUrl = '/';
        if (result.category.length > 0) {
            redirectionUrl = '/category/' + result.category[0];
        }

        Game.findByIdAndRemove(result._id, function(err) {
            if (err) return next(err);
            res.redirect(redirectionUrl);
        });
    });
};