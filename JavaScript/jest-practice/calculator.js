function add(a = 0, b = 0, ...rest) {
    let restSum = rest.reduce((prev, curr) => prev + (curr || 0), 0);
    return restSum + a + b;
}

function subtract(a = 0, b = 0, ...rest) {
    if (rest && rest.length > 0) throw new Error('too many arguments')
    if (typeof(a) !== 'number' || typeof(b) !== 'number') throw new Error('non-number type error')
    return a - b;
}

function multiply(a, b, ...rest) {
    if (!a && !b) throw new Error('no arguments specified');
    if (!b) return a;
    if (!a) return b;

    if (typeof(a) !== 'number' || typeof(b) !== 'number') throw new Error('non-number type error');
    if (rest.filter(num => num && typeof(num) !== 'number').length > 0) throw new Error('non-number type error');

    let restProduct = rest.reduce((prev, curr) => prev * curr, 1);
    return a * b * restProduct;
}

function divide(a, b, ...rest) {
    if (rest && rest.length > 0) throw new Error('too many arguments');
    if (!a && !b) throw new Error('no arguments specified');
    if (b === 0) throw new Error('zero division error');
    if ((!a && a!==0) || !b) throw new Error('too few arguments');
    if (typeof(a) !== 'number' || typeof(b) !== 'number') throw new Error('non-number type error');

    return a / b;
}

module.exports = { add, subtract, multiply, divide }