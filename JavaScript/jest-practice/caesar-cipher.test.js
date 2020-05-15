const {encrypt} = require('./caesar-cipher.js');

describe('caesar-cipher tests', () => {
    it('works with single alphabet character', () => {
        expect(encrypt('a', 5)).toBe('f')
        expect(encrypt('z', 10)).toBe('j')
        expect(encrypt('f', -3)).toBe('c')
        expect(encrypt('a', -4)).toBe('w')
    })
    it('works with multiple alphabet characters', () => {
        expect(encrypt('attack at dawn', 5)).toBe('fyyfhp fy ifbs')
        expect(encrypt('attack at dawn', 33)).toBe('haahjr ha khdu')
        expect(encrypt('attack at dawn', 65)).toBe('nggnpx ng qnja')

        expect(encrypt('fyyfhp fy ifbs', -5)).toBe('attack at dawn')
        expect(encrypt('haahjr ha khdu', -33)).toBe('attack at dawn')
        expect(encrypt('nggnpx ng qnja', -65)).toBe('attack at dawn')
    })

    it('works with punctuation', () => {
        expect(encrypt('why? why attack at all?', 18)).toBe('ozq? ozq sllsuc sl sdd?')
        expect(encrypt('this-is-kebab-case', 9)).toBe('cqrb-rb-tnkjk-ljbn')
        expect(encrypt('this-is-kebab-case', 89)).toBe('estd-td-vpmlm-nldp')
        expect(encrypt('@#%$^%&^&^*&', 23)).toBe('@#%$^%&^&^*&')

        expect(encrypt('cqrb-rb-tnkjk-ljbn', -9)).toBe('this-is-kebab-case')
        expect(encrypt('estd-td-vpmlm-nldp', -89)).toBe('this-is-kebab-case')
    })

    it('works with multiple case letters and punctuation', () => {
        expect(encrypt('thisIsSnakeCase', 23)).toBe('qefpFpPkxhbZxpb');
        expect(encrypt('thisIsSnakeCase', 67)).toBe('iwxhXhHcpztRpht');

        expect(encrypt('thisIsSnakeCase, JS recommends this for variable names', 11))
            .toBe('estdTdDylvpNldp, UD cpnzxxpyod estd qzc glctlmwp ylxpd');

        expect(encrypt('thisIsSnakeCase, JS recommends this for variable names', 98))
            .toBe('nbcmCmMhueyWumy, DM lywiggyhxm nbcm zil pulcuvfy hugym');

        expect(encrypt('qefpFpPkxhbZxpb', -23)).toBe('thisIsSnakeCase');
        expect(encrypt('nbcmCmMhueyWumy, DM lywiggyhxm nbcm zil pulcuvfy hugym', -98))
        .toBe('thisIsSnakeCase, JS recommends this for variable names');
    })

    it('encrypt() rounds the key if it is a floating point number', () => {
        expect(encrypt('attack at dawn', 4.892)).toBe('fyyfhp fy ifbs')
        expect(encrypt('attack at dawn', 5.317)).toBe('fyyfhp fy ifbs')
    })
})