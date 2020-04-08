
const playerFactory = function (_marker, _name = 'player') {
    const getMarker = () => _marker;
    const setName = name => _name = name;
    const getName = () => _name;
    return { getMarker, getName, setName };
}

const gameboard = (
    function () {
        let _matrix = [['', '', ''], ['', '', ''], ['', '', '']];

        function setup() {
            const gameGrid = document.getElementById('game-grid');
            for (let i = 0; i < 3; ++i)
                for (let j = 0; j < 3; ++j) {
                    let cell = document.createElement('div');
                    cell.classList.add('cell');
                    cell.setAttribute('data-xy', `${i},${j}`);
                    gameGrid.appendChild(cell);
                }

            const resetButton = document.getElementById('reset');
            resetButton.addEventListener('click', _reset);
        }

        function placeMarker(cell, marker) {
            [x, y] = cell.getAttribute('data-xy').split(',');
            _matrix[parseInt(x)][parseFloat(y)] = marker;
            cell.textContent = marker;
        }

        function detectWinCondition(marker) {
            const winString = marker + marker + marker;

            let mainDiag = '';
            let antiDiag = '';
            for (let i = 0; i < 3; ++i) {
                let col = '';
                let row = '';
                for (let j = 0; j < 3; ++j) {
                    if (i === j) mainDiag += _matrix[i][j];
                    if ((i + j) === 2) antiDiag += _matrix[i][j];
                    row += _matrix[i][j];
                    col += _matrix[j][i];
                }
                if (row === winString || col === winString) return true;
            }
            if (mainDiag === winString || antiDiag === winString) return true;
            return false;
        }

        function _reset() {
            _matrix = [['', '', ''], ['', '', ''], ['', '', '']];
            document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
            gameController.reset();
            document.getElementById('game-over-msg').textContent = '';
        }
        return { setup, placeMarker, detectWinCondition };
    }
)();

gameboard.setup();

const gameController = (
    function () {
        let _player1 = playerFactory('X');
        _player1.setName('Player 1');

        let _player2 = playerFactory('O');
        _player2.setName('Player 2');

        let _currentPlayer = _player1;
        let _gameOver = false;

        document.querySelectorAll('.cell')
            .forEach(e => e.addEventListener('click', handleClick));

        function handleClick(e) {
            const cell = e.target;
            if (_gameOver) return;
            if (cell.textContent.length > 0) return;

            gameboard.placeMarker(cell, _currentPlayer.getMarker());
            const result = gameboard.detectWinCondition(_currentPlayer.getMarker());
            if (result) {
                document.getElementById('game-over-msg').textContent =
                    `Game Over! Winner is ${_currentPlayer.getName()}`;
                _gameOver = true;
            }
            _switchPlayer();
        }
        function _switchPlayer() {
            if (_currentPlayer === _player1)
                _currentPlayer = _player2;
            else
                _currentPlayer = _player1;
        }
        function reset() {
            _gameOver = false;
            _currentPlayer = _player1;

        }
        return { reset };
    }
)();
