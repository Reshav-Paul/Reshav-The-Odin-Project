const isAlpha = function(ch) {
    return typeof(ch) === 'string' && ch.length === 1 && /^[A-Z]$/i.test(ch);
}
const encrypt = function(ch, shift) {
    ch = ch.charCodeAt(0);
    if(ch <= 90)
        return String.fromCharCode(65 + (ch - 65 + shift) % 26);
    return String.fromCharCode(97 + (ch - 97 + shift) % 26);
}
const caesar = function(plainText, shift) {
    shift = normalizeShift(shift);
    cipherTextCharArray = plainText.split('')
        .map(ch => isAlpha(ch)? encrypt(ch, shift) : ch);
    return cipherTextCharArray.join('');
}

function normalizeShift(shift) {
    if(shift < 0)
        return 26 -(Math.abs(shift) % 26);
    if(shift > 25)
        return shift % 26;
    return shift;
}

module.exports = caesar
