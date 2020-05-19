/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom-interface.js":
/*!******************************!*\
  !*** ./src/dom-interface.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _factory_functions_gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factory-functions/gameboard */ \"./src/factory-functions/gameboard.js\");\n\r\n\r\nconst DOMActions = (function() {\r\n\r\n    function createBoard(parent, cb) {\r\n        for (let i = 0; i < 10; ++i) {\r\n            for (let j = 0; j < 10; ++j) {\r\n                const cell = document.createElement('div');\r\n                cell.classList.add('cell', 'water');\r\n                cell.setAttribute('data-xy', `${i} ${j}`);\r\n\r\n                cb && cell.addEventListener('mouseup', cb)\r\n                parent.appendChild(cell);\r\n            }\r\n        }\r\n    }\r\n\r\n    function placeShip(ship, x, y, orientation = _factory_functions_gameboard__WEBPACK_IMPORTED_MODULE_0__[\"orientations\"].horizontal, parent, cb = () => {}) {\r\n        for (let i = 0; i < ship.getLength(); ++i) {\r\n            const cell = orientation === _factory_functions_gameboard__WEBPACK_IMPORTED_MODULE_0__[\"orientations\"].horizontal\r\n            ? document.querySelector(\r\n                `#${parent.getAttribute('id')} > .cell[data-xy='${x} ${y + i}']`\r\n            )\r\n            : document.querySelector(\r\n                `#${parent.getAttribute('id')} > .cell[data-xy='${x + i} ${y}']`\r\n            );\r\n            cell.classList.remove('water');\r\n            cell.classList.add('ship');\r\n            cell.setAttribute('data-id', ship.getID());\r\n        }\r\n    }\r\n\r\n    function markCellDestroyed(e) {\r\n        e.classList.add('destroyed');\r\n    }\r\n\r\n    function declareWinner(winner) {\r\n        const winnerHeader = document.createElement('h2');\r\n        winnerHeader.textContent = winner;\r\n        document.body.appendChild(winnerHeader);\r\n    }\r\n\r\n    return { createBoard, placeShip, markCellDestroyed, declareWinner };\r\n})();\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (DOMActions);\n\n//# sourceURL=webpack:///./src/dom-interface.js?");

/***/ }),

/***/ "./src/factory-functions/gameboard.js":
/*!********************************************!*\
  !*** ./src/factory-functions/gameboard.js ***!
  \********************************************/
