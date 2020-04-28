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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DOMActions\", function() { return DOMActions; });\n/* harmony import */ var _models_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models.js */ \"./src/models.js\");\n/* harmony import */ var _datastore_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./datastore.js */ \"./src/datastore.js\");\n\r\n\r\n\r\nconst leftPaneActions = (\r\n    function () {\r\n        function _getProjectTile(project) {\r\n            const listElement = document.createElement('li');\r\n            listElement.classList.add('project');\r\n            listElement.setAttribute('data-id', project.getID());\r\n\r\n            const icon = document.createElement('i');\r\n            icon.classList.add('fa', 'fa-circle');\r\n            icon.style.color = 'grey';\r\n            listElement.appendChild(icon);\r\n\r\n            const nameSpan = document.createElement('span');\r\n            nameSpan.textContent = project.getName();\r\n            listElement.appendChild(nameSpan);\r\n\r\n            listElement.addEventListener('click', () => rightPaneActions.displayProject(project))\r\n            return listElement;\r\n        }\r\n        function removeProjectTile(project) {\r\n            const projectTile = document.querySelector(`.project[data-id='${project.getID()}']`);\r\n            projectTile && document.getElementById('project-list').removeChild(projectTile);\r\n        }\r\n        function addProjectTile(project) {\r\n            const projectList = document.getElementById('project-list');\r\n            projectList.appendChild(_getProjectTile(project));\r\n        }\r\n\r\n        return {\r\n            addProjectTile,\r\n            removeProjectTile\r\n        };\r\n    }\r\n)();\r\n\r\nconst rightPaneActions = (\r\n    function () {\r\n        const rightPane = document.getElementById('right-pane');\r\n\r\n        function _getPriorityColor(priority) {\r\n            if (priority === _models_js__WEBPACK_IMPORTED_MODULE_0__[\"priorities\"].low) return '#57aa57';\r\n            if (priority === _models_js__WEBPACK_IMPORTED_MODULE_0__[\"priorities\"].high) return '#dd7373';\r\n            return '#fae05c';\r\n        }\r\n        function _getTaskTile(task) {\r\n            const taskTile = document.createElement('div');\r\n            taskTile.classList.add('task-tile');\r\n\r\n            const icon = document.createElement('i');\r\n            icon.classList.add('fa', 'fa-circle');\r\n            icon.style.color = _getPriorityColor(task.getPriority());\r\n\r\n            const title = document.createElement('h4');\r\n            title.textContent = task.getName();\r\n\r\n            const date = document.createElement('span');\r\n            date.textContent = task.getDueDate();\r\n\r\n            const deleteIcon = document.createElement('i');\r\n            deleteIcon.classList.add('fa', 'fa-trash');\r\n            deleteIcon.addEventListener('mouseup', e => _taskTileDeleteHandler(task, taskTile));\r\n\r\n            const bookmarkIcon = document.createElement('i');\r\n            bookmarkIcon.classList.add('fa', 'fa-bookmark');\r\n            if (task.isBookmarked()) bookmarkIcon.style.color = 'goldenrod';\r\n            bookmarkIcon.addEventListener('mouseup', e => _taskTileBookmarkHandler(task, bookmarkIcon, taskTile));\r\n\r\n            taskTile.appendChild(icon);\r\n            taskTile.appendChild(title);\r\n            taskTile.appendChild(date);\r\n            taskTile.appendChild(deleteIcon);\r\n            taskTile.appendChild(bookmarkIcon);\r\n            return taskTile;\r\n        }\r\n\r\n        function _taskTileBookmarkHandler(task, bookmarkIcon, taskTile) {\r\n            if (task.isBookmarked()) {\r\n                task.setBookmark(false);\r\n                _datastore_js__WEBPACK_IMPORTED_MODULE_1__[\"bookmarks\"].deleteTask(task);\r\n                bookmarkIcon.style.color = 'black';\r\n                //check if the current page is the bookmarks page\r\n                if (document.getElementById('project-title').getAttribute('data-id') === '-1')\r\n                    rightPane.removeChild(taskTile);\r\n            } else {\r\n                task.setBookmark(true);\r\n                _datastore_js__WEBPACK_IMPORTED_MODULE_1__[\"bookmarks\"].addTask(task);\r\n                bookmarkIcon.style.color = 'goldenrod';\r\n            }\r\n        }\r\n\r\n        function _taskTileDeleteHandler(task, taskTile) {\r\n            _datastore_js__WEBPACK_IMPORTED_MODULE_1__[\"projectManager\"].removeTaskFromProject(\r\n                parseInt(document.getElementById('project-title').getAttribute('data-id')),\r\n                task\r\n            );\r\n            rightPane.removeChild(taskTile);\r\n        }\r\n\r\n        function displayProject(project) {\r\n            if (!project) return;\r\n            rightPane.innerHTML = '';\r\n            const headerDiv = document.createElement('div');\r\n            headerDiv.setAttribute('id', 'project-title');\r\n            headerDiv.setAttribute('data-id', project.getID());\r\n\r\n            const projectTitle = document.createElement('h3');\r\n            projectTitle.textContent = project.getName();\r\n            headerDiv.appendChild(projectTitle);\r\n\r\n            if (project.getID() > 0) {\r\n                const deleteIcon = document.createElement('i');\r\n                deleteIcon.classList.add('fa', 'fa-trash');\r\n                deleteIcon.style.fontSize = '1.4rem';\r\n                deleteIcon.addEventListener('mouseup', () => {\r\n                    leftPaneActions.removeProjectTile(project);\r\n                    displayProject(_datastore_js__WEBPACK_IMPORTED_MODULE_1__[\"projectManager\"].getProject(0));\r\n                    _datastore_js__WEBPACK_IMPORTED_MODULE_1__[\"projectManager\"].removeProject(project.getID());\r\n                    console.log(_datastore_js__WEBPACK_IMPORTED_MODULE_1__[\"projectManager\"].getProjects());\r\n                });\r\n                headerDiv.appendChild(deleteIcon);\r\n            }\r\n\r\n            rightPane.appendChild(headerDiv);\r\n            project.getTasks().forEach(task => rightPane.appendChild(_getTaskTile(task)));\r\n            if (project.getID() < 0) return;    //return if the project is Bookmarks\r\n\r\n            const newTaskDiv = document.createElement('div');\r\n            newTaskDiv.setAttribute('id', 'new-task');\r\n            const textSpan = document.createElement('span');\r\n            textSpan.textContent = 'Add new task';\r\n            const addIcon = document.createElement('i');\r\n            addIcon.classList.add('fa', 'fa-plus');\r\n            newTaskDiv.appendChild(textSpan);\r\n            newTaskDiv.appendChild(addIcon);\r\n\r\n            newTaskDiv.addEventListener('mouseup', displayNewTaskForm);\r\n            rightPane.appendChild(newTaskDiv);\r\n        }\r\n\r\n        function displayNewProjectForm() {\r\n            if (document.getElementById('new-project-form')) return;\r\n            const handler = function () {\r\n                const newProject = _datastore_js__WEBPACK_IMPORTED_MODULE_1__[\"projectManager\"].addProject(\r\n                    document.querySelector('#new-project-form input').value);\r\n                if (!newProject) return;\r\n                leftPaneActions.addProjectTile(newProject)\r\n                displayProject(_datastore_js__WEBPACK_IMPORTED_MODULE_1__[\"projectManager\"].getProject(-1));\r\n                removeInputForm();\r\n            };\r\n            const nameTextBox = document.createElement('input');\r\n            nameTextBox.setAttribute('type', 'text');\r\n            nameTextBox.classList.add('name');\r\n            createForm(\r\n                'Create new project',\r\n                'new-project-form',\r\n                [{ 'title': 'Name', 'element': nameTextBox }],\r\n                handler\r\n            );\r\n        }\r\n\r\n        function displayNewTaskForm() {\r\n            if (document.getElementById('new-task-form')) return;\r\n\r\n            const nameTextBox = document.createElement('input');\r\n            nameTextBox.setAttribute('type', 'text');\r\n            nameTextBox.classList.add('name');\r\n\r\n            const bookmarkIcon = document.createElement('i');\r\n            bookmarkIcon.classList.add('fa', 'fa-bookmark', 'bookmark-check');\r\n            bookmarkIcon.addEventListener('mouseup', e => {\r\n                e.target.classList.toggle('checked');\r\n            });\r\n\r\n            const dateBox = document.createElement('input');\r\n            dateBox.setAttribute('type', 'date');\r\n            dateBox.classList.add('date');\r\n\r\n            const priorityDropdown = document.createElement('select');\r\n            priorityDropdown.classList.add('priority');\r\n            const lowOption = document.createElement('option');\r\n            lowOption.setAttribute('value', 'low');\r\n            lowOption.textContent = 'Low';\r\n            const mediumOption = document.createElement('option');\r\n            mediumOption.setAttribute('value', 'medium');\r\n            mediumOption.textContent = 'medium';\r\n            const highOption = document.createElement('option');\r\n            highOption.setAttribute('value', 'high');\r\n            highOption.textContent = 'High';\r\n            priorityDropdown.appendChild(lowOption);\r\n            priorityDropdown.appendChild(mediumOption);\r\n            priorityDropdown.appendChild(highOption);\r\n\r\n            const handler = function () {\r\n                let checked = false;\r\n                if (bookmarkIcon.classList.contains('checked')) checked = true;\r\n                const newTask = _datastore_js__WEBPACK_IMPORTED_MODULE_1__[\"projectManager\"].addTaskToProject(\r\n                    parseInt(document.getElementById('project-title').getAttribute('data-id')),\r\n                    document.querySelector('#new-task-form .name').value,\r\n                    document.querySelector('#new-task-form .date').value,\r\n                    _models_js__WEBPACK_IMPORTED_MODULE_0__[\"priorities\"][document.querySelector('#new-task-form .priority').value],\r\n                    checked\r\n                );\r\n                if (!newTask) return;\r\n                rightPane.insertBefore(_getTaskTile(newTask), document.getElementById('new-task'));\r\n                removeInputForm();\r\n            };\r\n\r\n\r\n            createForm(\r\n                'Create new task',\r\n                'new-task-form',\r\n                [\r\n                    { 'title': 'Name', 'element': nameTextBox },\r\n                    { 'title': 'Bookmark', 'element': bookmarkIcon },\r\n                    { 'title': 'Due date', 'element': dateBox },\r\n                    { 'title': 'Priority', 'element': priorityDropdown }\r\n                ],\r\n                handler\r\n            );\r\n        }\r\n\r\n        function createForm(headerText, id, inputs, submitAction) {\r\n            if (document.getElementById(id)) return;\r\n            let fullScreenContainer = document.createElement('div');\r\n            fullScreenContainer.classList.add('fullscreen-container');\r\n\r\n            let form = document.createElement('div');\r\n            form.classList.add('input-form');\r\n            form.setAttribute('id', id);\r\n\r\n            let header = document.createElement('h3');\r\n            header.textContent = headerText;\r\n            form.appendChild(header);\r\n\r\n            for (const input of inputs) {\r\n                const inputDiv = document.createElement('div');\r\n                const inputLabel = document.createElement('label');\r\n                inputLabel.textContent = input.title;\r\n                inputDiv.appendChild(inputLabel);\r\n                inputDiv.appendChild(input.element);\r\n                form.appendChild(inputDiv);\r\n            }\r\n            let buttonRow = document.createElement('div');\r\n\r\n            let createButton = document.createElement('button');\r\n            createButton.textContent = 'Create';\r\n            createButton.addEventListener('mouseup', submitAction);\r\n\r\n            let cancelButton = document.createElement('button');\r\n            cancelButton.textContent = 'Cancel';\r\n            cancelButton.addEventListener('mouseup', removeInputForm);\r\n\r\n            buttonRow.appendChild(cancelButton);\r\n            buttonRow.appendChild(createButton);\r\n\r\n            form.appendChild(buttonRow);\r\n            fullScreenContainer.appendChild(form);\r\n            rightPane.appendChild(fullScreenContainer);\r\n        }\r\n        function removeInputForm() {\r\n            document.querySelector('.fullscreen-container > .input-form') &&\r\n                rightPane.removeChild(rightPane.lastChild);\r\n        }\r\n\r\n        return { displayProject, displayNewProjectForm, removeInputForm };\r\n    }\r\n)();\r\n\r\nconst DOMActions = {\r\n    leftPaneActions,\r\n    rightPaneActions\r\n};\r\n\r\n\n\n//# sourceURL=webpack:///./src/DOMActions.js?");

