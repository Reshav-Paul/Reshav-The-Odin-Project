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

/***/ "./src/about.js":
/*!**********************!*\
  !*** ./src/about.js ***!
  \**********************/
/*! exports provided: aboutPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"aboutPage\", function() { return aboutPage; });\nconst aboutPage = (\r\n    function () {\r\n        function render() {\r\n            const contentDiv = document.getElementById('content');\r\n            contentDiv.innerHTML = '';\r\n\r\n            const aboutDiv = document.createElement('div');\r\n            aboutDiv.setAttribute('id', 'about-div');\r\n            aboutDiv.style.margin = '1rem 10vw';\r\n            const header = document.createElement('h1');\r\n            header.textContent = 'Food Tales';\r\n\r\n            const aboutInfo = document.createElement('p');\r\n            aboutInfo.textContent = \r\n            'Our first restaurant in what is now a global chain was set up with the idea of providing people a place to share their special moments and their stories while enjoying the best food so that the moment gets etched into their lives. We want to be a part of these historical moments in your lives. Special Food for that Special Occassion';\r\n            \r\n            const contactHeader = document.createElement('h3');\r\n            contactHeader.textContent = 'Contact';\r\n            const email = document.createElement('a');\r\n            email.setAttribute('href', 'mailto:paulrishav65@gmail.com');\r\n            email.textContent = 'Email';\r\n\r\n            const github = document.createElement('a');\r\n            github.setAttribute('href', 'https://www.github.com/Reshav-Paul');\r\n            github.textContent = 'Github';\r\n\r\n            aboutDiv.appendChild(header);\r\n            aboutDiv.appendChild(document.createElement('hr'));\r\n            aboutDiv.appendChild(aboutInfo);\r\n            aboutDiv.appendChild(contactHeader);\r\n            aboutDiv.appendChild(email);\r\n            aboutDiv.appendChild(github);\r\n            contentDiv.appendChild(aboutDiv);\r\n        }\r\n        return { render };\r\n    }\r\n)();\r\n\r\n\n\n//# sourceURL=webpack:///./src/about.js?");

/***/ }),

/***/ "./src/home.js":
/*!*********************!*\
  !*** ./src/home.js ***!
  \*********************/
