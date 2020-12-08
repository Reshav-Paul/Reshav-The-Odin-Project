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
let editorAuthToken = '';
let userAuthToken = '';

let post0 = { title: 'First Post', text: 'Hello World!' };

beforeAll(async function () {
    await dbHandler.connect();
});

afterAll(async function () {
    await dbHandler.closeDatabase();
});

describe('setup', () => {
    test('editor created', done => {
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
    
});

describe('login works if correct email and password is provided', () => {
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
                editorAuthToken = res.body.token;
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

describe('login returns error message if incorrect email is provided', () => {
    test('editor login', (done) => {
        request(app)
            .post('/api/editors/login')
            .send({
                email: 'foo1@gmail.com',
                password: 'foo99'
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.error).toEqual(errorHelper.login_user_not_found);
                done();
            });
    });
    test('user login works', done => {
        request(app)
            .post('/api/users/login')
            .send({
                email: 'baz1@gmail.com',
                password: 'baz99'
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.error).toEqual(errorHelper.login_user_not_found);
                done();
            });
    });
});

describe('login returns error message if incorrect password is provided', () => {
    test('editor login', (done) => {
        request(app)
            .post('/api/editors/login')
            .send({
                email: 'foo@gmail.com',
                password: 'foo991'
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.error).toEqual(errorHelper.login_wrong_password);
                done();
            });
    });
    test('user login works', done => {
        request(app)
            .post('/api/users/login')
            .send({
                email: 'baz@gmail.com',
                password: 'baz991'
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.error).toEqual(errorHelper.login_wrong_password);
                done();
            });
    });
});

describe('login returns error message if both email and passsword is incorrect', () => {
    test('editor login', (done) => {
        request(app)
            .post('/api/editors/login')
            .send({
                email: 'foo1@gmail.com',
                password: 'foo99'
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.error).toEqual(errorHelper.login_user_not_found);
                done();
            });
    });
    test('user login works', done => {
        request(app)
            .post('/api/users/login')
            .send({
                email: 'baz1@gmail.com',
                password: 'baz99'
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                expect(res.body.error).toEqual(errorHelper.login_user_not_found);
                done();
            });
    });
});
