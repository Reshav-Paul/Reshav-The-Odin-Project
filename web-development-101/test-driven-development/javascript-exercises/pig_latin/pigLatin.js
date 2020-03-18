function translate(text) {
	words = text.split(' ');
	newWordsArray = [];
	for (let i = 0; i < words.length; ++i) {
		newWordsArray.push(getPigLatin(words[i]))
	}
	return newWordsArray.join(' ');
}

function getPigLatin(word) {
	let vowelPattern = /^[aeiou]+/i;
	let consonantPattern = /^[^aeiou]+/i;
	let quPattern = /[^aeiou]*qu/i;
	if(word.match(quPattern)) {
		let splitIndex = quPattern.exec(word).index +
			word.match(quPattern)[0].length;
		return word.slice(splitIndex) + word.slice(0, splitIndex) + 'ay';
	}
	if (word.match(vowelPattern)) {
		return word + 'ay';
	}
	if (word.match(consonantPattern)) {
		let splitIndex = consonantPattern.exec(word).index +
			word.match(consonantPattern)[0].length;
		return word.slice(splitIndex) + word.slice(0, splitIndex) + 'ay';
	}
}


module.exports = {
	translate
}