/*! exports provided: homepage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"homepage\", function() { return homepage; });\nlet homepage = (\r\n    function () {\r\n        function _setTextContent(element, text) {\r\n            element.textContent = text;\r\n            return element;\r\n        }\r\n        function _getWelcomeMsg() {\r\n            let welcomeMsgDiv = document.createElement('div');\r\n            welcomeMsgDiv.setAttribute('id', 'welcome-msg');\r\n\r\n            welcomeMsgDiv.appendChild(\r\n                _setTextContent(document.createElement('h3'), 'Food Tales'\r\n                ));\r\n            welcomeMsgDiv.appendChild(\r\n                _setTextContent(document.createElement('strong'), 'Special Food'));\r\n            welcomeMsgDiv.appendChild(\r\n                _setTextContent(document.createElement('span'), ' for'));\r\n\r\n            welcomeMsgDiv.appendChild(document.createElement('br'));\r\n            welcomeMsgDiv.appendChild(\r\n                _setTextContent(document.createElement('span'),\r\n                    ' your special Occassion')\r\n            );\r\n            welcomeMsgDiv.appendChild(document.createElement('br'));\r\n            welcomeMsgDiv.appendChild(document.createElement('br'));\r\n\r\n            welcomeMsgDiv.appendChild(\r\n                _setTextContent(document.createElement('h5'),\r\n                    'Enjoy meals from the best chefs who pour in all their love')\r\n            );\r\n            welcomeMsgDiv.appendChild(\r\n                _setTextContent(document.createElement('h5'),\r\n                    ' and the right spices')\r\n            );\r\n\r\n            const orderButton = document.createElement('button');\r\n            orderButton.setAttribute('id', 'order-btn');\r\n            orderButton.textContent = 'Order Now';\r\n            welcomeMsgDiv.appendChild(orderButton);\r\n            return welcomeMsgDiv;\r\n        }\r\n\r\n        function _getSocialLinks() {\r\n            const links = document.createElement('ul');\r\n            links.setAttribute('id', 'social-links');\r\n            const linkTexts = ['Instagram', 'Twitter', 'Facebook'];\r\n            for (let i in linkTexts) {\r\n                const link = _setTextContent(document.createElement('a'), linkTexts[i]);\r\n                link.setAttribute('href', '#');\r\n                const linkListElement = document.createElement('li');\r\n                linkListElement.appendChild(link);\r\n                links.appendChild(linkListElement);\r\n            }\r\n            return links;\r\n        }\r\n\r\n        function render() {\r\n            const contentDiv = document.getElementById('content');\r\n            contentDiv.innerHTML = '';\r\n            contentDiv.appendChild(_getWelcomeMsg());\r\n            const bkImageDiv = document.createElement('div');\r\n            bkImageDiv.setAttribute('id', 'home-img');\r\n            contentDiv.appendChild(bkImageDiv);\r\n            contentDiv.appendChild(_getSocialLinks());\r\n        }\r\n        return { render };\r\n    }\r\n)();\r\n\r\n\n\n//# sourceURL=webpack:///./src/home.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.js */ \"./src/home.js\");\n/* harmony import */ var _menu_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu.js */ \"./src/menu.js\");\n/* harmony import */ var _location_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./location.js */ \"./src/location.js\");\n/* harmony import */ var _about_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./about.js */ \"./src/about.js\");\n\r\n\r\n\r\n\r\n\r\nconst tabSelectionHandler = (function () {\r\n    let _selectedTabID = '';\r\n    const _tabs = ['home-tab', 'menu-tab', 'loc-tab', 'about-tab'];\r\n    function initialize() {\r\n        _tabs.forEach(tab => \r\n            document.getElementById(tab).addEventListener('click', e => _toggleTabUnderline(tab)));\r\n        _toggleTabUnderline('home-tab');\r\n    }\r\n    function _toggleTabUnderline(id) {\r\n        if(id === _selectedTabID) return;\r\n        if(_selectedTabID.length > 0) {\r\n            document.querySelector(`#${_selectedTabID} a`).style['color'] = 'white';\r\n            _selectedTabID.length > 0 && document.querySelector(`#${_selectedTabID} .underline`).classList.add('invisible');\r\n        }\r\n        _selectedTabID = id;\r\n        document.querySelector(`#${_selectedTabID} .underline`).classList.remove('invisible');\r\n        document.querySelector(`#${_selectedTabID} a`).style['color'] = '#24b307';\r\n        _renderPage(_selectedTabID);\r\n    }\r\n    function _renderPage(id) {\r\n        if(id === _tabs[0])\r\n            _home_js__WEBPACK_IMPORTED_MODULE_0__[\"homepage\"].render();\r\n        else if(id === _tabs[1])\r\n            _menu_js__WEBPACK_IMPORTED_MODULE_1__[\"menupage\"].render();\r\n        else if(id === _tabs[2])\r\n            _location_js__WEBPACK_IMPORTED_MODULE_2__[\"locationPage\"].render();\r\n        else if(id === _tabs[3])\r\n            _about_js__WEBPACK_IMPORTED_MODULE_3__[\"aboutPage\"].render();\r\n    }\r\n\r\n    return { initialize };\r\n})();\r\n\r\ntabSelectionHandler.initialize();\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/location.js":
/*!*************************!*\
  !*** ./src/location.js ***!
  \*************************/
