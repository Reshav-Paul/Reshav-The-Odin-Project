require('dotenv').config();
const express = require('express');
const request = require('supertest');

const dbHandler = require('./mongoTestConfig');
const indexRouter = require('../routes/index');
var apiRouter = require('../routes/api');
const User = require('../models/user');
const errorHelper = require('../helpers/errorCodes');
const testHelpers = require('../helpers/testHelpers');

const app = express();

app.use(express.json());

app.use('/', indexRouter);
app.use('/api', apiRouter);

app.use(function (err, req, res, next) {
    // set locals, only providing error in development

    res.status(err.status || 500);
    for (const key in err) {
        console.log(key, ': ', err[key]);
    }
    res.end();
});

let userIds = [];

beforeAll(async function() {
    let userFoo = new User({
        email: 'foo@gmail.com',
        password: 'foo',
        firstName: 'Foo',
        lastName: 'Bar'
    });

    let userBaz = new User({
        email: 'baz@gmail.com',
        password: 'baz',
        firstName: 'Baz'
    });

    let userFred = new User({
        email: 'fred@gmail.com',
        password: 'fred',
        firstName: 'Fred',
        lastName: 'Qux'
    });

    const usersData = [ userFoo, userBaz, userFred ];
    await dbHandler.connect();
    let users = await User.insertMany(usersData, { ordered: false });
    users.forEach(user => userIds.push(user._id.toString()));
});

afterAll(async function() {
    await dbHandler.closeDatabase();
});

describe('user get endpoint works', () => {
    test('returns list of users excluding their passwords', (done) => {
        request(app)
            .get('/api/users')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                const data = res.body;

                expect(data[0].email).toBe('foo@gmail.com');
                expect(data[0].firstName).toBe('Foo');
                expect(data[0].lastName).toBe('Bar');
                expect(data[0].password).toBeUndefined();

                expect(data[1].email).toBe('baz@gmail.com');
                expect(data[1].firstName).toBe('Baz');
                expect(data[1].lastName).toBeUndefined();
                expect(data[1].password).toBeUndefined();

                expect(data[2].email).toBe('fred@gmail.com');
                expect(data[2].firstName).toBe('Fred');
                expect(data[2].lastName).toBe('Qux');
                expect(data[2].password).toBeUndefined();
                done();
            });
    });

    test('returns a single user by id', (done) => {
        request(app)
            .get('/api/users/' + userIds[0])
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                const data = res.body;

                expect(data.email).toBe('foo@gmail.com');
                expect(data.firstName).toBe('Foo');
                expect(data.lastName).toBe('Bar');
                expect(data.password).toBeUndefined();
                done();
            });
    });

    test('returns 404 if the user is not found', (done) => {
        request(app)
            .get('/api/users/' + testHelpers.generateMongoId(userIds[0]))
            .expect('Content-Type', /json/)
            .expect(404)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.error.toString()).toBe(errorHelper.user_not_found.toString());
                done();
            });
    });
    
    test('returns 400 if the id is malformed', (done) => {
        request(app)
            .get('/api/users/' + userIds[0].slice(0, -1) + 'z')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.error.toString()).toBe(errorHelper.mongoIdError.toString());
                done();
            });
    });

    test('returns 400 if the id is of invalid length', done => {
        request(app)
            .get('/api/users/' + userIds[0].slice(0, -1))
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.error.toString()).toBe(errorHelper.mongoIdError.toString());
                done();
            });
    })
});

describe('User creation works', () => {
    test('user can be created when all data is available', done => {
        request(app)
            .post('/api/users')
            .send({
                email: 'bar@gmail.com',
                password: 'barbar',
                firstName: 'Bar',
                lastName: 'Baz'
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                const data = res.body;
                expect(data.email).toBe('bar@gmail.com');
                expect(data.firstName).toBe('Bar');
                expect(data.lastName).toBe('Baz');
                expect(data.password).toBeUndefined();
                userIds.push(data._id);
                done();
            });
    });
    test('user can be created when all data is available except lastName', done => {
        request(app)
            .post('/api/users')
            .send({
                email: 'bar2@gmail.com',
                password: 'barbar',
                firstName: 'Bar2',
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                const data = res.body;
                expect(data.email).toBe('bar2@gmail.com');
                expect(data.firstName).toBe('Bar2');
                expect(data.password).toBeUndefined();
                userIds.push(data._id);
                done();
            });
    });

    test('user cannot be created with duplicate email', done => {
        request(app)
            .post('/api/users')
            .send({
                email: 'bar2@gmail.com',
                password: 'barbar',
                firstName: 'BarBar',
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.error.toString()).toBe(errorHelper.duplicate_email.toString());
                done();
            });
    });
});

