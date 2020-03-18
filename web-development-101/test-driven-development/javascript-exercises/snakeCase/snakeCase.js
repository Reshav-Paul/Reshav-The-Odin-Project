const snakeCase = function(text) {
    let pattern = /[^a-z]+/i;
    text = insertSpaceInCamelCase(text);
    return text.toLowerCase().split(pattern).filter(e => e.length > 0).join('_');
}
function insertSpaceInCamelCase(text) {
    let pattern = /[a-z]{2}[A-Z][a-z]/;
    spacedText = '';
    for(let i = 0; i < text.length - 3; i++) {
        let subString = text.slice(i, i + 4);
        if(subString.match(pattern)) {
            subString = subString.slice(0, 2) + ' ' + subString.slice(2);
            spacedText += subString;
            i += 3;
            if(i > (text.length - 5))
                spacedText += text.slice(i + 1);
            continue;
        }
        spacedText += text.charAt(i);
        if(i === (text.length - 4))
            spacedText += text.slice(-3);
    }
    return spacedText;
}


module.exports = snakeCase