/*! exports provided: default, orientations, cellTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"orientations\", function() { return orientations; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cellTypes\", function() { return cellTypes; });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/factory-functions/ship.js\");\n/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities */ \"./src/utilities.js\");\n\r\n\r\n\r\nconst cellTypes = Object.freeze({water: 0, ship: 1, destroyed: 2});\r\nconst orientations = Object.freeze({horizontal: 0, vertical: 1});\r\n\r\nconst Gameboard = function() {\r\n    let boardData = {\r\n        board: [],\r\n        ships: [],\r\n        allSunk: false\r\n    };\r\n    for (let i = 0; i < 10; ++i) {\r\n        boardData.board.push([]);\r\n        for (let j = 0; j < 10; ++j) {\r\n            boardData.board[i].push(cellTypes.water);\r\n        }\r\n    }\r\n\r\n    const placeShip = (x, y, length, orientation = orientations.horizontal) => {\r\n        if (x < 0 || y < 0 || x >= 10 || y >= 10) return;\r\n        if (orientation === orientations.horizontal && (y + length) > 10) return;\r\n        if (orientation === orientations.vertical && (x + length) > 10) return;\r\n\r\n        const ship = Object(_ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(boardData.ships.length, length);\r\n        const shipWrapper = {\r\n            ship,\r\n            startCoords: {x, y},\r\n            orientation\r\n        }\r\n        if (shipWrapper.orientation === orientations.horizontal) {\r\n            \r\n            //check if any of the locations is occupied\r\n            for (let i = 0; i < length; i++) {\r\n                if (boardData.board[x][y + i] !== cellTypes.water) return;\r\n            }\r\n            //place the ship if all locations free\r\n            for (let i = 0; i < length; i++) {\r\n                boardData.board[x][y + i] = ship;\r\n            }\r\n            boardData.ships.push(shipWrapper);\r\n            return ship;\r\n            \r\n        } else {\r\n            //check if any of the locations is occupied\r\n            for (let i = 0; i < length; i++) {\r\n                if (boardData.board[x + i][y] !== cellTypes.water) return;\r\n            }\r\n            //place the ship if all locations free\r\n            for (let i = 0; i < length; i++) {\r\n                boardData.board[x + i][y] = ship;\r\n            }\r\n            boardData.ships.push(shipWrapper);\r\n            return ship;\r\n        }\r\n    }\r\n\r\n    function placeShipsRandomly() {\r\n        if (nShips() > 0) return;\r\n        let rowPairs = Object(_utilities__WEBPACK_IMPORTED_MODULE_1__[\"shuffleArray\"])([[3, 0], [2, 7], [5, 8], [4, 1], [6, 9]]);\r\n        let rows = [];\r\n        rowPairs.forEach(pair => rows.push(...pair));\r\n        let cols = Object(_utilities__WEBPACK_IMPORTED_MODULE_1__[\"shuffleArray\"])([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);\r\n        const sizes = [2, 2, 3, 4, 4];\r\n\r\n        for (let i of rows) {\r\n            for (let j of cols) {\r\n                const orientation = Math.random() < 0.5\r\n                    ? orientations.horizontal\r\n                    : orientations.vertical;\r\n                const size = sizes.pop()\r\n\r\n                const newShip = placeShip(i, j, size, orientation);\r\n                if (newShip) {\r\n                    cols = Object(_utilities__WEBPACK_IMPORTED_MODULE_1__[\"shuffleArray\"])(cols);\r\n                    break;\r\n                } else {\r\n                    sizes.push(size)\r\n                }\r\n            }\r\n            if (sizes.length === 0) return boardData.ships;\r\n        }\r\n    }\r\n\r\n    function _getHitIndex(ship, x, y) {\r\n        for (const shipWrapper of boardData.ships) {\r\n            if (shipWrapper.ship === ship) {\r\n                if (shipWrapper.orientation === orientations.horizontal) {\r\n                    return y - shipWrapper.startCoords.y;\r\n                } else {\r\n                    return x - shipWrapper.startCoords.x;\r\n                }\r\n            }\r\n        }\r\n    }\r\n\r\n    function _checkAllSunk() {\r\n        boardData.allSunk = boardData.ships.length === nSunk();\r\n        return boardData.allSunk;\r\n    }\r\n\r\n    const allSunk = () => boardData.allSunk;\r\n\r\n    const nSunk = () => \r\n        boardData.ships.filter(shipWrapper => shipWrapper.ship.isSunk() === true).length;\r\n\r\n    const nShips = () => boardData.ships.length;\r\n\r\n    const recieveAttack = (x, y) => {\r\n        if (x < 0 || y < 0 || x >= 10 || y >= 10) return;\r\n\r\n        let cell = boardData.board[x][y];\r\n        \r\n        if (cell === cellTypes.destroyed) return;\r\n        if (cell === cellTypes.water) {\r\n            boardData.board[x][y] = cellTypes.destroyed;\r\n            return cellTypes.water;\r\n        }\r\n\r\n        let ship = cell;\r\n        const isHit = ship.hit(_getHitIndex(ship, x, y));\r\n\r\n        if (!isHit) return;\r\n        if (ship.isSunk()) _checkAllSunk();\r\n        boardData.board[x][y] = cellTypes.destroyed;\r\n        return cellTypes.ship;\r\n    }\r\n\r\n    return { placeShip, placeShipsRandomly, recieveAttack, nSunk, allSunk, nShips }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Gameboard);\r\n\r\n\n\n//# sourceURL=webpack:///./src/factory-functions/gameboard.js?");

/***/ }),

