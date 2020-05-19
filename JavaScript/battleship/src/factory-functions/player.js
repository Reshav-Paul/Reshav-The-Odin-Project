const Player = function(_name) {
    const getName = () => _name;

    const getScore = (gameboard) => {
        return gameboard.nSunk() / gameboard.nShips();
    }

    return {getName, getScore};
}

export default Player;