const reverseString = function(inputString) {
    let outputString = '';
    inputString.split('').forEach(element => {
        outputString = element + outputString;
    });
    return outputString;
}

module.exports = reverseString
