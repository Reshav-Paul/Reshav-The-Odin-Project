import { projectFactory, taskFactory, priorities } from './models.js'
import { localStorageManager } from './localStorageManager.js';

const bookmarks = projectFactory(-1, 'Bookmarks');
const todaysTasks = projectFactory(-2, 'Got Todo Today');

function _getDateString(date) {
    if (typeof date === 'string') return date;
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

const projectManager = (
    function () {
        let _projects = [];
        let _id = 1;

        function addProject(name, date = '') {
            if (!name || name.length === 0) return;
            const newProject = projectFactory(_id, name, date);
            ++_id;
            _projects.push(newProject);
            localStorageManager.addProject(newProject);
            return newProject;
        }

        function addProjectFromLocalStorage(id, name, date) {
            if (_id <= id) _id = id + 1;
            const newProject = projectFactory(id, name, date);
            _projects.push(newProject);
            return newProject;
        }

        function removeProject(id) {
            if (!id) return;
            for (const project of _projects) {
                if (project.getID() === id) {
                    _projects.splice(_projects.indexOf(project), 1);
                }
            }
            localStorageManager.removeProject(id);
        }

        function getProject(id) {
            if (!Number.isInteger(id)) return;
            for (const project of _projects) {
                if (project.getID() === id) return project;
            }
        }
        const getProjects = () => _projects;

        function addTaskToProject(projectID, taskName, taskDueDate = '',
            priority = priorities.medium, isBookmarked = false, description = '') {

            if(typeof taskDueDate === 'string' && taskDueDate.length > 0) {
                const date = taskDueDate.split(/\D/);
                taskDueDate = new Date(date[0], --date[1], date[2]);
            }
            let selectedProject = getProject(projectID);
            selectedProject.addTask(taskFactory(taskName, taskDueDate, priority, isBookmarked));
            const task = selectedProject.getTasks().slice(-1)[0];
            if (description.length > 0) task.setDescription(description);
            if (isBookmarked) bookmarks.addTask(task);
            const dateString = _getDateString(task.getDueDate());
            if (dateString.length >= 0 && dateString === _getDateString(new Date(Date.now()))) {
                todaysTasks.addTask(task);
            }
            localStorageManager.addProject(selectedProject);
            return task;
        }

        function removeTaskFromProject(projectID, task) {
            if (projectID < 0) {
                if (projectID === -1) bookmarks.deleteTask(task);
                if (projectID === -2) todaysTasks.deleteTask(task);
                _projects.forEach(project => {
                    if(project.getTasks().indexOf(task) >= 0){
                        project.deleteTask(task);
                        localStorageManager.addProject(project);
                    }
                });
                return;
            }
            let selectedProject = getProject(projectID);
            selectedProject.deleteTask(task);
            task.isBookmarked && bookmarks.deleteTask(task);
            if (todaysTasks.getTasks().indexOf(task) >= 0) todaysTasks.deleteTask(task);
            localStorageManager.addProject(selectedProject);
        }

        return {
            addProject, addProjectFromLocalStorage,
            removeProject, getProject, getProjects,
            addTaskToProject, removeTaskFromProject
        };
    }
)();

export { bookmarks, projectManager, localStorageManager, todaysTasks };