require('dotenv').config();
const express = require('express');
const request = require('supertest');

const indexRouter = require('../routes/index');
var apiRouter = require('../routes/api');

const app = express();
app.use('/', indexRouter);
app.use('/api', apiRouter);

describe('root routes work', () => {
    test('index route returns proper message', (done) => {
        request(app)
            .get('/')
            .expect('Content-Type', /json/)
            .expect({ message: 'Use /api endpoint for accessing the api' })
            .expect(200, done);
    });

    test('/api route returns proper message', (done) => {
        request(app)
            .get('/api')
            .expect('Content-Type', /json/)
            .expect({ message: 'Default API response' })
            .expect(200, done);
    });
});