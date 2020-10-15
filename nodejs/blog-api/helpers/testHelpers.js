let hexToInt = {
    '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
    'a': 10, 'b': 11, 'c': 12, 'd': 13, 'e': 14, 'f': 15
};

module.exports.generateMongoId = function(id, offset = 3) {
    let lastChar = id.slice(-1);
    let lastCharInt = hexToInt[lastChar];
    if (lastCharInt == undefined) return id;

    lastCharInt = (lastCharInt + offset) % 16;

    for (const key in hexToInt) {
        if (hexToInt[key] == lastCharInt) return id.slice(0, -1) + key;
    }
    return id;
}