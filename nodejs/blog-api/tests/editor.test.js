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
let authToken0 = '';
let authToken1 = '';

beforeAll(async function() {
    await dbHandler.connect();
});

afterAll(async function() {
    await dbHandler.closeDatabase();
});


describe('Editor creation works', () => {
    test('editor can be created when all data is available', done => {
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
            .end(function(err, res) {
                if (err) return done(err);
                const data = res.body;
                expect(data.email).toBe('foo@gmail.com');
                expect(data.username).toBe('FooBar');
                expect(data.firstName).toBe('Foo');
                expect(data.lastName).toBe('Bar');
                expect(data.password).toBeUndefined();
                editorIds.push(data._id);
                done();
            });
    });
    test('editor(2) can be created when all data is available', done => {
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
            .end(function(err, res) {
                if (err) return done(err);
                const data = res.body;
                expect(data.email).toBe('fred@gmail.com');
                expect(data.username).toBe('FredFerry');
                expect(data.firstName).toBe('Fred');
                expect(data.lastName).toBe('Ferry');
                expect(data.password).toBeUndefined();
                editorIds.push(data._id);
                done();
            });
    });
    test('editor(3) can be created when all data is available', done => {
        request(app)
            .post('/api/editors')
            .send({
                email: 'foo2@gmail.com',
                username: 'Foo2Bar',
                password: 'foo299',
                firstName: 'Foo2',
                lastName: 'Bar',
                admin: process.env.admin
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                const data = res.body;
                expect(data.email).toBe('foo2@gmail.com');
                expect(data.username).toBe('Foo2Bar');
                expect(data.firstName).toBe('Foo2');
                expect(data.lastName).toBe('Bar');
                expect(data.username).toBe('Foo2Bar');
                expect(data.password).toBeUndefined();
                editorIds.push(data._id);
                done();
            });
    });
    test('editor cannot be created with duplicate email', done => {
        request(app)
            .post('/api/editors')
            .send({
                email: 'foo@gmail.com',
                username: 'Foo3Bar',
                password: 'foo399',
                firstName: 'Foo3',
                lastName: 'Bar',
                admin: process.env.admin
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.error).toEqual(errorHelper.duplicate_email);
                done();
            });
    });
    test('editor cannot be created without username', done => {
        request(app)
            .post('/api/editors')
            .send({
                email: 'baz@gmail.com',
                password: 'baz99',
                firstName: 'Baz',
                lastName: 'Buzzer',
                admin: process.env.admin
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.error.errors[0].msg).toBe(errorHelper.validationErrors.no_username);
                done();
            });
    });
    test('editor cannot be created without firstName', done => {
        request(app)
            .post('/api/editors')
            .send({
                email: 'baz@gmail.com',
                password: 'baz99',
                lastName: 'Buzzer',
                username: 'BazBuzzer',
                admin: process.env.admin
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.error.errors[0].msg).toBe(errorHelper.validationErrors.no_first_name);
                done();
            });
    });
    test('returns numeric first name error if first name is numeric', done => {
        request(app)
            .post('/api/editors')
            .send({
                email: 'baz@gmail.com',
                password: 'baz99',
                firstName: '99',
                lastname: 'Buzzer',
                username: '99Baz',
                admin: process.env.admin
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
    test('editor cannot be created without lastName', done => {
        request(app)
            .post('/api/editors')
            .send({
                email: 'baz@gmail.com',
                password: 'baz99',
                firstName: 'Baz',
                username: 'BazBuzzer',
                admin: process.env.admin
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.error.errors[0].msg).toBe(errorHelper.validationErrors.no_last_name);
                done();
            });
    });
    test('returns numeric last name error if last name is numeric', done => {
        request(app)
            .post('/api/editors')
            .send({
                email: 'baz@gmail.com',
                password: 'bazbaz',
                firstName: 'Baz',
                lastName: '99',
                username: 'Baz99',
                admin: process.env.admin
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
    test('editor cannot be created without email', done => {
        request(app)
            .post('/api/editors')
            .send({
                password: 'baz99',
                firstName: 'Baz',
                lastName: 'Buzzer',
                username: 'BazBuzzer',
                admin: process.env.admin
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.error.errors[0].msg).toBe(errorHelper.validationErrors.invalid_email);
                done();
            });
    });
    test('editor cannot be created without password', done => {
        request(app)
            .post('/api/editors')
            .send({
                email: 'baz@gmail.com',
                firstName: 'Baz',
                lastName: 'Buzzer',
                username: 'BazBuzzer',
                admin: process.env.admin
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.error.errors[0].msg).toBe(errorHelper.validationErrors.no_password);
                done();
            });
    });
    test('returns invalid password error for password of length less than 5', done => {
        request(app)
            .post('/api/editors')
            .send({
                email: 'baz@gmail.com',
                firstName: 'Baz',
                lastName: 'Buzzer',
                username: 'BazBuzzer',
                password: 'baz',
                admin: process.env.admin
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
    test('editor cannot be created with duplicate email', done => {
        request(app)
            .post('/api/editors')
            .send({
                email: 'foo@gmail.com',
                password: 'barbar',
                firstName: 'Baz',
                lastName: 'Buzzer',
                username: 'BazBuzzer',
                admin: process.env.admin
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

describe('editor login works', () => {
    test('editor login works', (done) => {
        request(app)
            .post('/api/editors/login')
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
    });
    test('editor(2) login works', (done) => {
        request(app)
            .post('/api/editors/login')
            .send({
                email: 'fred@gmail.com',
                password: 'fred99'
            })
            .set('Accept', 'application/json')
            .accept('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.token).toBeDefined();
                expect(res.body.email).toEqual('fred@gmail.com');
                expect(res.body.login).toBe(true);
                authToken1 = res.body.token;
                done();
            });
    });    
});

describe('editor get endpoint works', () => {        
    test('returns list of editors excluding their passwords', (done) => {
        request(app)            
            .get('/api/editors')
            .set('Authorization', 'Bearer ' + authToken0)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                const data = res.body;

                expect(data[0].email).toBe('foo@gmail.com');
                expect(data[0].firstName).toBe('Foo');
                expect(data[0].lastName).toBe('Bar');
                expect(data[0].username).toBe('FooBar');
                expect(data[0].password).toBeUndefined();

                expect(data[1].email).toBe('fred@gmail.com');
                expect(data[1].firstName).toBe('Fred');
                expect(data[1].lastName).toBe('Ferry');
                expect(data[1].username).toBe('FredFerry');
                expect(data[1].password).toBeUndefined();
                done();
            });
    });
    test('returns a single editor by id', (done) => {
        request(app)
            .get('/api/editors/' + editorIds[0])
            .set('Authorization', 'Bearer ' + authToken0)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                const data = res.body;

                expect(data.email).toBe('foo@gmail.com');
                expect(data.firstName).toBe('Foo');
                expect(data.lastName).toBe('Bar');
                expect(data.username).toBe('FooBar');
                expect(data.password).toBeUndefined();
                done();
            });
    });
    test('cannot get editor list without auth token', (done) => {
        request(app)            
            .get('/api/editors')
            .expect(401, done);
    });
    test('cannot get editor details without auth token', (done) => {
        request(app)            
            .get('/api/editors/' + editorIds[0])
            .expect(401, done);
    });
    test('returns 404 if the editor is not found', (done) => {
        request(app)
            .get('/api/editors/' + testHelpers.generateMongoId(editorIds[0]))
            .set('Authorization', 'Bearer ' + authToken0)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.error).toEqual(errorHelper.editor_not_found);
                done();
            });
    });
    test('returns error if the id is malformed', (done) => {
        request(app)
            .get('/api/editors/' + editorIds[0].slice(0, -1) + 'z')
            .set('Authorization', 'Bearer ' + authToken0)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.error.message).toBe(errorHelper.mongoIdParameterError.message);
                done();
            });
    });
    test('returns error if the id is of invalid length', done => {
        request(app)
            .get('/api/editors/' + editorIds[0].slice(0, -1))
            .set('Authorization', 'Bearer ' + authToken0)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.error.message).toBe(errorHelper.mongoIdParameterError.message);
                done();
            });
    })
});

