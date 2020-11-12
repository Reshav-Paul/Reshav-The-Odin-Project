require('dotenv').config();
const express = require('express');
const request = require('supertest');

const dbHandler = require('./mongoTestConfig');
const indexRouter = require('../routes/index');
var apiRouter = require('../routes/api');
const errorHelper = require('../helpers/errorCodes');
const testHelpers = require('../helpers/testHelpers');

const app = express();

require('../auth/auth');
app.use(express.json());

app.use('/', indexRouter);
app.use('/api', apiRouter);

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    for (const key in err) {
        console.log(key, ': ', err[key]);
    }
    res.end();
});

beforeAll(async function() {
    await dbHandler.connect();
});

afterAll(async function() {
    await dbHandler.closeDatabase();
});

let userId = '';
let userAuthToken = '';
let userAuthToken2 = '';
let editorId = '';
let editorAuthToken = '';

const user = {
    email: 'foo@gmail.com',
    password: 'foo99',
    firstName: 'Foo'
};

const user2 = {
    email: 'baz@gmail.com',
    password: 'baz99',
    firstName: 'Baz'
};

const editor = {
    email: 'bar@gmail.com',
    password: 'bar99',
    firstName: 'Bar',
    lastName: 'Bar',
    username: 'BarBar',
    admin: process.env.admin
};

const post = {
    title: 'abc',
    text: 'abc',
    isPublished: true
}

describe('setup', () => {
    test('create user 1', done => {
        request(app)
            .post('/api/users')
            .send(user)
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.email).toBe(user.email);
                user._id = res.body._id;
                done();
            });
    });
    test('user login', done => {
        request(app)
            .post('/api/users/login')
            .send({ email: user.email, password: user.password })
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.token).toBeDefined();
                userAuthToken = res.body.token;
                done();
            })
    });
    test('create user 2', done => {
        request(app)
            .post('/api/users')
            .send(user2)
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.email).toBe(user2.email);
                user2._id = res.body._id;
                done();
            });
    });
    test('user login', done => {
        request(app)
            .post('/api/users/login')
            .send({ email: user2.email, password: user2.password })
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.token).toBeDefined();
                userAuthToken2 = res.body.token;
                done();
            })
    });
    test('create editor', done => {
        request(app)
            .post('/api/editors')
            .send(editor)
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.email).toBe(editor.email);
                editor._id = res.body._id;
                post.editor = editor._id;
                done();
            });
    });
    test('editor login', done => {
        request(app)
            .post('/api/editors/login')
            .send({ email: editor.email, password: editor.password })
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.token).toBeDefined();
                editorAuthToken = res.body.token;
                done();
            })
    });
    test('create post', done => {
        request(app)
            .post('/api/posts')
            .set('Authorization', `Bearer ${editorAuthToken}`)
            .send(post)
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.text).toBe(post.text);
                post._id = res.body._id;
                done();
            });
    });
});

describe('comment creation', () => {
    test('user can create comment', done => {
        request(app)
            .post('/api/comments')
            .set('Authorization', `Bearer ${userAuthToken}`)
            .send({ text: 'good', user: user._id, post: post._id })
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                const data = res.body;
                expect(data.text).toBe('good');
                expect(data.user.toString()).toBe(user._id.toString());
                expect(data.post.toString()).toBe(post._id.toString());
                done();
            });
    });
    test('user cannot create comment for a different user', done => {
        request(app)
            .post('/api/comments')
            .set('Authorization', `Bearer ${userAuthToken2}`)
            .send({ text: 'good', user: user._id, post: post._id })
            .accept('Content-Type', /json/)
            .expect(401, done);            
    });
    test('editor cannot create comment for a different user', done => {
        request(app)
            .post('/api/comments')
            .set('Authorization', `Bearer ${editorAuthToken}`)
            .send({ text: 'good', user: user._id, post: post._id })
            .accept('Content-Type', /json/)
            .expect(401, done);            
    });
    test('user cannot create comment without jwt token', done => {
        request(app)
            .post('/api/comments')
            .send({ text: 'good', user: user._id, post: post._id })
            .accept('Content-Type', /json/)
            .expect(401, done);
    });
    test('user cannot create empty comment', done => {
        request(app)
            .post('/api/comments')
            .set('Authorization', `Bearer ${userAuthToken}`)
            .send({ text: '   ', user: user._id, post: post._id })
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                const data = res.body;
                expect(data.error.status).toBe('Validation_Error');
                expect(data.error.errors[0].msg).toBe(errorHelper.validationErrors.no_comment_text);
                done();
            });
    });
    test('user cannot create comment with post id of non existent post', done => {
        request(app)
            .post('/api/comments')
            .set('Authorization', `Bearer ${userAuthToken}`)
            .send({ text: 'good', user: user._id, post: testHelpers.generateMongoId(post._id) })
            .accept('Content-Type', /json/)
            .expect(404)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.error.toString()).toBe(errorHelper.post_not_found.toString());
                done();
            });
    });
    test('user cannot create comment with invalid post id', done => {
        request(app)
            .post('/api/comments')
            .set('Authorization', `Bearer ${userAuthToken}`)
            .send({ text: 'good', user: user._id, post: post._id.slice(0, -1) + 'z' })
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                const error = res.body.error;
                expect(error.status).toBe('Validation_Error');
                expect(error.errors[0].msg).toBe(errorHelper.mongoIdError.message);
                done();
            });
    });
    test('user cannot create comment with user id of non existent user', done => {
        request(app)
            .post('/api/comments')
            .set('Authorization', `Bearer ${userAuthToken}`)
            .send({ text: 'good', post: post._id, user: testHelpers.generateMongoId(user._id, 6) })
            .accept('Content-Type', /json/)
            .expect(401, done);
    });
    test('user cannot create comment with invalid user id', done => {
        request(app)
            .post('/api/comments')
            .set('Authorization', `Bearer ${userAuthToken}`)
            .send({ text: 'good', post: post._id, user: user._id.slice(0, -1) + 'z' })
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                const error = res.body.error;
                expect(error.status).toBe('Validation_Error');
                expect(error.errors[0].msg).toBe(errorHelper.mongoIdError.message);
                expect(error.errors[0].param).toBe('user');
                done();
            });
    });
    test('user cannot create comment with invalid date', done => {
        request(app)
            .post('/api/comments')
            .set('Authorization', `Bearer ${userAuthToken}`)
            .send({ text: 'good', post: post._id, user: user._id, dateCreated: 'Someday' })
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                const error = res.body.error;
                expect(error.status).toBe('Validation_Error');
                expect(error.errors[0].msg).toBe(errorHelper.validationErrors.date_wrong_format);
                done();
            });
    });

    test('user cannot create comment without post id', done => {
        request(app)
            .post('/api/comments')
            .set('Authorization', `Bearer ${userAuthToken}`)
            .send({ text: 'good', user: user._id })
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                const error = res.body.error;
                expect(error.status).toBe('Validation_Error');
                expect(error.errors[0].msg).toBe(errorHelper.mongoIdError.message);
                expect(error.errors[0].param).toBe('post');
                done();
            });
    });

    test('user cannot create comment without user id', done => {
        request(app)
            .post('/api/comments')
            .set('Authorization', `Bearer ${userAuthToken}`)
            .send({ text: 'good', post: post._id })
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                const error = res.body.error;
                expect(error.status).toBe('Validation_Error');
                expect(error.errors[0].msg).toBe(errorHelper.mongoIdError.message);
                expect(error.errors[0].param).toBe('user');
                done();
            });
    });
});