/*! exports provided: locationPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"locationPage\", function() { return locationPage; });\nconst locationFactory = function(_name, _address, _rating, _imageURL) {\r\n    const getName = () => _name;\r\n    const getAddress = () => _address;\r\n    const getRating = () => _rating;\r\n    const getImage = () => _imageURL;\r\n    return {getName, getAddress, getRating, getImage};\r\n}\r\n\r\nconst locationPage = (\r\n    function() {\r\n        function _setTextContent(element, text) {\r\n            element.textContent = text;\r\n            return element;\r\n        }\r\n        function _getCard(location) {\r\n            const card = document.createElement('div');\r\n            card.classList.add('card');\r\n\r\n            const infoDiv = document.createElement('div');\r\n            infoDiv.classList.add('loc-info');\r\n            infoDiv.style['background-image'] = `url(${location.getImage()})`;\r\n            infoDiv.appendChild(_setTextContent(document.createElement('p'), location.getName()));\r\n            infoDiv.appendChild(_setTextContent(document.createElement('p'), location.getAddress()));\r\n            infoDiv.appendChild(_setTextContent(document.createElement('p'), 'Rating - ' + location.getRating()));\r\n\r\n            card.appendChild(infoDiv)\r\n            return card;\r\n        }\r\n        function _getLocations() {\r\n            const locations = [\r\n                locationFactory('Kolkata', 'Park Street', 4.6, 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'),\r\n                locationFactory('San Francisco', 'Pacific Avenue', 4.4, 'https://cdn.pixabay.com/photo/2015/03/26/09/54/restaurant-690569_960_720.jpg'),\r\n                locationFactory('New York', 'Spring Street', 4.7, 'https://cdn.pixabay.com/photo/2014/09/17/20/26/restaurant-449952_960_720.jpg'),\r\n                locationFactory('Paris', 'Avenue Gabriel', 4.6, 'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),\r\n                locationFactory('Italy', 'Alberto Cadiolo', 4.6, 'https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),\r\n                locationFactory('London', 'Kensington Park Road', 4.8, 'https://cdn.pixabay.com/photo/2017/01/24/03/54/urban-2004494_960_720.jpg')\r\n            ];\r\n            return locations;\r\n        }\r\n        function render() {\r\n            const contentDiv = document.getElementById('content');\r\n            contentDiv.innerHTML = '';\r\n\r\n            const locationGrid = document.createElement('div');\r\n            locationGrid.setAttribute('id', 'loc-grid');\r\n            _getLocations().forEach(location => locationGrid.appendChild(_getCard(location)));\r\n            contentDiv.appendChild(locationGrid);\r\n        }\r\n        return { render };\r\n    }\r\n)();\r\n\r\n\n\n//# sourceURL=webpack:///./src/location.js?");

/***/ }),

/***/ "./src/menu.js":
/*!*********************!*\
  !*** ./src/menu.js ***!
  \*********************/
