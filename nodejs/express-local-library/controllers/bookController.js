let Book = require('../models/book');
let Author = require('../models/author');
let Genre = require('../models/genre');
let BookInstance = require('../models/bookinstance');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
let async = require('async');
const book = require('../models/book');

exports.index = function (req, res) {
    async.parallel({
        book_count: function (callback) {
            Book.countDocuments({}, callback);
        },
        book_instance_count: function (callback) {
            BookInstance.countDocuments({}, callback);
        },
        book_instance_available_count: function (callback) {
            BookInstance.countDocuments({ status: 'Available' }, callback);
        },
        author_count: function (callback) {
            Author.countDocuments({}, callback);
        },
        genre_count: function (callback) {
            Genre.countDocuments({}, callback);
        }
    }, function (err, results) {
        res.render('index', { title: 'Local Library Home', error: err, data: results });
    });
};
exports.book_list = function (req, res, next) {
    Book.find({}, 'title author')
        .populate('author')
        .exec(function (err, list_books) {
            if (err) { return next(err); }
            res.render('book_list', { title: 'Book List', book_list: list_books });
        });
};
exports.book_detail = function (req, res, next) {
    let id = req.params.id;
    async.parallel({
        book: function (callback) {
            Book.findById(id)
                .populate('author')
                .populate('genre')
                .exec(callback);
        },
        book_instance: function (callback) {
            BookInstance.find({ 'book': id }).exec(callback);
        }
    }, function (err, results) {
        if (err) return next(err);
        if (results.book == null) {
            let err = new Error('Book not found');
            err.status = 404;
            return next(err);
        }
        res.render('book_detail',
            {
                title: results.book.title,
                book: results.book,
                book_instances: results.book_instance
            }
        );
    });
};
exports.book_create_get = function (req, res, next) {
    async.parallel({
        authors: function (callback) {
            Author.find(callback);
        },
        genres: function (callback) {
            Genre.find(callback);
        }
    }, function (err, results) {
        if (err) return next(err);
        res.render('book_form', { title: 'Create Book', authors: results.authors, genres: results.genres });
    });
};
exports.book_create_post = [
    (req, res, next) => {
        if (!(req.body.genre instanceof Array)) {
            if (typeof req.body.genre === 'undefined')
                req.body.genre = [];
            else
                req.body.genre = new Array(req.body.genre);
        }
        next();
    },
    body('title', 'Title must not be empty.').trim().isLength({ min: 1 }),
    body('author', 'Author must not be empty.').trim().isLength({ min: 1 }),
    body('summary', 'Summary must not be empty.').trim().isLength({ min: 1 }),
    body('isbn', 'ISBN must not be empty').trim().isLength({ min: 1 }),

    sanitizeBody('*').escape(),
    sanitizeBody('genre.*').escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        var book = new Book(
            {
                title: req.body.title,
                author: req.body.author,
                summary: req.body.summary,
                isbn: req.body.isbn,
                genre: req.body.genre
            }
        );

        if (!errors.isEmpty()) {
            async.parallel({
                authors: function (callback) {
                    Author.find(callback);
                },
                genres: function (callback) {
                    Genre.find(callback);
                },
            }, function (err, results) {
                if (err) return next(err);

                for (let i = 0; i < results.genres.length; i++) {
                    if (book.genres.indexOf(results.genres[i]._id) > -1) {
                        results.genres[i].checked = 'true';
                    }
                }
                res.render('book_form', {
                    title: 'Create Book',
                    authors: results.authors,
                    genres: results.genres,
                    book: book,
                    errors: errors.array()
                });
            });
            return;
        } else {
            book.save(function (err) {
                if (err) return next(err);
                res.redirect(book.url);
            });
        }
    }
];
exports.book_delete_get = function (req, res, next) {
    async.parallel({
        book: function (callback) {
            Book.findById(req.params.id).exec(callback);
        },
        book_bookinstances: function (callback) {
            BookInstance.find({ 'book': req.params.id }).exec(callback);
        }
    }, function (err, results) {
        if (err) return next(err);
        if (results.book === null || results.book === undefined) {
            console.log(results.book);
            res.redirect('/catalog/books');
        }
        res.render('book_delete', { title: 'Delete Book', book: results.book, book_instances: results.book_bookinstances });
    });
};
exports.book_delete_post = function (req, res, next) {
    async.parallel({
        book: function (callback) {
            Book.findById(req.body.bookid).exec(callback);
        },
        book_bookinstances: function (callback) {
            BookInstance.find({'book': req.body.bookid}).exec(callback);
        }
    }, function (err, results) {
        if (err) return next(err);

        if (results.book_bookinstances.length > 0) {
            res.render('book_delete', { title: 'Delete Book', book: results.book, book_instances: results.book_bookinstances });
            return;
        } else {
            Book.findByIdAndRemove(req.body.bookid, function deleteBook(err) {
                if (err) return next(err);
                res.redirect('/catalog/books');
            });
        }
    });
};
exports.book_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Book update GET');
};
exports.book_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Book update POST');
};