/***/ }),

/***/ "./src/datastore.js":
/*!**************************!*\
  !*** ./src/datastore.js ***!
  \**************************/
/*! exports provided: bookmarks, projectManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"bookmarks\", function() { return bookmarks; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"projectManager\", function() { return projectManager; });\n/* harmony import */ var _models_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models.js */ \"./src/models.js\");\n\r\n\r\nconst projectManager = (\r\n    function () {\r\n        let _projects = [];\r\n        let id = 0;\r\n\r\n        function addProject(name, date = '') {\r\n            if (!name || name.length === 0) return;\r\n            const newProject = Object(_models_js__WEBPACK_IMPORTED_MODULE_0__[\"projectFactory\"])(id, name, date);\r\n            ++id;\r\n            _projects.push(newProject);\r\n            return newProject;\r\n        }\r\n\r\n        function removeProject(id) {\r\n            if (!id) return;\r\n            for (const project of _projects) {\r\n                if (project.getID() === id) {\r\n                    _projects.splice(_projects.indexOf(project), 1);\r\n                }\r\n            }\r\n        }\r\n\r\n        function getProject(index) {\r\n            if (!Number.isInteger(index)) return;\r\n            return index < 0 ? _projects[_projects.length + index] : _projects[index];\r\n        }\r\n        const getProjects = () => _projects;\r\n\r\n        function addTaskToProject(projectID, taskName, taskDueDate = '', priority = _models_js__WEBPACK_IMPORTED_MODULE_0__[\"priorities\"].medium, isBookmarked = false) {\r\n            let selectedProject = getProject(projectID);\r\n            selectedProject.addTask(Object(_models_js__WEBPACK_IMPORTED_MODULE_0__[\"taskFactory\"])(taskName, taskDueDate, priority, isBookmarked));\r\n            const task = selectedProject.getTasks().slice(-1)[0];\r\n            if(isBookmarked) bookmarks.addTask(task);\r\n            return task;\r\n        }\r\n\r\n        function removeTaskFromProject(projectID, task) {\r\n            if(projectID < 0) {\r\n                bookmarks.deleteTask(task);\r\n                _projects.forEach(project => project.deleteTask(task));\r\n                return;\r\n            }\r\n            let selectedProject = getProject(projectID);\r\n            selectedProject.deleteTask(task);\r\n            task.isBookmarked && bookmarks.deleteTask(task);\r\n        }\r\n\r\n        let defaultProject = addProject('Default', '23/04/2020');\r\n        defaultProject.addTask(Object(_models_js__WEBPACK_IMPORTED_MODULE_0__[\"taskFactory\"])('Welcome to Got Todo', '', _models_js__WEBPACK_IMPORTED_MODULE_0__[\"priorities\"].low, true));\r\n\r\n        return { addProject, removeProject, getProject, getProjects, addTaskToProject, removeTaskFromProject };\r\n    }\r\n)();\r\n\r\nconst bookmarks = Object(_models_js__WEBPACK_IMPORTED_MODULE_0__[\"projectFactory\"])(-1, 'Bookmarks');\r\nfor (let project of projectManager.getProjects()) {\r\n    for (let task of project.getTasks()) {\r\n        task.isBookmarked() === true && bookmarks.addTask(task);\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./src/datastore.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _datastore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datastore.js */ \"./src/datastore.js\");\n/* harmony import */ var _DOMActions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DOMActions.js */ \"./src/DOMActions.js\");\n\r\n\r\n\r\nconst defaultProject = _datastore_js__WEBPACK_IMPORTED_MODULE_0__[\"projectManager\"].getProject(0);\r\n_DOMActions_js__WEBPACK_IMPORTED_MODULE_1__[\"DOMActions\"].leftPaneActions.addProjectTile(defaultProject);\r\n\r\n_DOMActions_js__WEBPACK_IMPORTED_MODULE_1__[\"DOMActions\"].rightPaneActions.displayProject(defaultProject);\r\ndocument.getElementById('bookmarks').addEventListener(\r\n    'click', () => _DOMActions_js__WEBPACK_IMPORTED_MODULE_1__[\"DOMActions\"].rightPaneActions.displayProject(_datastore_js__WEBPACK_IMPORTED_MODULE_0__[\"bookmarks\"]));\r\n\r\ndocument.getElementById('add-project').addEventListener(\r\n    'click', () => _DOMActions_js__WEBPACK_IMPORTED_MODULE_1__[\"DOMActions\"].rightPaneActions.displayNewProjectForm());\r\n\r\ndocument.getElementById('left-pane').addEventListener(\r\n    'click', _DOMActions_js__WEBPACK_IMPORTED_MODULE_1__[\"DOMActions\"].rightPaneActions.removeInputForm);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/models.js":
/*!***********************!*\
  !*** ./src/models.js ***!
  \***********************/
