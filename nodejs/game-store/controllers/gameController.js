let Game = require('../models/Game');
let Category = require('../models/Category');

module.exports.game_detail = function(req, res, next) {
    Game.findById(req.params.id).populate('category')
    .exec(function(err, results) {
        if (err) return next(err);
        res.render('game_detail', {game: results});
    });
};

module.exports.game_create_get = function(req, res, next) {
    Category.find().exec(function(err, results) {
        if (err) return next(err);
        res.render('game_create', {categories: results});
    });
};