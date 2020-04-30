import { projectFactory, taskFactory, priorities } from './models.js'
import { localStorageManager } from './localStorageManager.js';

const bookmarks = projectFactory(-1, 'Bookmarks');

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

            let selectedProject = getProject(projectID);
            selectedProject.addTask(taskFactory(taskName, taskDueDate, priority, isBookmarked));
            const task = selectedProject.getTasks().slice(-1)[0];
            if (description.length > 0) task.setDescription(description);
            if (isBookmarked) bookmarks.addTask(task);
            localStorageManager.addProject(selectedProject);
            return task;
        }

        function removeTaskFromProject(projectID, task) {
            if (projectID < 0) {
                bookmarks.deleteTask(task);
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
            localStorageManager.addProject(selectedProject);
        }

        return {
            addProject, addProjectFromLocalStorage,
            removeProject, getProject, getProjects,
            addTaskToProject, removeTaskFromProject
        };
    }
)();


for (let project of projectManager.getProjects()) {
    for (let task of project.getTasks()) {
        task.isBookmarked() === true && bookmarks.addTask(task);
    }
}

export { bookmarks, projectManager, localStorageManager };