describe('User data validation during creation works', () => {
    test('returns invalid password error for no passwords provided', done => {
        request(app)
            .post('/api/users')
            .send({
                email: 'bar@gmail.com',
                firstName: 'Baz'
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                const error = res.body.error.errors[0];
                expect(error.msg.toString()).toBe(errorHelper.validationErrors.no_password);
                done();
            });
    });

    test('returns invalid password error for password of length less than 5', done => {
        request(app)
            .post('/api/users')
            .send({
                email: 'bar@gmail.com',
                firstName: 'Baz',
                password: 'baz'
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                const error = res.body.error.errors[0];
                expect(error.msg.toString()).toBe(errorHelper.validationErrors.no_password);
                done();
            });
    });

    test('returns invalid email error for invalid emails', done => {
        request(app)
            .post('/api/users')
            .send({
                password: 'bazbaz',
                firstName: 'Baz'
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                const error = res.body.error.errors[0];
                expect(error.msg.toString()).toBe(errorHelper.validationErrors.invalid_email);
                done();
            });
    });

    test('returns invalid email error for email not provided', done => {
        request(app)
            .post('/api/users')
            .send({
                email: '<img>bar@gmail.com',
                password: 'bazbaz',
                firstName: 'Baz'
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                const error = res.body.error.errors[0];
                expect(error.msg.toString()).toBe(errorHelper.validationErrors.invalid_email);
                done();
            });
    });

    test('returns no first name error if not provided', done => {
        request(app)
            .post('/api/users')
            .send({
                email: 'bar@gmail.com',
                password: 'bazbaz',
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                const error = res.body.error.errors[0];
                expect(error.msg.toString()).toBe(errorHelper.validationErrors.no_first_name);
                done();
            });
    });

    test('returns numeric first name error if first name is numeric', done => {
        request(app)
            .post('/api/users')
            .send({
                email: 'bar@gmail.com',
                password: 'bazbaz',
                firstName: '99'
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                const error = res.body.error.errors[0];
                expect(error.msg.toString()).toBe(errorHelper.validationErrors.numeric_first_name);
                done();
            });
    });

    test('returns numeric last name error if last name is numeric', done => {
        request(app)
            .post('/api/users')
            .send({
                email: 'bar@gmail.com',
                password: 'bazbaz',
                firstName: 'Baz',
                lastName: '99'
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                const error = res.body.error.errors[0];
                expect(error.msg.toString()).toBe(errorHelper.validationErrors.numeric_last_name);
                done();
            });
    });
});

describe('User deletion works', () => {
    test('Can delete a user present in the database', (done) => {
        request(app)
            .delete('/api/users/' + userIds[0])
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                request(app)
                    .get('/api/users/' + res.body._id)
                    .expect(404)
                    .end(function(err, res) {
                        if (err) return done(err);
                        expect(res.body.error.toString()).toBe(errorHelper.user_not_found.toString())
                        done();
                    });
            });
    });
    test('Cannot delete a user twice', done => {
        request(app)
            .delete('/api/users/' + userIds[0])
            .expect('Content-Type', /json/)
            .expect(404)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.error.toString()).toBe(errorHelper.user_not_found.toString())
                done();
            });
    });
    test('Cannot delete with an invalid user id', done => {
        request(app)
            .delete('/api/users/' + userIds[0].slice(0, -1) + 'z')
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.error.toString()).toBe(errorHelper.mongoIdError.toString())
                done();
            });
    });
});

describe('User updation works', () => {
    test('can update only user email', done => {
        request(app)
            .put('/api/users/' + userIds[1])
            .send({ email: 'bazbuzzer@gmail.com' })
            .set('Accept', 'application/json')
            // .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                console.log(res.body);
                expect(res.body.email).toBe('bazbuzzer@gmail.com');
                expect(res.body.password).toBeUndefined();
                done();
            })
    })
});