describe('Editor deletion works', () => {
    test('Cannot delete any editor other than self', (done) => {
        request(app)
            .delete('/api/editors/' + editorIds[0])
            .set('Authorization', 'Bearer ' + authToken1)
            .expect('Content-Type', /json/)
            .expect(401)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.error.toString()).toBe(errorHelper.unauth_user.toString());
                done();
            });
    });
    test('Can delete a editor present in the database', (done) => {
        request(app)
            .delete('/api/editors/' + editorIds[1])
            .set('Authorization', 'Bearer ' + authToken1)
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                const data = res.body;
                expect(data._id.toString()).toEqual(editorIds[1].toString());
                expect(data.email).toEqual('fred@gmail.com');
                expect(data.firstName).toEqual('Fred');
                done();
            });
    });
    test('Cannot delete a editor twice', done => {
        request(app)
            .delete('/api/editors/' + editorIds[1])
            .set('Authorization', 'Bearer ' + authToken1)
            .expect(401, done)
    });
    test('Cannot delete with an invalid editor id', done => {
        request(app)
            .delete('/api/editors/' + editorIds[0].slice(0, -1) + 'z')
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

describe('Editor updation works', () => {
    test('cannot update any editor but self', done => {
        request(app)
            .put('/api/editors/' + editorIds[1])
            .set('Authorization', 'Bearer ' + authToken0)
            .send({ 
                email: 'fred2@gmail.com',
                firstName: 'Fred2', 
                lastName: 'Baz'
            })
            .set('Accept', 'application/json')
            .expect(401, done);
    });
    test('can update editor email, firstName and lastName', done => {
        request(app)
            .put('/api/editors/' + editorIds[0])
            .set('Authorization', 'Bearer ' + authToken0)
            .send({ 
                email: 'fooo@gmail.com',
                firstName: 'Fooo', 
                lastName: 'Barr',
                username: 'FoooBarr'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                const data = res.body;
                expect(data.email).toBe('fooo@gmail.com');
                expect(data.firstName).toBe('Fooo');
                expect(data.lastName).toBe('Barr');
                expect(data.username).toBe('FoooBarr');
                expect(data.password).toBeUndefined();
                done();
            });
    });
    test('cannot update email if it is already in use', done => {
        request(app)
            .put('/api/editors/' + editorIds[0])
            .set('Authorization', 'Bearer ' + authToken0)
            .send({ email: 'foo2@gmail.com' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.error).toEqual(errorHelper.duplicate_email);
                done();
            });
    });
});

describe('Editor data validation during updation works', () => {
    test('cannot update with empty email', done => {
        request(app)
            .put('/api/editors/' + editorIds[0])
            .set('Authorization', 'Bearer ' + authToken0)
            .send({ email: '   ' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.email).toBe('fooo@gmail.com');
                done();
            });
    });
    test('cannot update with invalid email', done => {
        request(app)
            .put('/api/editors/' + editorIds[0])
            .set('Authorization', 'Bearer ' + authToken0)
            .send({ email: '<img>foo@gmail.com' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);

                const error = res.body.error.errors[0];
                expect(error.msg).toBe(errorHelper.validationErrors.invalid_email);

                request(app)
                    .get('/api/editors/' + editorIds[0])
                    .set('Authorization', 'Bearer ' + authToken0)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);
                        expect(res.body.email).toBe('fooo@gmail.com');
                        done();
                    });
            });
    });
    test('cannot update with empty firstName', done => {
        request(app)
            .put('/api/editors/' + editorIds[0])
            .set('Authorization', 'Bearer ' + authToken0)
            .send({ firstName: '  ' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.firstName).toBe('Fooo');
                done();
            });
    });
    test('cannot update with numeric first name', done => {
        request(app)
            .put('/api/editors/' + editorIds[0])
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
                    .get('/api/editors/' + editorIds[0])
                    .set('Authorization', 'Bearer ' + authToken0)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);
                        expect(res.body.firstName).toBe('Fooo');
                        done();
                    });
            });
    });
    test('cannot update with empty last name', done => {
        request(app)
            .put('/api/editors/' + editorIds[0])
            .set('Authorization', 'Bearer ' + authToken0)
            .send({ lastName: '  ' })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.lastName).toBe('Barr');
                done();
            });
    });
    test('cannot update with numeric last name', done => {
        request(app)
            .put('/api/editors/' + editorIds[0])
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
                    .get('/api/editors/' + editorIds[0])
                    .set('Authorization', 'Bearer ' + authToken0)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);
                        expect(res.body.lastName).toBe('Barr');
                        done();
                    });
            });
    });    
});
