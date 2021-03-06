import Ship from './ship';
import { shuffleArray } from '../utilities';

const cellTypes = Object.freeze({water: 0, ship: 1, destroyed: 2});
const orientations = Object.freeze({horizontal: 0, vertical: 1});

const Gameboard = function() {
    let boardData = {
        board: [],
        ships: [],
        allSunk: false
    };
    for (let i = 0; i < 10; ++i) {
        boardData.board.push([]);
        for (let j = 0; j < 10; ++j) {
            boardData.board[i].push(cellTypes.water);
        }
    }

    const placeShip = (x, y, length, orientation = orientations.horizontal) => {
        if (x < 0 || y < 0 || x >= 10 || y >= 10) return;
        if (orientation === orientations.horizontal && (y + length) > 10) return;
        if (orientation === orientations.vertical && (x + length) > 10) return;

        const ship = Ship(boardData.ships.length, length);
        const shipWrapper = {
            ship,
            startCoords: {x, y},
            orientation
        }
        if (shipWrapper.orientation === orientations.horizontal) {
            
            //check if any of the locations is occupied
            for (let i = 0; i < length; i++) {
                if (boardData.board[x][y + i] !== cellTypes.water) return;
            }
            //place the ship if all locations free
            for (let i = 0; i < length; i++) {
                boardData.board[x][y + i] = ship;
            }
            boardData.ships.push(shipWrapper);
            return ship;
            
        } else {
            //check if any of the locations is occupied
            for (let i = 0; i < length; i++) {
                if (boardData.board[x + i][y] !== cellTypes.water) return;
            }
            //place the ship if all locations free
            for (let i = 0; i < length; i++) {
                boardData.board[x + i][y] = ship;
            }
            boardData.ships.push(shipWrapper);
            return ship;
        }
    }

    function placeShipsRandomly() {
        if (nShips() > 0) return;
        let rowPairs = shuffleArray([[3, 0], [2, 7], [5, 8], [4, 1], [6, 9]]);
        let rows = [];
        rowPairs.forEach(pair => rows.push(...pair));
        let cols = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
        const sizes = [2, 2, 3, 4, 4];

        for (let i of rows) {
            for (let j of cols) {
                const orientation = Math.random() < 0.5
                    ? orientations.horizontal
                    : orientations.vertical;
                const size = sizes.pop()

                const newShip = placeShip(i, j, size, orientation);
                if (newShip) {
                    cols = shuffleArray(cols);
                    break;
                } else {
                    sizes.push(size)
                }
            }
            if (sizes.length === 0) return boardData.ships;
        }
    }

    function _getHitIndex(ship, x, y) {
        for (const shipWrapper of boardData.ships) {
            if (shipWrapper.ship === ship) {
                if (shipWrapper.orientation === orientations.horizontal) {
                    return y - shipWrapper.startCoords.y;
                } else {
                    return x - shipWrapper.startCoords.x;
                }
            }
        }
    }

    function _checkAllSunk() {
        boardData.allSunk = boardData.ships.length === nSunk();
        return boardData.allSunk;
    }

    const allSunk = () => boardData.allSunk;

    const nSunk = () => 
        boardData.ships.filter(shipWrapper => shipWrapper.ship.isSunk() === true).length;

    const nShips = () => boardData.ships.length;

    const recieveAttack = (x, y) => {
        if (x < 0 || y < 0 || x >= 10 || y >= 10) return;

        let cell = boardData.board[x][y];
        
        if (cell === cellTypes.destroyed) return;
        if (cell === cellTypes.water) {
            boardData.board[x][y] = cellTypes.destroyed;
            return cellTypes.water;
        }

        let ship = cell;
        const isHit = ship.hit(_getHitIndex(ship, x, y));

        if (!isHit) return;
        if (ship.isSunk()) _checkAllSunk();
        boardData.board[x][y] = cellTypes.destroyed;
        return cellTypes.ship;
    }

    return { placeShip, placeShipsRandomly, recieveAttack, nSunk, allSunk, nShips }
}

export default Gameboard;
export { orientations, cellTypes };
