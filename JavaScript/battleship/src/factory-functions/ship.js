const Ship = function(_id, _length = 1) {
    let _hitBoxes = [];
    
    for (let i = 0; i < _length; ++i) {
        _hitBoxes.push(false);
    }

    const hit = index => {
        if (index < 0 || index >= _hitBoxes.length) return;
        if (_hitBoxes[index]) return false;
        _hitBoxes[index] = true;
        return true;
    }

    const isSunk = () => {
        const sunkStatus = _hitBoxes.reduce((prev, curr) => prev && curr, true);
        return sunkStatus;
    }

    const getID = () => _id;
    const getLength = () => _length;

    return { getID, getLength, hit, isSunk };
}

export default Ship;