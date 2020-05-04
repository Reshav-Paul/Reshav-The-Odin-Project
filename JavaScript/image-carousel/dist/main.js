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

/***/ "./src/carousel.js":
/*!*************************!*\
  !*** ./src/carousel.js ***!
  \*************************/
/*! exports provided: createCarousel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createCarousel\", function() { return createCarousel; });\nfunction createCarousel(images) {\r\n    const carousel = document.createElement('div');\r\n    carousel.style.overflow = 'hidden';\r\n    carousel.style.position = 'relative';\r\n    carousel.style.height = '100%';\r\n    carousel.style.margin = '1rem';\r\n    carousel.style.display = 'flex';\r\n    carousel.classList.add('carousel');\r\n    let _currentIndex = 0;\r\n\r\n    function _getImage(src) {\r\n        const imageDiv = document.createElement('div');\r\n        imageDiv.setAttribute('class', 'carousel-image');\r\n        imageDiv.style.transition = '400ms';\r\n        imageDiv.style.backgroundImage = `url(${src})`;\r\n        imageDiv.style.backgroundSize = 'cover';\r\n        imageDiv.style.backgroundPosition = '50% 50%';\r\n        imageDiv.style.height = '100%';\r\n        imageDiv.style.minWidth = '100%';\r\n        return imageDiv;\r\n    }\r\n    function _applyButtonStyles(button) {\r\n        button.style.position = 'absolute';\r\n        button.style.top = '50%';\r\n        button.style.color = 'white';\r\n        button.style.height = '2rem';\r\n        button.style.width = '2rem';\r\n        button.style.borderRadius = '50%';\r\n        button.style.display = 'flex';\r\n        button.style.justifyContent = 'center';\r\n        button.style.alignItems = 'center';\r\n        button.style.fontWeight = 'bold';\r\n        button.style.fontSize = '1.3rem';\r\n        button.style.cursor = 'pointer';\r\n    }\r\n    function _getNavDot(index) {\r\n        const navDot = document.createElement('div');\r\n        navDot.classList.add('carousel-nav-dot');\r\n        index === 0 && navDot.classList.add('active');\r\n        navDot.style.height = '1rem';\r\n        navDot.style.width = '1rem';\r\n        navDot.style.margin = '0 1rem';\r\n        navDot.style.borderRadius = '50%';\r\n        navDot.style.background = index === 0? 'white' : 'black';\r\n        navDot.style.border = '2px solid white';\r\n        navDot.addEventListener('mouseup', () => {\r\n            if (index === _currentIndex) return;\r\n            _currentIndex = index;\r\n            _changeCurrentDot();\r\n            _changeMargin();\r\n        });\r\n        return navDot;\r\n    }\r\n    function _changeCurrentDot() {\r\n        const currentDot = document.querySelector('.carousel-nav-dot.active');\r\n        currentDot.classList.remove('active');\r\n        currentDot.style.background = 'black';\r\n\r\n        const newDot = document.querySelector(`.carousel-nav-dot:nth-child(${_currentIndex + 1})`);\r\n        newDot.classList.add('active');\r\n        newDot.style.backgroundColor = 'white';\r\n    }\r\n\r\n    function _nextImage() {\r\n        _currentIndex = (_currentIndex + 1) % images.length;\r\n        _changeCurrentDot();\r\n        _changeMargin();\r\n    }\r\n\r\n    function _previousImage() {\r\n        _currentIndex = _currentIndex === 0? (images.length - 1) : (_currentIndex - 1);\r\n        _changeCurrentDot();\r\n        _changeMargin();\r\n    }\r\n\r\n    function _changeMargin() {\r\n        const firstImage = document.querySelector('.carousel-image:first-child');\r\n        firstImage.style.marginLeft = `calc(${-(_currentIndex)} * 100%)`;\r\n    }\r\n\r\n    let _autoSwitchInterval;\r\n    function startAutoSwitch(ms = 5000) {\r\n        _autoSwitchInterval = setInterval(_nextImage, ms);\r\n    }\r\n\r\n    function stopAutoSwitch() {\r\n        clearInterval(_autoSwitchInterval);\r\n    }\r\n\r\n    const nextButton = document.createElement('i');\r\n    nextButton.classList.add('fa', 'fa-chevron-right');\r\n    nextButton.style.right = '1rem';\r\n    _applyButtonStyles(nextButton);\r\n    nextButton.addEventListener('click', _nextImage);\r\n\r\n    const previousButton = document.createElement('i');\r\n    previousButton.classList.add('fa', 'fa-chevron-left');\r\n\r\n    previousButton.style.left = '1rem';\r\n    _applyButtonStyles(previousButton);\r\n    previousButton.addEventListener('click', _previousImage);\r\n\r\n    const navDotsDiv = document.createElement('div');\r\n    navDotsDiv.style.position = 'absolute';\r\n    navDotsDiv.style.bottom = '1rem';\r\n    navDotsDiv.style.left = '50%';\r\n    navDotsDiv.style.transform = 'translateX(-50%)';\r\n    navDotsDiv.style.display = 'flex';\r\n    navDotsDiv.style.justifyContent = 'center';\r\n    navDotsDiv.style.alignItems = 'center';\r\n\r\n    let _dotIndex = 0;\r\n\r\n    images.forEach(image => {\r\n        carousel.appendChild(_getImage(image));\r\n        navDotsDiv.appendChild(_getNavDot(_dotIndex++));\r\n    });\r\n    \r\n    carousel.appendChild(previousButton);\r\n    carousel.appendChild(nextButton);\r\n    carousel.appendChild(navDotsDiv);\r\n\r\n    return {\r\n        carousel,\r\n        startAutoSwitch,\r\n        stopAutoSwitch,\r\n    };\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/carousel.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _carousel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./carousel.js */ \"./src/carousel.js\");\n\r\n\r\nconst carouselContainer = document.getElementById('carousel-container');\r\ncarouselContainer.style.height = '500px';\r\nconst carouselController = Object(_carousel_js__WEBPACK_IMPORTED_MODULE_0__[\"createCarousel\"])([\r\n    'https://cdn1-www.playstationlifestyle.net/assets/uploads/2020/05/ac-valhalla-god-of-war.jpg',\r\n    'https://cdn3-www.playstationlifestyle.net/assets/uploads/2020/04/BossLogic-AC-Valhalla-setting-art.jpg',\r\n    'https://cdn1-www.playstationlifestyle.net/assets/uploads/2020/05/ac-valhalla-warriors.jpg'\r\n]);\r\ncarouselContainer.appendChild(carouselController.carousel);\r\ncarouselController.startAutoSwitch(5000);\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });