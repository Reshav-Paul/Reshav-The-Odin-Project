const {capitalize, reverse} = require('./string-functions');

describe('capitalize() tests', () => {
    it ('"CAPS" works', () => {
        expect(capitalize('CAPS')).toBe('CAPS');
    })
    
    it ('"small" works', () => {
        expect(capitalize('small')).toBe('SMALL');
    })
    
    it ('"MiXeD" works', () => {
        expect(capitalize('MiXeD')).toBe('MIXED');
    })
    
    it ('"CAPS WITH SPACES"', () => {
        expect(capitalize('CAPS WITH SPACES')).toBe('CAPS WITH SPACES');
    })
    
    it ('"small with spaces"', () => {
        expect(capitalize('small with spaces')).toBe('SMALL WITH SPACES');
    })
    
    it ('"MiXeD wItH SpAces"', () => {
        expect(capitalize('MiXeD wItH SpAces')).toBe('MIXED WITH SPACES');
    })
    
    it ('With-Punctuation', () => {
        expect(capitalize('With-Punctuation')).toBe('WITH-PUNCTUATION');
    })
    
    it ('empty string returns empty string', () => {
        expect(capitalize('')).toBe('');
    })
    
    it ('undefined returns undefined', () => {
        expect(capitalize(undefined)).toEqual(undefined);
    })
    
    it ('non string type throws error', () => {
        expect(() => capitalize(123)).toThrow('non-string type error');
    })
});

describe('reverse() tests', () => {
    it ('empty string works', () => {
        expect(reverse('')).toBe('');
    })
    it ('unit length string works', () => {
        expect(reverse('a')).toBe('a');
    })
    it ('string works', () => {
        expect(reverse('dragon')).toBe('nogard');
    })
    it ('string with spaces', () => {
        expect(reverse('to be or not to be')).toBe('eb ot ton ro eb ot');
    })
    it ('string with spaces and punctuation', () => {
        expect(reverse('to be or not to be, that is the question.')).toBe('.noitseuq eht si taht ,eb ot ton ro eb ot');
    })
    it ('string with new lines', () => {
        expect(reverse('to be \n or not to be')).toBe('eb ot ton ro \n eb ot');
    })
    it ('undefined returns undefined', () => {
        expect(reverse(undefined)).toBe(undefined);
    })
    it ('non string type throws error', () => {
        expect(() => reverse(123)).toThrow('non-string type error');
    })
});