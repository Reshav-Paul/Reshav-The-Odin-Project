const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var async = require('async');

let BookInstance = require('../models/bookinstance');
var Book = require('../models/book');

exports.bookinstance_list = function (req, res, next) {
    BookInstance.find()
        .populate('book')
        .exec(function (err, list_book_instance) {
            if (err) { return next(err); }
            res.render('book_instance_list', { title: 'Book Instance List', book_instance_list: list_book_instance });
        });
};
exports.bookinstance_detail = function (req, res, next) {
    BookInstance.findById(req.params.id)
        .populate('book')
        .exec(function (err, bookinstance) {
            if (err) return next(err);
            if (bookinstance == null) {
                var err = new Error('Book copy not found');
                err.status = 404;
                return next(err);
            }
            res.render('bookinstance_detail', { title: 'Copy: ' + bookinstance.book.title, bookinstance: bookinstance });
        });
};
exports.bookinstance_create_get = function (req, res, next) {
    Book.find({}, 'title')
        .exec(function (err, books) {
            if (err) return next(err);
            res.render('bookinstance_form', { title: 'Create BookInstance', book_list: books });
        });
};
exports.bookinstance_create_post = [

    body('book', 'Book must be specified').trim().isLength({ min: 1 }),
    body('imprint', 'Imprint must be specified').trim().isLength({ min: 1 }),
    body('due_back', 'Invalid date').optional({ checkFalsy: true }).isISO8601(),

    sanitizeBody('book').escape(),
    sanitizeBody('imprint').escape(),
    sanitizeBody('status').trim().escape(),
    sanitizeBody('due_back').toDate(),

    (req, res, next) => {
        const errors = validationResult(req);

        let bookinstance = new BookInstance(
            {
                book: req.body.book,
                imprint: req.body.imprint,
                status: req.body.status,
                due_back: req.body.due_back
            }
        );

        if (!errors.isEmpty()) {
            Book.find({}, 'title')
                .exec(function (err, books) {
                    if (err) return next(err);
                    res.render('bookinstance_form', { title: 'Create BookInstance', book_list: books, selected_book: bookinstance.book._id, errors: errors.array(), bookinstance: bookinstance });
                });
            return;
        } else {
            bookinstance.save(function (err) {
                if (err) return next(err);
                res.redirect(bookinstance.url);
            });
        }
    }
];
exports.bookinstance_delete_get = function (req, res, next) {
    BookInstance.findById(req.params.id).exec(function (err, bookinstance) {
        if (bookinstance === undefined || bookinstance === null) {
            res.redirect('/catalog/bookinstances');
        }
        if (err) return next(err);
        res.render('bookinstance_delete', { title: 'Delete Book Copy', bookinstance: bookinstance });
    });
};
exports.bookinstance_delete_post = function (req, res) {
    BookInstance.findByIdAndRemove(req.body.bookinstanceid, function deleteBookInstance(err) {
        if (err) return next(err);
        res.redirect('/catalog/book/' + req.body.bookid);
    })
};
exports.bookinstance_update_get = function (req, res, next) {
    async.parallel({
        bookinstance: function (callback) {
            BookInstance.findById(req.params.id).populate('book').exec(callback)
        },
        books: function (callback) {
            Book.find(callback)
        },

    }, function (err, results) {
        if (err) return next(err);
        if (results.bookinstance == null) {
            var err = new Error('Book copy not found');
            err.status = 404;
            return next(err);
        }
        res.render('bookinstance_form', { title: 'Update Book Copy', book_list: results.books, selected_book: results.bookinstance.book._id, bookinstance: results.bookinstance });
    });
};
exports.bookinstance_update_post = [
     body('book', 'Book must be specified').isLength({ min: 1 }).trim(),
     body('imprint', 'Imprint must be specified').isLength({ min: 1 }).trim(),
     body('due_back', 'Invalid date').optional({ checkFalsy: true }).isISO8601(),
     
     sanitizeBody('book').escape(),
     sanitizeBody('imprint').escape(),
     sanitizeBody('status').escape(),
     sanitizeBody('due_back').toDate(),
     
     (req, res, next) => {
         const errors = validationResult(req);
 
         var bookinstance = new BookInstance(
           { book: req.body.book,
             imprint: req.body.imprint,
             status: req.body.status,
             due_back: req.body.due_back,
             _id: req.params.id
            });
 
         if (!errors.isEmpty()) {
             Book.find({},'title')
                 .exec(function (err, books) {
                     if (err) return next(err);
                     res.render('bookinstance_form', { title: 'Update BookInstance', book_list : books, selected_book : bookinstance.book._id , errors: errors.array(), bookinstance:bookinstance });
             });
             return;
         }
         else {
             BookInstance.findByIdAndUpdate(req.params.id, bookinstance, {}, function (err,thebookinstance) {
                 if (err) return next(err);
                    res.redirect(thebookinstance.url);
                 });
         }
     }
];