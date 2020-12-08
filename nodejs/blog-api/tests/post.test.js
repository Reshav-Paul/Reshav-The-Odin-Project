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

let editorIds = [];
let userIds = [];
let authToken0 = '';
let authToken1 = '';
let userAuthToken = '';

let post0 = { title: 'First Post', text: 'Hello World!' };
let post1 = {
    title: 'Second Post',
    text: 'Hello Again!',
    isPublished: true,
    datePublished: '2020-08-06'
};

beforeAll(async function () {
    await dbHandler.connect();
});

afterAll(async function () {
    await dbHandler.closeDatabase();
});

describe('setup', () => {
    test('editor(1) created', done => {
        request(app)
            .post('/api/editors')
            .send({
                email: 'foo@gmail.com',
                username: 'FooBar',
                password: 'foo99',
                firstName: 'Foo',
                lastName: 'Bar',
                admin: process.env.admin
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                const data = res.body;
                expect(data.email).toBe('foo@gmail.com');
                expect(data.username).toBe('FooBar');
                expect(data.firstName).toBe('Foo');
                expect(data.lastName).toBe('Bar');
                expect(data.password).toBeUndefined();
                editorIds.push(data._id);
                post0.editor = data._id;
                done();
            });
    });
    test('editor(2) created', done => {
        request(app)
            .post('/api/editors')
            .send({
                email: 'fred@gmail.com',
                username: 'FredFerry',
                password: 'fred99',
                firstName: 'Fred',
                lastName: 'Ferry',
                admin: process.env.admin
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                const data = res.body;
                expect(data.email).toBe('fred@gmail.com');
                expect(data.username).toBe('FredFerry');
                expect(data.firstName).toBe('Fred');
                expect(data.lastName).toBe('Ferry');
                expect(data.password).toBeUndefined();
                editorIds.push(data._id);
                post1.editor = data._id;
                done();
            });
    });
    test('editor login', (done) => {
        request(app)
            .post('/api/editors/login')
            .send({
                email: 'foo@gmail.com',
                password: 'foo99'
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.token).toBeDefined();
                expect(res.body.email).toEqual('foo@gmail.com');
                expect(res.body.login).toBe(true);
                authToken0 = res.body.token;
                // console.log(authToken0);
                // console.log(post0);
                done();
            });
    });
    test('editor(2) login', (done) => {
        request(app)
            .post('/api/editors/login')
            .send({
                email: 'fred@gmail.com',
                password: 'fred99'
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.token).toBeDefined();
                expect(res.body.email).toEqual('fred@gmail.com');
                expect(res.body.login).toBe(true);
                authToken1 = res.body.token;
                done();
            });
    });
    test('user created', done => {
        request(app)
            .post('/api/users')
            .send({
                email: 'baz@gmail.com',
                password: 'baz99',
                firstName: 'Baz'
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                const data = res.body;
                expect(data.email).toBe('baz@gmail.com');
                expect(data.firstName).toBe('Baz');
                expect(data.password).toBeUndefined();
                userIds.push(data._id);
                done();
            });
    });
    test('user login works', done => {
        request(app)
            .post('/api/users/login')
            .send({
                email: 'baz@gmail.com',
                password: 'baz99'
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.token).toBeDefined();
                expect(res.body.email).toEqual('baz@gmail.com');
                expect(res.body.login).toBe(true);
                userAuthToken = res.body.token;
                done();
            });
    });
});

