const testHelpers = require('../helpers/testHelpers');

describe('test helper works', () => {
    test('mongo id generator works', done => {
        expect(testHelpers.generateMongoId('5f87dae4f264091dcc5e1aff')).toBe('5f87dae4f264091dcc5e1af2');
        expect(testHelpers.generateMongoId('5f87dae4f264091dcc5e1aff', 5)).toBe('5f87dae4f264091dcc5e1af4');
        expect(testHelpers.generateMongoId('5f87dae4f264091dcc5e1aff', 22)).toBe('5f87dae4f264091dcc5e1af5');
        expect(testHelpers.generateMongoId('5f87dae4f264091dcc5e1af7')).toBe('5f87dae4f264091dcc5e1afa');
        expect(testHelpers.generateMongoId('5f87dae4f264091dcc5e1af7', 5)).toBe('5f87dae4f264091dcc5e1afc');
        expect(testHelpers.generateMongoId('5f87dae4f264091dcc5e1af8')).toBe('5f87dae4f264091dcc5e1afb');
        expect(testHelpers.generateMongoId('5f87dae4f264091dcc5e1af9')).toBe('5f87dae4f264091dcc5e1afc');
        done();
    });
})