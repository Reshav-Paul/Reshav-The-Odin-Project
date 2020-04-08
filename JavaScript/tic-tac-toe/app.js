
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
            let fullMatrixString = '';

            for (let i = 0; i < 3; ++i) {
                let col = '';
                let row = '';
                for (let j = 0; j < 3; ++j) {
                    if (i === j) mainDiag += _matrix[i][j];
                    if ((i + j) === 2) antiDiag += _matrix[i][j];
                    row += _matrix[i][j];
                    col += _matrix[j][i];
                    fullMatrixString += _matrix[i][j];
                }
                if (row === winString || col === winString) return gameStatus.won;
            }
            if (mainDiag === winString || antiDiag === winString) return gameStatus.won;
            if (fullMatrixString.length === 9) return gameStatus.draw;
            return gameStatus.incomplete;
        }

        function _reset() {
            _matrix = [['', '', ''], ['', '', ''], ['', '', '']];
            document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
            gameController.reset();
        }
        return { setup, placeMarker, detectWinCondition };
    }
)();

const gameController = (
    function () {
        let _player1;
        let _player2;
        let _currentPlayer;
        let _gameOver;
        let _gameMode;

        function setup(gameMode) {
            _gameMode = gameMode;
            _player1 = playerFactory('X', 'Player 1');
            _player2 = playerFactory('O', 'Player 2');
            _currentPlayer = _player1;
            _gameOver = false;

            document.getElementById('turn').textContent = `It's ${_currentPlayer.getName()}'s turn`;
            document.querySelectorAll('.cell')
                .forEach(e => e.addEventListener('click', handleClick));
            document.getElementById('pl1-name').addEventListener('input', e => _changePlayerName(_player1, e.target));
            document.getElementById('pl2-name').addEventListener('input', e => _changePlayerName(_player2, e.target));
        }
        function _changePlayerName(player, input) {
            player.setName(input.value.length > 0 ? input.value : input.getAttribute('data-default'));
            document.getElementById('turn').textContent = `It's ${_currentPlayer.getName()}'s turn`;
        }
        function handleClick(e) {
            const cell = e.target;
            if (_gameOver) return;
            if (cell.textContent.length > 0) return;

            gameboard.placeMarker(cell, _currentPlayer.getMarker());
            const result = gameboard.detectWinCondition(_currentPlayer.getMarker());
            if (result === gameStatus.won) {
                document.getElementById('turn').textContent =
                    `Game Over! Winner is ${_currentPlayer.getName()}`;
                _gameOver = true;
            }
            else if (result === gameStatus.draw) {
                document.getElementById('turn').textContent =
                    `Game Over! It was a Draw`;
                _gameOver = true;
            }
            else _switchPlayer();
        }
        function _switchPlayer() {
            if (_currentPlayer === _player1)
                _currentPlayer = _player2;
            else
                _currentPlayer = _player1;
            document.getElementById('turn').textContent = `It's ${_currentPlayer.getName()}'s turn`;
        }
        function reset() {
            _gameOver = false;
            _currentPlayer = _player1;
            document.getElementById('turn').textContent = `It's ${_currentPlayer.getName()}'s turn`;
        }
        return { setup, reset };
    }
)();

document.getElementById('sp').addEventListener('click', e => startGame('sp'));
document.getElementById('mp').addEventListener('click', e => startGame('mp'));
gameStatus = Object.freeze({'draw':0, 'won': 1, 'incomplete': -1});
function startGame(mode) {
    document.getElementById('game-main').classList.remove('invisible');
    document.getElementById('mode-sel').classList.add('invisible');
    document.getElementById('pl1-name').value = 'Player 1';
    document.getElementById('pl2-name').value = 'Player 2';
    gameboard.setup();
    gameController.setup(mode);
}