const palindromes = function(inputString) {
    let text = stripPunctuation(inputString.toLowerCase());
    let j = text.length - 1;
    let i = 0
    while (i <= j) {
        if(text[i] !== text[j])
            return false;
        i++;
        j--;
    }
    return true;
}
function stripPunctuation(text) {
    output = '';
    text.split('').forEach(element => {
        if(isAlpha(element))
            output += element;
    });
    return output;
}
function isAlpha(ch) {
    if((ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z'))
        return true;
    return false;
}

module.exports = palindromes