/***/ "./src/factory-functions/ship.js":
/*!***************************************!*\
  !*** ./src/factory-functions/ship.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst Ship = function(_id, _length = 1) {\r\n    let _hitBoxes = [];\r\n    \r\n    for (let i = 0; i < _length; ++i) {\r\n        _hitBoxes.push(false);\r\n    }\r\n\r\n    const hit = index => {\r\n        if (index < 0 || index >= _hitBoxes.length) return;\r\n        if (_hitBoxes[index]) return false;\r\n        _hitBoxes[index] = true;\r\n        return true;\r\n    }\r\n\r\n    const isSunk = () => {\r\n        const sunkStatus = _hitBoxes.reduce((prev, curr) => prev && curr, true);\r\n        return sunkStatus;\r\n    }\r\n\r\n    const getID = () => _id;\r\n    const getLength = () => _length;\r\n\r\n    return { getID, getLength, hit, isSunk };\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Ship);\n\n//# sourceURL=webpack:///./src/factory-functions/ship.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _factory_functions_gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factory-functions/gameboard */ \"./src/factory-functions/gameboard.js\");\n/* harmony import */ var _dom_interface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom-interface */ \"./src/dom-interface.js\");\n/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utilities */ \"./src/utilities.js\");\n\r\n\r\n\r\n\r\nlet gameOver = false;\r\nconst playerBoard = Object(_factory_functions_gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\r\nconst computerBoard = Object(_factory_functions_gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\r\n\r\nconst playerDOMBoard = document.getElementById('player-board');\r\nconst computerDOMBoard = document.getElementById('computer-board');\r\n\r\n_dom_interface__WEBPACK_IMPORTED_MODULE_1__[\"default\"].createBoard(playerDOMBoard, handlePlayerClick);\r\n_dom_interface__WEBPACK_IMPORTED_MODULE_1__[\"default\"].createBoard(computerDOMBoard);\r\n\r\nconst playerShipCoords = [\r\n    { x: 0, y: 1, length: 4, orientation: _factory_functions_gameboard__WEBPACK_IMPORTED_MODULE_0__[\"orientations\"].vertical },\r\n    { x: 2, y: 8, length: 2 },\r\n    { x: 3, y: 3, length: 3 },\r\n    { x: 7, y: 6, length: 3, orientation: _factory_functions_gameboard__WEBPACK_IMPORTED_MODULE_0__[\"orientations\"].vertical },\r\n    { x: 9, y: 2, length: 2 }\r\n];\r\n\r\nfunction handlePlayerClick(e) {\r\n    if (gameOver) return;\r\n    const coords = e.target.getAttribute('data-xy').split(' ');\r\n    const hitType = playerBoard.recieveAttack(coords[0], coords[1]);\r\n    if (hitType !== _factory_functions_gameboard__WEBPACK_IMPORTED_MODULE_0__[\"cellTypes\"].water && hitType !== _factory_functions_gameboard__WEBPACK_IMPORTED_MODULE_0__[\"cellTypes\"].ship) return;\r\n    _dom_interface__WEBPACK_IMPORTED_MODULE_1__[\"default\"].markCellDestroyed(e.target);\r\n    if (playerBoard.nSunk() === 5) {\r\n        gameOver = true;\r\n        _dom_interface__WEBPACK_IMPORTED_MODULE_1__[\"default\"].declareWinner('player');\r\n        return;\r\n    }\r\n    !gameOver && Object(_utilities__WEBPACK_IMPORTED_MODULE_2__[\"makeRandomMove\"])(computerBoard);\r\n    if (computerBoard.nSunk() === 5) {\r\n        gameOver = true;\r\n        _dom_interface__WEBPACK_IMPORTED_MODULE_1__[\"default\"].declareWinner('computer');\r\n    }\r\n}\r\n\r\nplayerShipCoords.forEach(coord => {\r\n    const newShip = playerBoard.placeShip(coord.x, coord.y, coord.length, coord.orientation);\r\n    newShip && _dom_interface__WEBPACK_IMPORTED_MODULE_1__[\"default\"].placeShip(\r\n        newShip, coord.x, coord.y, coord.orientation, playerDOMBoard, handlePlayerClick\r\n    );\r\n});\r\n\r\nconst shipWrappers = computerBoard.placeShipsRandomly();\r\nshipWrappers.forEach(shipWrapper => {\r\n    _dom_interface__WEBPACK_IMPORTED_MODULE_1__[\"default\"].placeShip(\r\n        shipWrapper.ship, shipWrapper.startCoords.x,shipWrapper.startCoords.y,\r\n        shipWrapper.orientation, computerDOMBoard\r\n    );\r\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/utilities.js":
/*!**************************!*\
  !*** ./src/utilities.js ***!
  \**************************/
/*! exports provided: makeRandomMove, shuffleArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"makeRandomMove\", function() { return makeRandomMove; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"shuffleArray\", function() { return shuffleArray; });\n/* harmony import */ var _dom_interface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom-interface */ \"./src/dom-interface.js\");\n\r\n\r\nfunction shuffleArray(array) {\r\n    for (let i = array.length - 1; i > 0; i--) {\r\n        const j = Math.floor(Math.random() * (i + 1));\r\n        [array[i], array[j]] = [array[j], array[i]];\r\n    }\r\n    return array;\r\n}\r\nfunction makeRandomMove(gameboard) {\r\n    let rowIndices = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);\r\n    let colIndices = shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);\r\n\r\n    for (const i of rowIndices) {\r\n        for (const j of colIndices) {\r\n            const isHit = gameboard.recieveAttack(i, j);\r\n            if (isHit !== undefined) {\r\n                _dom_interface__WEBPACK_IMPORTED_MODULE_0__[\"default\"].markCellDestroyed(\r\n                    document.querySelector(`#computer-board > .cell[data-xy='${i} ${j}']`));\r\n                return isHit;\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/utilities.js?");

/***/ })

/******/ });