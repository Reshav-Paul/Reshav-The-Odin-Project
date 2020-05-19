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

    function placeShip(ship, x, y, orientation = orientations.horizontal, parent, cb = () => {}) {
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

    function declareWinner(winner) {
        const winnerHeader = document.createElement('h2');
        winnerHeader.textContent = winner;
        document.body.appendChild(winnerHeader);
    }

    return { createBoard, placeShip, markCellDestroyed, declareWinner };
})();

export default DOMActions;