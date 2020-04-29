import { priorities } from './models.js';
import { projectManager, bookmarks, localStorageManager } from './datastore.js';

const leftPaneActions = (
    function () {
        function _getProjectTile(project) {
            const listElement = document.createElement('li');
            listElement.classList.add('project');
            listElement.setAttribute('data-id', project.getID());

            const icon = document.createElement('i');
            icon.classList.add('fa', 'fa-circle');
            icon.style.color = 'grey';
            listElement.appendChild(icon);

            const nameSpan = document.createElement('span');
            nameSpan.textContent = project.getName();
            listElement.appendChild(nameSpan);

            listElement.addEventListener('click', () => rightPaneActions.displayProject(project))
            return listElement;
        }
        function removeProjectTile(project) {
            const projectTile = document.querySelector(`.project[data-id='${project.getID()}']`);
            projectTile && document.getElementById('project-list').removeChild(projectTile);
        }
        function addProjectTile(project) {
            const projectList = document.getElementById('project-list');
            projectList.appendChild(_getProjectTile(project));
        }

        return {
            addProjectTile,
            removeProjectTile
        };
    }
)();

const rightPaneActions = (
    function () {
        const rightPane = document.getElementById('right-pane');

        function _getPriorityColor(priority) {
            if (priority === priorities.low) return '#57aa57';
            if (priority === priorities.high) return '#dd7373';
            return '#fae05c';
        }
        function _getTaskTile(task) {
            const taskTile = document.createElement('div');
            taskTile.classList.add('task-tile');

            const icon = document.createElement('i');
            icon.classList.add('fa', 'fa-circle');
            icon.style.color = _getPriorityColor(task.getPriority());

            const title = document.createElement('h4');
            title.textContent = task.getName();

            const date = document.createElement('span');
            date.textContent = task.getDueDate();

            const deleteIcon = document.createElement('i');
            deleteIcon.classList.add('fa', 'fa-trash');
            deleteIcon.addEventListener('mouseup', e => _taskTileDeleteHandler(task, taskTile));

            const bookmarkIcon = document.createElement('i');
            bookmarkIcon.classList.add('fa', 'fa-bookmark');
            if (task.isBookmarked()) bookmarkIcon.style.color = 'goldenrod';
            bookmarkIcon.addEventListener('mouseup', e => _taskTileBookmarkHandler(task, bookmarkIcon, taskTile));

            taskTile.appendChild(icon);
            taskTile.appendChild(title);
            taskTile.appendChild(date);
            taskTile.appendChild(deleteIcon);
            taskTile.appendChild(bookmarkIcon);
            return taskTile;
        }

        function _taskTileBookmarkHandler(task, bookmarkIcon, taskTile) {
            let projectID = parseInt(document.getElementById('project-title').getAttribute('data-id'));
            if (task.isBookmarked()) {
                task.setBookmark(false);
                bookmarks.deleteTask(task);
                bookmarkIcon.style.color = 'black';
                //check if the current page is the bookmarks page
                if (projectID === -1){
                    rightPane.removeChild(taskTile);
                    projectManager.getProjects().forEach(project => {
                        project.getTasks().forEach(t => {
                            if (t === task) projectID = project.getID();
                        });
                    });
                }
            } else {
                task.setBookmark(true);
                bookmarks.addTask(task);
                bookmarkIcon.style.color = 'goldenrod';
            }
            console.log(projectID);
            projectID >= 0 && localStorageManager.addProject(projectManager.getProject(projectID));
        }

        function _taskTileDeleteHandler(task, taskTile) {
            projectManager.removeTaskFromProject(
                parseInt(document.getElementById('project-title').getAttribute('data-id')),
                task
            );
            rightPane.removeChild(taskTile);
        }

        function displayProject(project) {
            if (!project) return;
            rightPane.innerHTML = '';
            const headerDiv = document.createElement('div');
            headerDiv.setAttribute('id', 'project-title');
            headerDiv.setAttribute('data-id', project.getID());

            const projectTitle = document.createElement('h3');
            projectTitle.textContent = project.getName();
            headerDiv.appendChild(projectTitle);

            if (project.getID() > 0) {
                const deleteIcon = document.createElement('i');
                deleteIcon.classList.add('fa', 'fa-trash');
                deleteIcon.style.fontSize = '1.4rem';
                deleteIcon.addEventListener('mouseup', () => {
                    leftPaneActions.removeProjectTile(project);
                    displayProject(projectManager.getProject(0));
                    projectManager.removeProject(project.getID());
                    console.log(projectManager.getProjects());
                });
                headerDiv.appendChild(deleteIcon);
            }

            rightPane.appendChild(headerDiv);
            project.getTasks().forEach(task => rightPane.appendChild(_getTaskTile(task)));
            if (project.getID() < 0) return;    //return if the project is Bookmarks

            const newTaskDiv = document.createElement('div');
            newTaskDiv.setAttribute('id', 'new-task');
            const textSpan = document.createElement('span');
            textSpan.textContent = 'Add new task';
            const addIcon = document.createElement('i');
            addIcon.classList.add('fa', 'fa-plus');
            newTaskDiv.appendChild(textSpan);
            newTaskDiv.appendChild(addIcon);

            newTaskDiv.addEventListener('mouseup', displayNewTaskForm);
            rightPane.appendChild(newTaskDiv);
        }

        function displayNewProjectForm() {
            if (document.getElementById('new-project-form')) return;
            const handler = function () {
                const newProject = projectManager.addProject(
                    document.querySelector('#new-project-form input').value);
                if (!newProject) return;
                leftPaneActions.addProjectTile(newProject)
                displayProject(projectManager.getProject(-1));
                removeInputForm();
            };
            const nameTextBox = document.createElement('input');
            nameTextBox.setAttribute('type', 'text');
            nameTextBox.classList.add('name');
            createForm(
                'Create new project',
                'new-project-form',
                [{ 'title': 'Name', 'element': nameTextBox }],
                handler
            );
        }

        function displayNewTaskForm() {
            if (document.getElementById('new-task-form')) return;

            const nameTextBox = document.createElement('input');
            nameTextBox.setAttribute('type', 'text');
            nameTextBox.classList.add('name');

            const bookmarkIcon = document.createElement('i');
            bookmarkIcon.classList.add('fa', 'fa-bookmark', 'bookmark-check');
            bookmarkIcon.addEventListener('mouseup', e => {
                e.target.classList.toggle('checked');
            });

            const dateBox = document.createElement('input');
            dateBox.setAttribute('type', 'date');
            dateBox.classList.add('date');

            const priorityDropdown = document.createElement('select');
            priorityDropdown.classList.add('priority');
            const lowOption = document.createElement('option');
            lowOption.setAttribute('value', 'low');
            lowOption.textContent = 'Low';
            const mediumOption = document.createElement('option');
            mediumOption.setAttribute('value', 'medium');
            mediumOption.textContent = 'medium';
            const highOption = document.createElement('option');
            highOption.setAttribute('value', 'high');
            highOption.textContent = 'High';
            priorityDropdown.appendChild(lowOption);
            priorityDropdown.appendChild(mediumOption);
            priorityDropdown.appendChild(highOption);

            const handler = function () {
                let checked = false;
                if (bookmarkIcon.classList.contains('checked')) checked = true;
                const newTask = projectManager.addTaskToProject(
                    parseInt(document.getElementById('project-title').getAttribute('data-id')),
                    document.querySelector('#new-task-form .name').value,
                    document.querySelector('#new-task-form .date').value,
                    priorities[document.querySelector('#new-task-form .priority').value],
                    checked
                );
                if (!newTask) return;
                rightPane.insertBefore(_getTaskTile(newTask), document.getElementById('new-task'));
                removeInputForm();
            };


            createForm(
                'Create new task',
                'new-task-form',
                [
                    { 'title': 'Name', 'element': nameTextBox },
                    { 'title': 'Bookmark', 'element': bookmarkIcon },
                    { 'title': 'Due date', 'element': dateBox },
                    { 'title': 'Priority', 'element': priorityDropdown }
                ],
                handler
            );
        }

        function createForm(headerText, id, inputs, submitAction) {
            if (document.getElementById(id)) return;
            let fullScreenContainer = document.createElement('div');
            fullScreenContainer.classList.add('fullscreen-container');

            let form = document.createElement('div');
            form.classList.add('input-form');
            form.setAttribute('id', id);

            let header = document.createElement('h3');
            header.textContent = headerText;
            form.appendChild(header);

            for (const input of inputs) {
                const inputDiv = document.createElement('div');
                const inputLabel = document.createElement('label');
                inputLabel.textContent = input.title;
                inputDiv.appendChild(inputLabel);
                inputDiv.appendChild(input.element);
                form.appendChild(inputDiv);
            }
            let buttonRow = document.createElement('div');

            let createButton = document.createElement('button');
            createButton.textContent = 'Create';
            createButton.addEventListener('mouseup', submitAction);

            let cancelButton = document.createElement('button');
            cancelButton.textContent = 'Cancel';
            cancelButton.addEventListener('mouseup', removeInputForm);

            buttonRow.appendChild(cancelButton);
            buttonRow.appendChild(createButton);

            form.appendChild(buttonRow);
            fullScreenContainer.appendChild(form);
            rightPane.appendChild(fullScreenContainer);
        }
        function removeInputForm() {
            document.querySelector('.fullscreen-container > .input-form') &&
                rightPane.removeChild(rightPane.lastChild);
        }

        return { displayProject, displayNewProjectForm, removeInputForm };
    }
)();

const DOMActions = {
    leftPaneActions,
    rightPaneActions
};

export { DOMActions };