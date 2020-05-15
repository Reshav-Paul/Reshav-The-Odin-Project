function encrypt(plainText, offset) {
    return plainText.split('')
        .map(ch => getCipher(ch, Math.round(offset)))
        .join('');
}

function mod(a, b) {
    while (a < 0) a = a + b;
    return a % b;
}

function getCipher(ch, n) {
    n = mod(n, 26);
    if (ch >= 'a' && ch <= 'z') {
        const cipherCode = ch.charCodeAt(0) - 97 + n;
        return String.fromCharCode(mod(cipherCode, 26) + 97);
    }
    if (ch >= 'A' && ch <= 'Z') {
        const cipherCode = ch.charCodeAt(0) - 65 + n;
        return String.fromCharCode(mod(cipherCode, 26) + 65);
    }

    return ch;
}

module.exports = {encrypt};