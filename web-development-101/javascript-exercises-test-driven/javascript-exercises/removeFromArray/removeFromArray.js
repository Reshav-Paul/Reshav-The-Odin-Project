const removeFromArray = function(array, ...obsoleteElements) {
    let newArray = [];
    array.forEach(element => {
        if(!obsoleteElements.includes(element))
            newArray.push(element);
    });
    return newArray;
}

module.exports = removeFromArray