describe('post creation works', () => {
    test('editor can create own posts with authentication', done => {
        request(app)
            .post('/api/posts')
            .send(post0)
            .set('Authorization', 'Bearer ' + authToken0)
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                const data = res.body;
                expect(data.title).toBe(post0.title);
                expect(data.text).toBe(post0.text);
                expect(data.datePublished).toBeUndefined();
                expect(data.isPublished).toBe(false);
                expect(data.editor).toBe(post0.editor);
                post0 = data;
                done();
            });
    });
    test('editor can create published posts with date', done => {
        request(app)
            .post('/api/posts')
            .send(post1)
            .set('Authorization', 'Bearer ' + authToken1)
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                const data = res.body;
                expect(data.title).toBe(post1.title);
                expect(data.text).toBe(post1.text);
                expect(data.datePublished.toString()).toMatch(/2020-08-06/);
                expect(data.isPublished).toBe(true);
                expect(data.editor).toBe(post1.editor);
                post1 = data;
                done();
            });
    });
    test('editor cannot create posts without authentication', done => {
        request(app)
            .post('/api/posts')
            .send(post0)
            .accept('Content-Type', /json/)
            .expect(401, done);
    });
    test('editor cannot create posts for other editors', done => {
        request(app)
            .post('/api/posts')
            .send({ title: post0.title, text: post0.text, editor: editorIds[1] })
            .set('Authorization', 'Bearer ' + authToken0)
            .accept('Content-Type', /json/)
            .expect(401, done);
    });
    test('editor cannot create post without editor id', done => {
        request(app)
            .post('/api/posts')
            .send({ title: post0.title, text: post0.text })
            .set('Authorization', 'Bearer ' + authToken0)
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.error.errors[0].msg).toBe(errorHelper.mongoIdError.message);
                done();
            });
    });
    test('user cannot create post', done => {
        request(app)
            .post('/api/posts')
            .send({ title: post0.title, text: post0.text, editor: userIds[0] })
            .set('Authorization', 'Bearer ' + userAuthToken)
            .accept('Content-Type', /json/)
            .expect(401, done);
    });
    test('editor cannot create posts without title', done => {
        const { title, ...post } = post0;
        request(app)
            .post('/api/posts')
            .send(post)
            .set('Authorization', 'Bearer ' + authToken0)
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.error.errors[0].msg).toBe(errorHelper.validationErrors.no_title);
                done();
            });
    });
    test('editor cannot create posts without text', done => {
        const { text, ...post } = post0;
        request(app)
            .post('/api/posts')
            .send(post)
            .set('Authorization', 'Bearer ' + authToken0)
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.error.errors[0].msg).toBe(errorHelper.validationErrors.no_body_text);
                done();
            });
    });
    test('editor cannot create posts with non-boolean isPublished flag', done => {
        const post = {...post0};
        post.isPublished = 'yes';
        request(app)
            .post('/api/posts')
            .send(post)
            .set('Authorization', 'Bearer ' + authToken0)
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.error.errors[0].msg).toBe(errorHelper.validationErrors.published_flag_wrong_format);
                done();
            });
    });
    test('editor cannot create posts with wrong date format', done => {
        const post = {...post0};
        post.isPublished = true;
        post.datePublished = '2020-Aug-06';
        request(app)
            .post('/api/posts')
            .send(post)
            .set('Authorization', 'Bearer ' + authToken0)
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.error.errors[0].msg).toBe(errorHelper.validationErrors.date_wrong_format);
                done();
            });
    });
    test('editor cannot create posts with wrong mongoId format', done => {
        let post = {...post0};
        post.isPublished = true;
        post.datePublished = '2020-Aug-06';
        post.editor = post.editor.slice(0, -1) + 'z';
        request(app)
            .post('/api/posts')
            .send(post)
            .set('Authorization', 'Bearer ' + authToken0)
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.error.errors[0].msg).toBe(errorHelper.mongoIdError.message);
                done();
            });
    });
});

describe('post read works', () => {
    test('can read all posts as authorized editor', done => {
        request(app)
            .get('/api/posts')
            .set('Authorization', `Bearer ${authToken0}`)
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.length).toBe(2);
                const fetchedPost0 = res.body[0];
                const fetchedPost1 = res.body[1];
                expect(fetchedPost0).toEqual(post0);
                expect(fetchedPost1).toEqual(post1);
                done();
            });
    });
    test('can read all published posts as authorized editor', done => {
        request(app)
            .get('/api/posts/published')
            .set('Authorization', `Bearer ${authToken0}`)
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.length).toBe(1);
                const post = res.body[0];
                expect(post).toEqual(post1);
                done();
            });
    });
    test('can read any post by id as authorized editor', done => {
        request(app)
            .get('/api/posts/' + post0._id)
            .set('Authorization', `Bearer ${authToken0}`)
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                const post = res.body;
                expect(post).toEqual(post0);
                done();
            });
    });
    test('can read all posts as authorized user', done => {
        request(app)
            .get('/api/posts')
            .set('Authorization', `Bearer ${userAuthToken}`)
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.length).toBe(2);
                const fetchedPost0 = res.body[0];
                const fetchedPost1 = res.body[1];
                expect(fetchedPost0).toEqual(post0);
                expect(fetchedPost1).toEqual(post1);
                done();
            });
    });
    test('can read all published posts as authorized user', done => {
        request(app)
            .get('/api/posts/published')
            .set('Authorization', `Bearer ${userAuthToken}`)
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.length).toBe(1);
                const post = res.body[0];
                expect(post).toEqual(post1);
                done();
            });
    });
    test('can read any post by id as authorized user', done => {
        request(app)
            .get('/api/posts/' + post0._id)
            .set('Authorization', `Bearer ${userAuthToken}`)
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                const post = res.body;
                expect(post).toEqual(post0);
                done();
            });
    });
    test('cannot read all posts as unauthorized user', done => {
        request(app)
            .get('/api/posts')
            .accept('Content-Type', /json/)
            .expect(401, done);
    });
    test('cannot read all published posts as unauthorized user', done => {
        request(app)
            .get('/api/posts/published')
            .accept('Content-Type', /json/)
            .expect(401, done);
    });
    test('cannot read any post by id as unauthorized user', done => {
        request(app)
            .get('/api/posts/' + post0._id)
            .accept('Content-Type', /json/)
            .expect(401, done);
    });
    test('cannot read any non-existent post as authorized user', done => {
        request(app)
            .get('/api/posts/' + testHelpers.generateMongoId(post0._id))
            .set('Authorization', `Bearer ${userAuthToken}`)
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.error).toEqual(errorHelper.post_not_found);
                done();
            });
    });
    test('cannot read any post with invalid id as authorized user', done => {
        request(app)
            .get('/api/posts/' + post0._id.slice(0, -1) + 'z')
            .set('Authorization', `Bearer ${userAuthToken}`)
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.error).toEqual(errorHelper.mongoIdParameterError);
                done();
            });
    });
});

