let async = require('async');
let Category = require('../models/Category');
let Game = require('../models/Game');

module.exports.index = function(req, res) {
    res.redirect('/home/categories');
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