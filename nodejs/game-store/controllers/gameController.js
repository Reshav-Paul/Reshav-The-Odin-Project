let Game = require('../models/Game');

module.exports.game_detail = function(req, res, next) {
    Game.findById(req.params.id).populate('category')
    .exec(function(err, results) {
        if (err) return next(err);
        res.render('game_detail', {game: results});
    });
};