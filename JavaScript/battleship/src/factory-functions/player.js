const Player = function(_name) {
    const getName = () => _name;
    const makeRandomMove = (gameboard) => {
        for (let i = 0; i < 10; ++i) {
            for (let j = 0; j < 10; ++j) {
                const isHit = gameboard.recieveAttack(i, j);
                if (isHit !== undefined) return isHit;
            }
        }
    }

    const makeMove = (gameboard, x, y) => {
        return gameboard.recieveAttack(x, y);
    }

    const getScore = (gameboard) => {
        return gameboard.nSunk() / gameboard.nShips();
    }

    return {getName, makeRandomMove, makeMove, getScore};
}

export default Player;