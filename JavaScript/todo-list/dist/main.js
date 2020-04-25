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

/***/ "./src/DOMActions.js":
/*!***************************!*\
  !*** ./src/DOMActions.js ***!
  \***************************/
/*! exports provided: DOMActions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DOMActions\", function() { return DOMActions; });\n/* harmony import */ var _models_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models.js */ \"./src/models.js\");\n\r\n\r\nconst leftPaneActions = (\r\n    function () {\r\n        function _getProjectTile(project) {\r\n            const listElement = document.createElement('li');\r\n            listElement.classList.add('project');\r\n\r\n            const icon = document.createElement('i');\r\n            icon.classList.add('fa', 'fa-circle');\r\n            icon.style.color = 'grey';\r\n            listElement.appendChild(icon);\r\n\r\n            const nameSpan = document.createElement('span');\r\n            nameSpan.textContent = project.getName();\r\n            listElement.appendChild(nameSpan);\r\n\r\n            listElement.addEventListener('click', () => rightPaneActions.displayProject(project))\r\n            return listElement;\r\n        }\r\n        function addProjectTile(project) {\r\n            const projectList = document.getElementById('project-list');\r\n            projectList.appendChild(_getProjectTile(project));\r\n        }\r\n\r\n        return {\r\n            addProjectTile\r\n        };\r\n    }\r\n)();\r\n\r\nconst rightPaneActions = (\r\n    function () {\r\n        const rightPane = document.getElementById('right-pane');\r\n\r\n        function _getPriorityColor(priority) {\r\n            if (priority === _models_js__WEBPACK_IMPORTED_MODULE_0__[\"priorities\"].low) return '#57aa57';\r\n            if (priority === _models_js__WEBPACK_IMPORTED_MODULE_0__[\"priorities\"].high) return '#dd7373';\r\n            return '#fae05c';\r\n        }\r\n        function _getTaskTile(task) {\r\n            const taskTile = document.createElement('div');\r\n            taskTile.classList.add('task-tile');\r\n\r\n            const icon = document.createElement('i');\r\n            icon.classList.add('fa', 'fa-circle');\r\n            icon.style.color = _getPriorityColor(task.getPriority());\r\n\r\n            const title = document.createElement('h4');\r\n            title.textContent = task.getName();\r\n\r\n            const date = document.createElement('span');\r\n            date.textContent = task.getDueDate();\r\n\r\n            taskTile.appendChild(icon);\r\n            taskTile.appendChild(title);\r\n            taskTile.appendChild(date);\r\n            return taskTile;\r\n        }\r\n\r\n        function displayProject(project) {\r\n            rightPane.innerHTML = '';\r\n            const projectTitle = document.createElement('h3');\r\n            projectTitle.setAttribute('id', 'project-title');\r\n            projectTitle.textContent = project.getName();\r\n\r\n            rightPane.appendChild(projectTitle);\r\n            project.getTasks().forEach(task => rightPane.appendChild(_getTaskTile(task)));\r\n        }\r\n\r\n        return { displayProject };\r\n    }\r\n)();\r\n\r\nconst DOMActions = {\r\n    leftPaneActions,\r\n    rightPaneActions\r\n};\r\n\r\n\n\n//# sourceURL=webpack:///./src/DOMActions.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models.js */ \"./src/models.js\");\n/* harmony import */ var _DOMActions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOMActions.js */ \"./src/DOMActions.js\");\n\r\n\r\n\r\n\r\nconst defaultProject = Object(_models_js__WEBPACK_IMPORTED_MODULE_0__[\"projectFactory\"])('Default', '23/04/2020');\r\nconst collegeProject = Object(_models_js__WEBPACK_IMPORTED_MODULE_0__[\"projectFactory\"])('College', '24/04/2020');\r\n\r\n_DOMActions_js__WEBPACK_IMPORTED_MODULE_1__[\"DOMActions\"].leftPaneActions.addProjectTile(defaultProject);\r\n_DOMActions_js__WEBPACK_IMPORTED_MODULE_1__[\"DOMActions\"].leftPaneActions.addProjectTile(collegeProject);\r\n\r\nlet task1 = Object(_models_js__WEBPACK_IMPORTED_MODULE_0__[\"taskFactory\"])('Task 1', '30/04/2020', _models_js__WEBPACK_IMPORTED_MODULE_0__[\"priorities\"].high);\r\ntask1.setBookmark(true);\r\nlet task2 = Object(_models_js__WEBPACK_IMPORTED_MODULE_0__[\"taskFactory\"])('Task 2', '28/04/2020', _models_js__WEBPACK_IMPORTED_MODULE_0__[\"priorities\"].low);\r\nlet task3 = Object(_models_js__WEBPACK_IMPORTED_MODULE_0__[\"taskFactory\"])('Task 3', '02/05/2020', _models_js__WEBPACK_IMPORTED_MODULE_0__[\"priorities\"].medium);\r\nlet task4 = Object(_models_js__WEBPACK_IMPORTED_MODULE_0__[\"taskFactory\"])('Task 4', '29/04/2020', _models_js__WEBPACK_IMPORTED_MODULE_0__[\"priorities\"].low);\r\ntask4.setBookmark(true);\r\n\r\ndefaultProject.addTask(task1);\r\ndefaultProject.addTask(task2);\r\ncollegeProject.addTask(task3);\r\ncollegeProject.addTask(task4);\r\n\r\n_DOMActions_js__WEBPACK_IMPORTED_MODULE_1__[\"DOMActions\"].rightPaneActions.displayProject(defaultProject);\r\n\r\nlet projects = [defaultProject, collegeProject];\r\n\r\nconst bookmarks = Object(_models_js__WEBPACK_IMPORTED_MODULE_0__[\"projectFactory\"])('Bookmarks');\r\nfor (let project of projects) {\r\n    for(let task of project.getTasks()) {\r\n        task.getBookmark() === true && bookmarks.addTask(task);\r\n    }\r\n}\r\ndocument.getElementById('bookmarks')\r\n    .addEventListener('click', () => _DOMActions_js__WEBPACK_IMPORTED_MODULE_1__[\"DOMActions\"].rightPaneActions.displayProject(bookmarks));\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/models.js":
/*!***********************!*\
  !*** ./src/models.js ***!
  \***********************/
