gameboard = (
    function () {
        let _matrix = [['', '', ''], ['', '', ''], ['', '', '']];
        let _gameOver = false;

        function setup() {
            const gameGrid = document.getElementById('game-grid');
            for (let i = 0; i < 3; ++i)
                for (let j = 0; j < 3; ++j) {
                    let cell = document.createElement('div');
                    cell.classList.add('cell');
                    cell.setAttribute('data-xy', `${i},${j}`);
                    cell.addEventListener('click', e => _placeMarker(e.target));
                    gameGrid.appendChild(cell);
                }

            const resetButton = document.getElementById('reset');
            resetButton.addEventListener('click', _resetGame);
            _gameOver = false;
        }

        function _placeMarker(cell) {
            if (_gameOver) return;
            if(cell.textContent.length > 0) return;

            const marker = currentPlayer.getMarker();
            [x, y] = cell.getAttribute('data-xy').split(',');
            _matrix[parseInt(x)][parseFloat(y)] = marker;
            cell.textContent = marker;
            _detectWinCondition();
            switchPlayer();
        }

        function _detectWinCondition() {
            const marker = currentPlayer.getMarker();
            const winString = marker + marker + marker;

            for (let i = 0; i < 3; ++i) {
                if (_matrix[i].join('') === winString) {
                    console.log(currentPlayer.getName() + 'has won');
                    _gameOver = true;
                }
            }
        }

        function _resetGame() {
            console.log('reset');
            _matrix = [['', '', ''], ['', '', ''], ['', '', '']];
            document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
            currentPlayer = player1;
            _gameOver = false;
        }
        return { setup };
    }
)();

playerFactory = function (_marker, _name = 'player') {
    const getMarker = () => _marker;
    const setName = name => _name = name;
    const getName = () => _name;
    return { getMarker, getName, setName };
}
player1 = playerFactory('X');
player1.setName('Player 1');

player2 = playerFactory('O');
player2.setName('Player 2');

let currentPlayer = player1;

function switchPlayer() {
    if (currentPlayer === player1)
        currentPlayer = player2;
    else
        currentPlayer = player1;
}

gameboard.setup();