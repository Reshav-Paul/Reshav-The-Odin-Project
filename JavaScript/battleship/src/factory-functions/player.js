const Player = function(_name, _score = 0) {
    const getName = () => _name;

    const getScore = () => _score;

    const updateScore = (gameboard) => {
        _score = (gameboard.nSunk() / gameboard.nShips());
    }

    return {getName, getScore, updateScore};
}

export default Player;