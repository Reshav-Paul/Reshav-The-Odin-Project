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

let userIds = [];
let authToken0 = '';
let authToken1 = '';

beforeAll(async function() {
    await dbHandler.connect();
});

afterAll(async function() {
    await dbHandler.closeDatabase();
});


describe('User creation works', () => {
    test('user can be created when all data is available', done => {
        request(app)
            .post('/api/users')
            .send({
                email: 'foo@gmail.com',
                password: 'foo99',
                firstName: 'Foo',
                lastName: 'Bar'
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                const data = res.body;
                expect(data.email).toBe('foo@gmail.com');
                expect(data.firstName).toBe('Foo');
                expect(data.lastName).toBe('Bar');
                expect(data.password).toBeUndefined();
                userIds.push(data._id);
                done();
            });
    });
    test('user can be created when all data is available except lastName', done => {
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
            .end(function(err, res) {
                if (err) return done(err);
                const data = res.body;
                expect(data.email).toBe('baz@gmail.com');
                expect(data.firstName).toBe('Baz');
                expect(data.password).toBeUndefined();
                userIds.push(data._id);
                done();
            });
    });

    test('user can be created when all data is available except lastName', done => {
        request(app)
            .post('/api/users')
            .send({
                email: 'fred@gmail.com',
                password: 'fred99',
                firstName: 'Fred'
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                const data = res.body;
                expect(data.email).toBe('fred@gmail.com');
                expect(data.firstName).toBe('Fred');
                expect(data.password).toBeUndefined();
                userIds.push(data._id);
                done();
            });
    });

    test('user cannot be created with duplicate email', done => {
        request(app)
            .post('/api/users')
            .send({
                email: 'foo@gmail.com',
                password: 'barbar',
                firstName: 'BarBar',
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.error.message).toBe(errorHelper.duplicate_email.message);
                done();
            });
    });
});

describe('user login works', () => {
    test('user login works', (done) => {
        request(app)
            .post('/api/users/login')
            .send({
                email: 'foo@gmail.com',
                password: 'foo99'
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.token).toBeDefined();
                expect(res.body.email).toEqual('foo@gmail.com');
                expect(res.body.login).toBe(true);
                authToken0 = res.body.token;
                done();
            });
        request(app)
            .post('/api/users/login')
            .send({
                email: 'baz@gmail.com',
                password: 'baz99'
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.token).toBeDefined();
                expect(res.body.email).toEqual('baz@gmail.com');
                expect(res.body.login).toBe(true);
                authToken1 = res.body.token;
                done();
            });
    });
});

describe('user get endpoint works', () => {    
    
    test('returns list of users excluding their passwords', (done) => {
        request(app)            
            .get('/api/users')
            .set('Authorization', 'Bearer ' + authToken0)
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
                done();
            });
    });

    test('returns a single user by id', (done) => {
        request(app)
            .get('/api/users/' + userIds[0])
            .set('Authorization', 'Bearer ' + authToken0)
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
            .set('Authorization', 'Bearer ' + authToken0)
            .expect('Content-Type', /json/)
            .expect(404)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.error.message).toBe(errorHelper.user_not_found.message);
                done();
            });
    });
    
    test('returns 400 if the id is malformed', (done) => {
        request(app)
            .get('/api/users/' + userIds[0].slice(0, -1) + 'z')
            .set('Authorization', 'Bearer ' + authToken0)
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.error.message).toBe(errorHelper.mongoIdParameterError.message);
                done();
            });
    });

    test('returns 400 if the id is of invalid length', done => {
        request(app)
            .get('/api/users/' + userIds[0].slice(0, -1))
            .set('Authorization', 'Bearer ' + authToken0)
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.error.message).toBe(errorHelper.mongoIdParameterError.message);
                done();
            });
    })
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
                expect(error.msg).toBe(errorHelper.validationErrors.no_password);
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
                expect(error.msg).toBe(errorHelper.validationErrors.invalid_email);
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
                expect(error.msg).toBe(errorHelper.validationErrors.no_first_name);
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
                expect(error.msg).toBe(errorHelper.validationErrors.numeric_first_name);
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
                expect(error.msg).toBe(errorHelper.validationErrors.numeric_last_name);
                done();
            });
    });
});

