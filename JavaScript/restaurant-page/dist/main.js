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

/***/ "./src/home.js":
/*!*********************!*\
  !*** ./src/home.js ***!
  \*********************/
/*! exports provided: homepage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"homepage\", function() { return homepage; });\nlet homepage = (\r\n    function () {\r\n        function _setTextContent(element, text) {\r\n            element.textContent = text;\r\n            return element;\r\n        }\r\n        function _getWelcomeMsg() {\r\n            let welcomeMsgDiv = document.createElement('div');\r\n            welcomeMsgDiv.setAttribute('id', 'welcome-msg');\r\n\r\n            welcomeMsgDiv.appendChild(\r\n                _setTextContent(document.createElement('h3'), 'Food Tales'\r\n            ));\r\n            welcomeMsgDiv.appendChild(\r\n                _setTextContent(document.createElement('strong'), 'Special Food'));\r\n            welcomeMsgDiv.appendChild(\r\n                _setTextContent(document.createElement('span'), ' for'));\r\n                \r\n            welcomeMsgDiv.appendChild(document.createElement('br'));\r\n            welcomeMsgDiv.appendChild(\r\n                _setTextContent(document.createElement('span'),\r\n                ' your special Occassion')\r\n            );\r\n            welcomeMsgDiv.appendChild(document.createElement('br'));\r\n            welcomeMsgDiv.appendChild(document.createElement('br'));\r\n\r\n            welcomeMsgDiv.appendChild(\r\n                _setTextContent(document.createElement('h5'),\r\n                'Enjoy meals from the best chefs who pour in all their love')\r\n            );\r\n            welcomeMsgDiv.appendChild(\r\n                _setTextContent(document.createElement('h5'),\r\n                ' and the right spices')\r\n            );\r\n\r\n            const orderButton = document.createElement('button');\r\n            orderButton.setAttribute('id', 'order-btn');\r\n            orderButton.textContent = 'Order Now';\r\n            welcomeMsgDiv.appendChild(orderButton);\r\n            return welcomeMsgDiv;\r\n        }\r\n\r\n        function _getSocialLinks() {\r\n            const links = document.createElement('ul');\r\n            links.setAttribute('id', 'social-links');\r\n            const linkTexts = ['Instagram', 'Twitter', 'Facebook'];\r\n            for (let i in linkTexts) {\r\n                const link = _setTextContent(document.createElement('a'), linkTexts[i]);\r\n                link.setAttribute('href', '#');\r\n                const linkListElement = document.createElement('li');\r\n                linkListElement.appendChild(link);\r\n                links.appendChild(linkListElement);\r\n            }\r\n            return links;\r\n        }\r\n\r\n        function render() {\r\n            const contentDiv = document.getElementById('content');\r\n            contentDiv.appendChild(_getWelcomeMsg());\r\n            const bkImageDiv = document.createElement('div');\r\n            bkImageDiv.setAttribute('id', 'home-img');\r\n            contentDiv.appendChild(bkImageDiv);\r\n            contentDiv.appendChild(_getSocialLinks());\r\n        }\r\n        return { render };\r\n    }\r\n)();\r\n\r\n\n\n//# sourceURL=webpack:///./src/home.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.js */ \"./src/home.js\");\n\r\n\r\nconst tabSelectionHandler = (function () {\r\n    let _selectedTabID = 'home-tab';\r\n    function initialize() {\r\n        document.getElementById('home-tab').addEventListener('click', e => _toggleTabUnderline('home-tab'));\r\n        document.getElementById('menu-tab').addEventListener('click', e => _toggleTabUnderline('menu-tab'));\r\n        document.getElementById('loc-tab').addEventListener('click', e => _toggleTabUnderline('loc-tab'));\r\n        document.getElementById('order-tab').addEventListener('click', e => _toggleTabUnderline('order-tab'));\r\n        document.getElementById('about-tab').addEventListener('click', e => _toggleTabUnderline('about-tab'));\r\n    }\r\n    function _toggleTabUnderline(id) {\r\n        document.querySelector(`#${_selectedTabID} .underline`).classList.add('invisible');\r\n        document.querySelector(`#${id} .underline`).classList.remove('invisible');\r\n        _selectedTabID = id;\r\n    }\r\n\r\n    return { initialize };\r\n})();\r\n\r\ntabSelectionHandler.initialize();\r\n_home_js__WEBPACK_IMPORTED_MODULE_0__[\"homepage\"].render();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });