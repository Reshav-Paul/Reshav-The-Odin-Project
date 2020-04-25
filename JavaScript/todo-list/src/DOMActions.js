import {priorities} from './models.js';

const leftPaneActions = (
    function () {
        function _getProjectTile(project) {
            const listElement = document.createElement('li');
            listElement.classList.add('project');

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
        function addProjectTile(project) {
            const projectList = document.getElementById('project-list');
            projectList.appendChild(_getProjectTile(project));
        }

        return {
            addProjectTile
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
            rightPane.innerHTML = '';
            const projectTitle = document.createElement('h3');
            projectTitle.setAttribute('id', 'project-title');
            projectTitle.textContent = project.getName();

            rightPane.appendChild(projectTitle);
            project.getTasks().forEach(task => rightPane.appendChild(_getTaskTile(task)));
        }

        return { displayProject };
    }
)();

const DOMActions = {
    leftPaneActions,
    rightPaneActions
};

export { DOMActions };