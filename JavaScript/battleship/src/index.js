import Gameboard, { cellTypes, orientations } from "./factory-functions/gameboard";
import DOMActions from "./dom-interface";
import { makeRandomMove } from "./utilities";

let gameOver = false;
const playerBoard = Gameboard();
const computerBoard = Gameboard();

const playerDOMBoard = document.getElementById('player-board');
const computerDOMBoard = document.getElementById('computer-board');

DOMActions.createBoard(playerDOMBoard, handlePlayerClick);
DOMActions.createBoard(computerDOMBoard);

const playerShipCoords = [
    { x: 0, y: 1, length: 4, orientation: orientations.vertical },
    { x: 2, y: 8, length: 1 },
    { x: 3, y: 3, length: 3 },
    { x: 7, y: 6, length: 3, orientation: orientations.vertical },
    { x: 9, y: 2, length: 1 }
];

const computerShipCoords = [
    { x: 0, y: 4, length: 3 },
    { x: 2, y: 1, length: 4 },
    { x: 3, y: 6, length: 3, orientation: orientations.vertical },
    { x: 7, y: 1, length: 1 },
    { x: 9, y: 5, length: 1 }
];

function handlePlayerClick(e) {
    if (gameOver) return;
    const coords = e.target.getAttribute('data-xy').split(' ');
    const hitType = playerBoard.recieveAttack(coords[0], coords[1]);
    if (hitType !== cellTypes.water && hitType !== cellTypes.ship) return;
    DOMActions.markCellDestroyed(e.target);
    if (playerBoard.nSunk() === 5) {
        gameOver = true;
        DOMActions.declareWinner('player');
        return;
    }
    !gameOver && makeRandomMove(computerBoard);
    if (computerBoard.nSunk() === 5) {
        gameOver = true;
        DOMActions.declareWinner('computer');
    }
}

playerShipCoords.forEach(coord => {
    const newShip = playerBoard.placeShip(coord.x, coord.y, coord.length, coord.orientation);
    newShip && DOMActions.placeShip(
        newShip, coord.x, coord.y, coord.orientation, playerDOMBoard, handlePlayerClick
    );
});

computerShipCoords.forEach(coord => {
    const newShip = computerBoard.placeShip(coord.x, coord.y, coord.length, coord.orientation);
    newShip && DOMActions.placeShip(
        newShip, coord.x, coord.y, coord.orientation, computerDOMBoard
    );
});