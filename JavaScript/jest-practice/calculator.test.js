const {add, subtract, multiply, divide} = require('./calculator.js')

//tests for add
describe('add tests', () => {

    it('add returns 0 for 0 arguments', () => {
        expect(add()).toBe(0);
    })
    it('add works for 1 number', () => {
        expect(add(2)).toBe(2);
        expect(add(undefined, 2)).toBe(2);
    })
    it('add works for 2 numbers', () => {
        expect(add(2, 3)).toBe(5);
        expect(add(4.81, 7.54)).toBe(12.35);
    })
    it('add works for multiple numbers', () => {
        expect(add(1, 2, 3, 4, 5)).toBe(15);
        expect(add(4.81, 7.54, 8.17, 9.89)).toBe(30.41);
    })
    it('add works when any single arg beyond 2nd arg is undefined', () => {
        expect(add(1, 2, undefined)).toBe(3);
        expect(add(1, 2, 3, undefined)).toBe(6);
        expect(add(1, 2, undefined, 3)).toBe(6);
    })
    it('add works when multiple args beyond 2nd arg are undefined', () => {
        expect(add(1, 2, undefined, 3, undefined)).toBe(6);
        expect(add(1, 2, 3, undefined, 4, undefined)).toBe(10);
        expect(add(1, 2, 3, undefined, undefined, 4)).toBe(10);
        expect(add(1, 2, 3, 4, undefined, undefined)).toBe(10);
    })
    it('add works when 1st or 2nd arg is undefined but has more than 2 args', () => {
        expect(add(1, undefined, 4, undefined)).toBe(5);
        expect(add(undefined, 1, 4, undefined)).toBe(5);
    })
})

//tests for subtract
describe('subtract tests', () => {
    it('subtract throws error for 0 arguments', () => {
        expect(subtract()).toBe(0);
    })
    it('subtract works for 1 number', () => {
        expect(subtract(2)).toBe(2);
        expect(subtract(undefined, 2)).toBe(-2);
    })
    it('subtract works for 2 numbers', () => {
        expect(subtract(3, 1)).toBe(2);
        expect(subtract(7.38, 3.56)).toBe(3.82);
    })
    it('subtract throws error for multiple numbers', () => {
        expect(() => subtract(3, 1, 4)).toThrow('too many arguments');
    })
    it('subtract works with second arg as a negative number', () => {
        expect(subtract(3, -1)).toBe(4);
    })
    it('subtract throws error for non number args', () => {
        expect(() => subtract('string', 1)).toThrow('non-number type error');
    })
})

//tests for multiply
describe('multiply tests', () => {

    it('multiply throws error for 0 arguments', () => {
        expect(() => multiply()).toThrow('no arguments specified');
    })
    it('multiply works for 1 number', () =>{
        expect(multiply(3)).toBe(3);
        expect(multiply(undefined, 3)).toBe(3);
    })
    it('multiply works for 2 numbers', () =>{
        expect(multiply(3, 2)).toBe(6);
        expect(multiply(4.197, 17.367)).toBeCloseTo(72.889299);
    })
    it('multiply works for multiple numbers', () =>{
        expect(multiply(1, 2, 3, 4)).toBe(24);
        expect(multiply(4.197, 17.367, 1.45, 3.22)).toBeCloseTo(340.320137);
    })
    it('multiply returns NaN for any args beyond 2nd arg undefined', () =>{
        expect(multiply(3, 2, undefined)).toBe(NaN);
        expect(multiply(3, 2, 4, undefined)).toBe(NaN);
        expect(multiply(3, 2, undefined, 4, undefined)).toBe(NaN);
        expect(multiply(3, 2, undefined, undefined)).toBe(NaN);
    })
    it('multiply throws error for non number args', () => {
        expect(() => multiply(1, 'number')).toThrow('non-number type error');
        expect(() => multiply('number', 1)).toThrow('non-number type error');

        expect(() => multiply(1, 2, 'number')).toThrow('non-number type error');
        expect(() => multiply(1, 2, 'number')).toThrow('non-number type error');

        expect(() => multiply(1, 'number', 3)).toThrow('non-number type error');
        expect(() => multiply('number', 1, 3)).toThrow('non-number type error');
        expect(() => multiply(1, 2, 'number', 3)).toThrow('non-number type error');
    })
})

//tests for divide
describe('divide tests', () => {
    it('divide throws error for 0 arguments', () => {
        expect(() => divide()).toThrow('no arguments specified');
    })
    it('divide throws error for 1 argument', () => {
        expect(() => divide(1)).toThrow('too few arguments');
        expect(() => divide(undefined, 1)).toThrow('too few arguments');
    })
    it('divide works for 2 number', () => {
        expect(divide(4, 2)).toBe(2);
        expect(divide(0, 2)).toBe(0);
        expect(divide(3, 2)).toBe(1.5);
        expect(divide(11, 3)).toBeCloseTo(3.666666);
    })
    it('divide throws zero division error', () => {
        expect(() => divide(1, 0)).toThrow('zero division error');
    })
    it('divide throws error argcount > 2', () => {
        expect(() => divide(12, 3, 4)).toThrow('too many arguments');
        expect(() => divide(undefined, 3, 4)).toThrow('too many arguments');
        expect(() => divide(12, undefined, 4)).toThrow('too many arguments');
        expect(() => divide(12, 3, undefined, 4)).toThrow('too many arguments');
        expect(() => divide(12, 3, undefined, undefined)).toThrow('too many arguments');
        expect(() => divide(12, 3, 1, undefined, 4)).toThrow('too many arguments');
    })
    it('divide throws error for non number args', () => {
        expect(() => divide(1, 'number')).toThrow('non-number type error');
        expect(() => divide('number', 1)).toThrow('non-number type error');

        expect(() => divide(1, 2, 'number')).toThrow('too many arguments');
        expect(() => divide(1, 2, 'number')).toThrow('too many arguments');

        expect(() => divide(1, 'number', 3)).toThrow('too many arguments');
        expect(() => divide('number', 1, 3)).toThrow('too many arguments');
        expect(() => divide(1, 2, 'number', 3)).toThrow('too many arguments');
    })
})

