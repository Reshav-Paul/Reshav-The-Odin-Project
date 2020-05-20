import { orientations } from "./factory-functions/gameboard";

const DOMActions = (function() {

    function createBoard(parent, cb) {
        for (let i = 0; i < 10; ++i) {
            for (let j = 0; j < 10; ++j) {
                const cell = document.createElement('div');
                cell.classList.add('cell', 'water');
                cell.setAttribute('data-xy', `${i} ${j}`);

                cb && cell.addEventListener('mouseup', cb)
                parent.appendChild(cell);
            }
        }
    }

    function placeShip(ship, x, y, parent, orientation = orientations.horizontal) {
        for (let i = 0; i < ship.getLength(); ++i) {
            const cell = orientation === orientations.horizontal
            ? document.querySelector(
                `#${parent.getAttribute('id')} > .cell[data-xy='${x} ${y + i}']`
            )
            : document.querySelector(
                `#${parent.getAttribute('id')} > .cell[data-xy='${x + i} ${y}']`
            );
            cell.classList.remove('water');
            cell.classList.add('ship');
            cell.setAttribute('data-id', ship.getID());
        }
    }

    function markCellDestroyed(e) {
        e.classList.add('destroyed');
    }

    function updateShipPlacementInfo(shipNo, length) {
        document.getElementById('ship-num').textContent = `Place Ship No. ${shipNo} on the board`;
        document.getElementById('length').textContent = `This ship has a length of ${length}`;
    }

    function removeShipPlacementInfo() {
        document.getElementById('ship-num').textContent = 
            `Ships in place. Game has started. Destroy the ships on Computer's board`;
        document.getElementById('length').textContent = '';
        document.getElementById('orientation-choice').style.display = 'none';
    }

    function declareWinner(winner) {
        const header = document.getElementById('ship-num');
        header.textContent = `Game Over! ${winner} has won the game`;
    }

    function updateScores(player, computer) {
        document.getElementById('player-score').textContent =
            'Player Score: ' + player.getScore() * 100;
        document.getElementById('comp-score').textContent =
            'Computer Score: ' + computer.getScore() * 100;
    }

    return { createBoard, placeShip, markCellDestroyed, updateShipPlacementInfo,
        updateScores, removeShipPlacementInfo, declareWinner };
})();

export default DOMActions;