describe('User deletion works', () => {
    test('Cannot delete any user other than self', (done) => {
        request(app)
            .delete('/api/users/' + userIds[0])
            .set('Authorization', 'Bearer ' + authToken1)
            .expect('Content-Type', /json/)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.error.toString()).toBe(errorHelper.unauth_user.toString());
                done();
            });
    });
    test('Can delete a user present in the database', (done) => {
        request(app)
            .delete('/api/users/' + userIds[1])
            .set('Authorization', 'Bearer ' + authToken1)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                const data = res.body;
                expect(data._id.toString()).toEqual(userIds[1].toString());
                expect(data.email).toEqual('baz@gmail.com');
                expect(data.firstName).toEqual('Baz');
                done();
            });
    });
    test('Cannot delete a user twice', done => {
        request(app)
            .delete('/api/users/' + userIds[1])
            .set('Authorization', 'Bearer ' + authToken1)
            .expect(401, done)
    });
    test('Cannot delete with an invalid user id', done => {
        request(app)
            .delete('/api/users/' + userIds[0].slice(0, -1) + 'z')
            .set('Authorization', 'Bearer ' + authToken0)
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.error.message).toBe(errorHelper.mongoIdParameterError.message)
                done();
            });
    });
});

describe('User updation works', () => {
    test('cannot update any user but self', done => {
        request(app)
            .put('/api/users/' + userIds[2])
            .set('Authorization', 'Bearer ' + authToken0)
            .send({ 
                email: 'bazbuzzer@gmail.com',
                firstName: 'BazBuzzer', 
                lastName: 'Lightyear'
            })
            .set('Accept', 'application/json')
            .expect(401, done);
    });

    test('can update user email, firstName and lastName', done => {
        request(app)
            .put('/api/users/' + userIds[0])
            .set('Authorization', 'Bearer ' + authToken0)
            .send({ 
                email: 'bazbuzzer@gmail.com',
                firstName: 'BazBuzzer', 
                lastName: 'Lightyear'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                const data = res.body;
                expect(data.email).toBe('bazbuzzer@gmail.com');
                expect(data.firstName).toBe('BazBuzzer');
                expect(data.lastName).toBe('Lightyear');
                expect(data.password).toBeUndefined();
                done();
            });
    });

    test('cannot update email if it is already in use', done => {
        request(app)
            .put('/api/users/' + userIds[0])
            .set('Authorization', 'Bearer ' + authToken0)
            .send({ email: 'fred@gmail.com' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.error.message).toBe(errorHelper.duplicate_email.message);
                done();
            });
    });
});

describe('User data validation during updation works', () => {
    test('cannot update with empty email', done => {
        request(app)
            .put('/api/users/' + userIds[0])
            .set('Authorization', 'Bearer ' + authToken0)
            .send({ email: '   ' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.email).toBe('bazbuzzer@gmail.com');
                done();
            });
    });

    test('cannot update with invalid email', done => {
        request(app)
            .put('/api/users/' + userIds[0])
            .set('Authorization', 'Bearer ' + authToken0)
            .send({ email: '<img>baz@gmail.com' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);

                const error = res.body.error.errors[0];
                expect(error.msg).toBe(errorHelper.validationErrors.invalid_email);

                request(app)
                    .get('/api/users/' + userIds[0])
                    .set('Authorization', 'Bearer ' + authToken0)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);
                        expect(res.body.email).toBe('bazbuzzer@gmail.com');
                        done();
                    });
            });
    });
    
    test('cannot update with empty firstName', done => {
        request(app)
            .put('/api/users/' + userIds[0])
            .set('Authorization', 'Bearer ' + authToken0)
            .send({ firstName: '  ' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.firstName).toBe('BazBuzzer');
                done();
            });
    });

    test('cannot update with numeric first name', done => {
        request(app)
            .put('/api/users/' + userIds[0])
            .set('Authorization', 'Bearer ' + authToken0)
            .send({ firstName: '99' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                const error = res.body.error.errors[0];
                expect(error.msg).toBe(errorHelper.validationErrors.numeric_first_name);
                
                request(app)
                    .get('/api/users/' + userIds[0])
                    .set('Authorization', 'Bearer ' + authToken0)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);
                        expect(res.body.firstName).toBe('BazBuzzer');
                        done();
                    });
            });
    });

    test('cannot update with empty last name', done => {
        request(app)
            .put('/api/users/' + userIds[0])
            .set('Authorization', 'Bearer ' + authToken0)
            .send({ lastName: '  ' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.lastName).toBe('Lightyear');
                done();
            });
    });

    test('cannot update with numeric last name', done => {
        request(app)
            .put('/api/users/' + userIds[0])
            .set('Authorization', 'Bearer ' + authToken0)
            .send({ lastName: '99' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                const error = res.body.error.errors[0];
                expect(error.msg).toBe(errorHelper.validationErrors.numeric_last_name);
                
                request(app)
                    .get('/api/users/' + userIds[0])
                    .set('Authorization', 'Bearer ' + authToken0)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);
                        expect(res.body.lastName).toBe('Lightyear');
                        done();
                    });
            });
    });    
});
