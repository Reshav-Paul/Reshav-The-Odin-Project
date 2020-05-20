import Gameboard, { cellTypes, orientations } from "./factory-functions/gameboard";
import Player from './factory-functions/player';
import DOMActions from "./dom-interface";
import { makeRandomMove } from "./utilities";

let gameOver = false;
let gameStarted = false;

const playerBoard = Gameboard();
const computerBoard = Gameboard();
let shipLengths = [2, 2, 3, 4 ,4];

const playerDOMBoard = document.getElementById('player-board');
const computerDOMBoard = document.getElementById('computer-board');

DOMActions.createBoard(playerDOMBoard, handleShipPlacement);
DOMActions.createBoard(computerDOMBoard, handlePlayerClick);

const player = Player('Player');
const computer = Player('Computer');

function handlePlayerClick(e) {
    if (gameOver) return;
    if (!gameStarted) return;
    const coords = e.target.getAttribute('data-xy').split(' ');
    const hitType = computerBoard.recieveAttack(coords[0], coords[1]);
    if (hitType !== cellTypes.water && hitType !== cellTypes.ship) return;
    DOMActions.markCellDestroyed(e.target);
    player.updateScore(computerBoard);
    if (computerBoard.nSunk() === 5) {
        gameOver = true;
        DOMActions.declareWinner(player.getName());
        return;
    }
    if (!gameOver) {
        makeRandomMove(playerBoard, playerDOMBoard);
        computer.updateScore(playerBoard);
    }
    DOMActions.updateScores(player, computer);
    if (playerBoard.nSunk() === 5) {
        gameOver = true;
        DOMActions.declareWinner(computer.getName());
    }
}

function handleShipPlacement(e) {
    if (gameStarted || shipLengths.length === 0) return;

    const cell = e.target;
    const length = shipLengths.pop();
    const coords = cell.getAttribute('data-xy').split(' ');
    const x = parseInt(coords[0]);
    const y = parseInt(coords[1]);
    const orientation = 
        document.getElementById('orientation').value === 'horizontal'
        ? orientations.horizontal
        : orientations.vertical;

    const newShip = playerBoard.placeShip(x, y, length, orientation);

    if(newShip) {
        DOMActions.placeShip(newShip, x, y, playerDOMBoard, orientation);
        DOMActions.updateShipPlacementInfo((playerBoard.nShips() + 1),
            shipLengths[shipLengths.length - 1]);
    }
    !newShip && shipLengths.push(length);
    if (playerBoard.nShips() === 5) {
        gameStarted = true;
        DOMActions.removeShipPlacementInfo();
        DOMActions.updateScores(player, computer);
    }
}

const shipWrappers = computerBoard.placeShipsRandomly();

shipWrappers.forEach(shipWrapper => {
    DOMActions.placeShip(
        shipWrapper.ship, shipWrapper.startCoords.x,shipWrapper.startCoords.y,
        computerDOMBoard, shipWrapper.orientation
    );
});