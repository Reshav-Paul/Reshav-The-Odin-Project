var async = require('async');
const validator = require('express-validator');

var Genre = require('../models/genre');
var Book = require('../models/book');

exports.genre_list = function (req, res, next) {
    Genre
        .find({})
        .exec(function (err, list_genres) {
            if (err) return next(err);
            res.render('genre_list', { title: 'Genre List', genre_list: list_genres });
        });
};
exports.genre_detail = function (req, res, next) {
    let id = req.params.id;
    async.parallel({
        genre: function (callback) {
            Genre.findById(id).exec(callback);
        },
        genre_books: function (callback) {
            Book.find({ 'genre': id }).exec(callback);
        }
    },
        function (err, results) {
            if (err) return next(err);            
            if (results.genre == null) {
                let err = new Error('Genre not found');
                err.status = 404;
                return next(err);
            }            
            res.render('genre_detail', { title: 'Genre Detail', genre: results.genre, genre_books: results.genre_books });
        });
};
exports.genre_create_get = function (req, res, next) {
    res.render('genre_form', {title: 'Create Genre'});
};
exports.genre_create_post = [
    validator.body('name', 'Genre name required').trim().isLength({min: 1}),
    validator.sanitizeBody('name').escape(),
    (req, res, next) => {
        const errors = validator.validationResult(req);
        let genre = new Genre({name: req.body.name});
        if (!errors.isEmpty()) {
            console.log(errors.array());
            res.render('genre_form', {title: 'Create Genre', genre: genre, errors: errors.array()});
            return;
        } else {
            Genre.findOne({'name': req.body.name})
                .exec(function(err, found_genre) {
                    if (err) return next(err);

                    if (found_genre) {
                        res.redirect(found_genre.url);
                    } else {
                        genre.save(function(err) {
                            if (err) return next(err);
                            res.redirect(genre.url);
                        });
                    }
                });
        }
    }
];
exports.genre_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};
exports.genre_delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};
exports.genre_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};
exports.genre_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};