const { analyze } = require('./array-analysis');

describe('array analysis test', () => {

    it('works with no elements in the array', () => {
        expect(() => analyze([])).toThrow('empty array')
    })

    it('works with single element array', () => {
        expect(analyze([4])).toEqual({
            average: 4,
            min: 4,
            max: 4,
            length: 1
        })
    })

    it('works with multi-element array', () => {
        expect(analyze([7.56, 11.89, 45, 31.33, 0.21])).toEqual({
            average: 19.198,
            min: 0.21,
            max: 45,
            length: 5
        })
        
        const {average, min, max, length} = analyze([11.58, 3.87, -7, 14.33, 9.88, 2.33, 7.66])
        expect(average).toBeCloseTo(6.09285)
        expect({min, max, length}).toEqual({
            min: -7,
            max: 14.33,
            length: 7
        })

        expect(analyze([7,8,3,4,2,6])).toEqual({
            average: 5,
            min: 2,
            max: 8,
            length: 6
        })
    })

    it('throws error if any element is non-number type', () => {
        expect(() => analyze([7,8,'abc',4,2,6])).toThrow('non-number type error')
    })
})