/*! exports provided: projectFactory, taskFactory, priorities */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"projectFactory\", function() { return projectFactory; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"taskFactory\", function() { return taskFactory; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"priorities\", function() { return priorities; });\nconst taskFactory = function(_name, _dueDate, _priority, _isBookmarked) {\r\n    let _description = '';\r\n    let _isComplete = false;\r\n    const setBookmark = value => _isBookmarked = value;\r\n    const setCompletion = value => _isComplete = value;\r\n    const setDescription = text => _description = text;\r\n    const setName = name => _name = name;\r\n    const setDueDate = date => _dueDate = date;\r\n    const setPriority = value => _priority = value;\r\n\r\n    const isBookmarked = () => _isBookmarked;\r\n    const getCompletion = () => _isComplete;\r\n    const getDescription = () => _description;\r\n    const getName = () => _name;\r\n    const getDueDate = () => _dueDate;\r\n    const getPriority = () => _priority;\r\n\r\n    return {\r\n        setBookmark,\r\n        setCompletion,\r\n        setDescription,\r\n        setDueDate,\r\n        setPriority,\r\n        setName,\r\n        isBookmarked,\r\n        getCompletion,\r\n        getDescription,\r\n        getDueDate,\r\n        getPriority,\r\n        getName\r\n    };\r\n};\r\n\r\nconst projectFactory = function(_id, _name, _creationDate = '') {\r\n    let _tasks = [];\r\n    const addTask = todo => _tasks.push(todo);\r\n    const deleteTask = todo => _tasks = _tasks.filter(e => e !== todo);\r\n    const getTasks = () => _tasks;\r\n    const setName = name => _name = name;\r\n    const setCreationDate = date => _creationDate = date;\r\n    const getName = () => _name;\r\n    const getCreationDate = () => _creationDate;\r\n    const getID = () => _id;\r\n\r\n    return {\r\n        getID,\r\n        addTask,\r\n        deleteTask,\r\n        getTasks,\r\n        setName,\r\n        setCreationDate,\r\n        getName,\r\n        getCreationDate\r\n    };\r\n}\r\n\r\nconst priorities = Object.freeze({'low': 0, 'medium': 1, 'high': 2});\r\n\r\n\n\n//# sourceURL=webpack:///./src/models.js?");

/***/ })

/******/ });