/*! exports provided: projectFactory, taskFactory, priorities */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"projectFactory\", function() { return projectFactory; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"taskFactory\", function() { return taskFactory; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"priorities\", function() { return priorities; });\nconst taskFactory = function(_name, _dueDate, _priority) {\r\n    let _description = '';\r\n    let _isComplete = false;\r\n    let _isBookmarked = false;\r\n    const setBookmark = value => _isBookmarked = value;\r\n    const setCompletion = value => _isComplete = value;\r\n    const setDescription = text => _description = text;\r\n    const setName = name => _name = name;\r\n    const setDueDate = date => _dueDate = date;\r\n    const setPriority = value => _priority = value;\r\n\r\n    const getBookmark = () => _isBookmarked;\r\n    const getCompletion = () => _isComplete;\r\n    const getDescription = () => _description;\r\n    const getName = () => _name;\r\n    const getDueDate = () => _dueDate;\r\n    const getPriority = () => _priority;\r\n\r\n    return {\r\n        setBookmark,\r\n        setCompletion,\r\n        setDescription,\r\n        setDueDate,\r\n        setPriority,\r\n        setName,\r\n        getBookmark,\r\n        getCompletion,\r\n        getDescription,\r\n        getDueDate,\r\n        getPriority,\r\n        getName\r\n    };\r\n};\r\n\r\nconst projectFactory = function(_name, _creationDate = undefined) {\r\n    let _tasks = [];\r\n    const addTask = todo => _tasks.push(todo);\r\n    const deleteTask = todo => _tasks = todos.filter(e => e !== todo);\r\n    const getTasks = () => _tasks;\r\n    const setName = name => _name = name;\r\n    const setCreationDate = date => _creationDate = date;\r\n    const getName = () => _name;\r\n    const getCreationDate = () => _creationDate;\r\n\r\n    return {\r\n        addTask,\r\n        deleteTask,\r\n        getTasks,\r\n        setName,\r\n        setCreationDate,\r\n        getName,\r\n        getCreationDate\r\n    };\r\n}\r\n\r\nconst priorities = Object.freeze({'low': 0, 'medium': 1, 'high': 2});\r\n\r\n\n\n//# sourceURL=webpack:///./src/models.js?");

/***/ })

/******/ });