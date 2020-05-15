function analyze(arr) {
    if (arr.length === 0) throw new Error('empty array');
    arr.forEach(e => {
        if(typeof(e) !== 'number') throw new Error('non-number type error')
    })
    return {
        average: (arr.reduce((prev, curr) => prev + curr, 0) / arr.length),
        min: (arr.reduce((prev, curr) => ((curr < prev)? curr : prev), arr[0])),
        max: (arr.reduce((prev, curr) => ((curr > prev)? curr : prev), arr[0])),
        length: arr.length
    }
}

module.exports = { analyze };