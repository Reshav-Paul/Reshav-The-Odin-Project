const repeatString = function(inputString, nTimes) {
    let outputString = '';
    if(nTimes < 0)
        return 'ERROR';
    for(let i = 0; i < nTimes; i++)
        outputString += inputString;
    return outputString;
}

module.exports = repeatString;