/*! exports provided: menupage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"menupage\", function() { return menupage; });\nlet menuClassFactory = function(_name, _imageURL, _items) {\r\n    const getName = () => _name;\r\n    const getImageUrl = () => _imageURL;\r\n    const getItems = () => _items;\r\n    return {getName, getItems, getImageUrl};\r\n}\r\nlet menuItemFactory = function(_name, _price) {\r\n    const getName = () => _name;\r\n    const getPrice = () => _price;\r\n    return {getName, getPrice};\r\n};\r\nlet menupage = (\r\n    function () {\r\n        function _setTextContent(element, text) {\r\n            element.textContent = text;\r\n            return element;\r\n        }\r\n        function getCard(menuItem) {\r\n            const card = document.createElement('div');\r\n            card.classList.add('card');\r\n            \r\n            const imageDiv = document.createElement('div');\r\n            imageDiv.style['background-image'] = `url(${menuItem.getImageUrl()})`;\r\n\r\n            const itemList = document.createElement('ul');\r\n\r\n            const menuHeader = document.createElement('h4');\r\n            menuHeader.textContent = menuItem.getName();\r\n            menuHeader.style['border-bottom'] = '1px solid #22910c';\r\n            menuHeader.style['margin-bottom'] = '0.5rem';\r\n            itemList.appendChild(menuHeader);\r\n\r\n            menuItem.getItems().forEach(item => itemList.appendChild(_setTextContent(document.createElement('li'), item.getName())));\r\n            \r\n            card.appendChild(imageDiv);\r\n            card.appendChild(itemList);\r\n            return card;\r\n        }\r\n        function _getMenu() {\r\n            const menu = [\r\n                menuClassFactory('Biryani', 'https://cdn.pixabay.com/photo/2015/07/14/17/18/briyani-845111_960_720.jpg',\r\n                    [\r\n                        menuItemFactory('Chicken Biryani', '$10'),\r\n                        menuItemFactory('Mutton Biryani', '$16'),\r\n                        menuItemFactory('Special Biryani', '$20')\r\n                    ]),\r\n\r\n                menuClassFactory('Steak', 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80',\r\n                    [menuItemFactory('Grilled Steak', '$14')]),\r\n\r\n                menuClassFactory('Sushi', 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',\r\n                    [\r\n                        menuItemFactory('Salmon Nigiri', '$25'),\r\n                        menuItemFactory('Tuna Nigiri', '$22'),\r\n                        menuItemFactory('Shrimp Nigiri', '$30'),\r\n                        menuItemFactory('Sashimi', '25'),\r\n                        menuItemFactory('Maki', '$25'),\r\n                        menuItemFactory('Temaki', '$20')\r\n                    ]),\r\n\r\n                menuClassFactory('Starters', 'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=633&q=80',\r\n                    [\r\n                        menuItemFactory('Meat Balls', '$15'),\r\n                        menuItemFactory('French Fries', '$8'),\r\n                        menuItemFactory('Chicken Kebab', '!8'),\r\n                        menuItemFactory('Mutton Kebab', '$25'),\r\n                        menuItemFactory('Pancakes', '$15')\r\n                    ]),\r\n\r\n                menuClassFactory('Brunch Combo', 'https://images.unsplash.com/photo-1460306855393-0410f61241c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80',\r\n                    [\r\n                        menuItemFactory('Burger + Noodles + Coke', '$35'),\r\n                        menuItemFactory('Burger + French Fries + Dessert', '$25'),\r\n                        menuItemFactory('Sandwich + Chicken Nuggets + Coke')\r\n                    ]),\r\n\r\n                menuClassFactory('Burgers', 'https://images.unsplash.com/photo-1521305916504-4a1121188589?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',\r\n                    [\r\n                        menuItemFactory('Regular Veg Burger', '12'),\r\n                        menuItemFactory('Chicken Burger', '$16'),\r\n                        menuItemFactory('Duo Burger', '$20 / $30'),\r\n                        menuItemFactory('Jumbo Burger', '$30')\r\n                    ]),\r\n\r\n                menuClassFactory('Pizza', 'https://images.unsplash.com/photo-1506354666786-959d6d497f1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',\r\n                    [\r\n                        menuItemFactory('Pepperoni Pizza', '$30'),\r\n                        menuItemFactory('Non Veg Deluxe', '45'),\r\n                        menuItemFactory('Mushroom Deluxe', '$40')\r\n                    ]),\r\n                    \r\n                menuClassFactory('Main Course', 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',\r\n                    [\r\n                        menuItemFactory('Mixed Fried Rice', '$25'),\r\n                        menuItemFactory('Chicken Fried Rice', '$18'),\r\n                        menuItemFactory('Veg Fried Rice', '$15'),\r\n                        menuItemFactory('Chilli Chicken', '$20'),\r\n                        menuItemFactory('Butter Chicken', '$25'),\r\n                        menuItemFactory('Mutton Curry', '$28'),\r\n                        menuItemFactory('Butter Paneer', '$15')\r\n                    ]),\r\n            ];\r\n            return menu;\r\n        }\r\n        function render() {\r\n            const contentDiv = document.getElementById('content');\r\n            contentDiv.innerHTML = '';\r\n\r\n            const menuGrid = document.createElement('div');\r\n            menuGrid.setAttribute('id', 'menu-grid');\r\n            \r\n            _getMenu().forEach(item => menuGrid.appendChild(getCard(item)));\r\n            contentDiv.appendChild(menuGrid);\r\n        }\r\n        return { render };\r\n    }\r\n)();\r\n\r\n\n\n//# sourceURL=webpack:///./src/menu.js?");

/***/ })

/******/ });