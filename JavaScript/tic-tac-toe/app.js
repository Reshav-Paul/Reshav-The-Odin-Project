
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

        function getRandEmptyCell() {
            let freePosX = [];
            let freePosY = [];
            for (let i = 0; i < 3; ++i)
                for (let j = 0; j < 3; ++j)
                    if (_matrix[i][j] === '') {
                        freePosX.push(i);
                        freePosY.push(j);
                    }
            if (freePosX.length === 0 || freePosY.length === 0) return;
            const pos = Math.floor(Math.random() * freePosX.length);
            return document
                .querySelector(`.cell[data-xy='${freePosX[pos]},${freePosY[pos]}']`);
        }

        function _reset() {
            _matrix = [['', '', ''], ['', '', ''], ['', '', '']];
            document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
            gameController.reset();
        }
        return { setup, placeMarker, detectWinCondition, getRandEmptyCell };
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
            _player2 = playerFactory('O', _gameMode === 'mp' ? 'Player 2' : 'Computer');
            _currentPlayer = _player1;
            _gameOver = false;

            if (_gameMode === 'mp')
                document.getElementById('turn').textContent =
                    `It's ${_currentPlayer.getName()}'s turn`;
            else
                document.getElementById('turn').textContent =
                    `It's ${_currentPlayer.getName()} vs the ${_player2.getName()}`;
            document.querySelectorAll('.cell')
                .forEach(e => e.addEventListener('click', handleClick));
            document.getElementById('pl1-name')
                .addEventListener('input', e => _changePlayerName(_player1, e.target));
            document.getElementById('pl2-name')
                .addEventListener('input', e => _changePlayerName(_player2, e.target));
        }

        function _changePlayerName(player, input) {
            let oldName = player.getName();
            let newName = input.value.length > 0 ? input.value : input.getAttribute('data-default')
            player.setName(newName);
            if (_gameMode === 'mp' && player !== _currentPlayer) return;

            const element = document.getElementById('turn');
            let oldText = element.textContent;
            element.textContent = oldText.replace(oldName, newName);
        }

        function handleClick(e) {
            const cell = e.target;
            if (_gameOver) return;
            if (cell.textContent.length > 0) return;

            gameboard.placeMarker(cell, _currentPlayer.getMarker());

            const result = gameboard.detectWinCondition(_currentPlayer.getMarker());
            _anounceIfGameOver(result);
            if (result === gameStatus.incomplete) {
                if (_gameMode === 'sp') _makeComputerMove();
                !_gameOver && _switchPlayer();
            }
        }

        function _switchPlayer() {
            if (_currentPlayer === _player1)
                _currentPlayer = _player2;
            else
                _currentPlayer = _player1;
            if (_gameMode === 'mp')
                document.getElementById('turn').textContent = `It's ${_currentPlayer.getName()}'s turn`;
        }
        function _makeComputerMove() {
            _currentPlayer = _player2;
            const cell = gameboard.getRandEmptyCell();
            if (!cell) return;
            gameboard.placeMarker(cell, _currentPlayer.getMarker());
            const result = gameboard.detectWinCondition(_currentPlayer.getMarker());
            _anounceIfGameOver(result);
        }
        function _anounceIfGameOver(result) {
            if (result === gameStatus.won) {
                document.getElementById('turn').textContent =
                    `Game Over! Winner is ${_currentPlayer.getName()}`;
                _gameOver = true;
            }
            if (result === gameStatus.draw) {
                document.getElementById('turn').textContent =
                    `Game Over! It was a Draw`;
                _gameOver = true;
            }
        }
        function reset() {
            _gameOver = false;
            _currentPlayer = _player1;
            if (_gameMode === 'mp')
                document.getElementById('turn').textContent =
                    `It's ${_currentPlayer.getName()}'s turn`;
            else
                document.getElementById('turn').textContent =
                    `It's ${_currentPlayer.getName()} vs the ${_player2.getName()}`;
        }
        return { setup, reset };
    }
)();

document.getElementById('sp').addEventListener('click', e => startGame('sp'));
document.getElementById('mp').addEventListener('click', e => startGame('mp'));
gameStatus = Object.freeze({ 'draw': 0, 'won': 1, 'incomplete': -1 });

function startGame(mode) {
    document.getElementById('game-main').classList.remove('invisible');
    document.getElementById('mode-sel').classList.add('invisible');
    document.getElementById('pl1-name').value = 'Player 1';
    document.getElementById('pl2-name').value = mode === 'mp' ? 'Player 2' : 'Computer';
    gameboard.setup();
    gameController.setup(mode);
}