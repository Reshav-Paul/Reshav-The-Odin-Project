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
            });

        request(app)
            .get('/api/users/' + userIds[0].slice(0, -1))
            .expect('Content-Type', /json/)
            .expect(400)
            .end(function(err, res) {
                if (err) return done(err);
                expect(res.body.error.toString()).toBe(errorHelper.mongoIdError.toString());
            });
            
        done();
    });
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
                console.log(res.body);
                expect(res.body.email).toBe('bar@gmail.com');
                expect(res.body.password).toBeUndefined();
                done();
            })
            
    })
});