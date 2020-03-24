function add (a, b) {
	return a + b;
}

function subtract (a, b) {
	return a - b;
}

function sum (a) {
	let summation = a.reduce((accumulator, e) => accumulator + e, 0);
	return summation;
}

function multiply (a) {
	let product = a.reduce((accumulator, e) => accumulator * e, 1);
	return product;
}

function power(base, exponent) {
	return base ** exponent;
}

function factorial(n) {
	fact = 1;
	for(let i = 2; i <= n; ++i)
		fact *= i;
	return fact;
}

module.exports = {
	add,
	subtract,
	sum,
	multiply,
    power,
	factorial
}