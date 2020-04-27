import {priorities} from './models.js';
import {projectManager} from './datastore.js';

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

            taskTile.appendChild(icon);
            taskTile.appendChild(title);
            taskTile.appendChild(date);
            return taskTile;
        }

        function displayProject(project) {
            if(!project) return;
            rightPane.innerHTML = '';
            const headerDiv = document.createElement('div');
            headerDiv.setAttribute('id', 'project-title');
            headerDiv.setAttribute('data-id', project.getID());

            const projectTitle = document.createElement('h3');
            projectTitle.textContent = project.getName();
            headerDiv.appendChild(projectTitle);

            if(project.getID() > 0){
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
        }

        function displayNewProjectForm() {
            if (document.getElementById('new-project-form')) return;
            let fullScreenContainer = document.createElement('div');
            fullScreenContainer.classList.add('fullscreen-container');

            let form = document.createElement('div');
            form.setAttribute('id', 'new-project-form');

            let header = document.createElement('h3');
            header.textContent = 'Create a New Project';

            let inputDiv = document.createElement('div');
            let inputLabel = document.createElement('label');
            inputLabel.textContent = 'Name';
            let inputBox = document.createElement('input');
            inputBox.setAttribute('type', 'text');
            inputDiv.appendChild(inputLabel);
            inputDiv.appendChild(inputBox);

            let buttonRow = document.createElement('div');

            let createButton = document.createElement('button');
            createButton.textContent = 'Create';
            createButton.addEventListener('mouseup', () => {
                const newProject = projectManager.addProject(
                    document.querySelector('#new-project-form input').value);
                if(!newProject) return;
                leftPaneActions.addProjectTile(newProject)
                displayProject(projectManager.getProject(-1));
                removeNewProjectForm();
            });

            let cancelButton = document.createElement('button');
            cancelButton.textContent = 'Cancel';
            cancelButton.addEventListener('mouseup', removeNewProjectForm);

            buttonRow.appendChild(createButton);
            buttonRow.appendChild(cancelButton);

            form.appendChild(header);
            form.appendChild(inputDiv);
            form.appendChild(buttonRow);
            fullScreenContainer.appendChild(form);
            rightPane.appendChild(fullScreenContainer);
        }

        function removeNewProjectForm() {
            document.getElementById('new-project-form') &&
            rightPane.removeChild(rightPane.lastChild);
        }

        return { displayProject, displayNewProjectForm, removeNewProjectForm };
    }
)();

const DOMActions = {
    leftPaneActions,
    rightPaneActions
};

export { DOMActions };