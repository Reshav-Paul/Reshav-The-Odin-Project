const capitalize = (text) => {
    if (!text) return text;
    if (typeof(text) !== 'string') throw new Error('non-string type error');
    let cap = [];
    for (let ch of text) {
        if (ch >= 'a' && ch <= 'z') cap.push(String.fromCharCode(ch.charCodeAt(0) - 32))
        else cap.push(ch);
    }
    return cap.join('');
}

const reverse = (text) => {
    if (!text) return text;
    if (typeof(text) !== 'string') throw new Error('non-string type error');
    return text.split('').reduce((prev, curr) => curr + prev, '');
}

module.exports = { capitalize, reverse };