import { projectFactory, taskFactory, priorities } from './models.js'

const projectManager = (
    function () {
        let _projects = [];
        let id = 0;

        function addProject(name, date = '') {
            if (!name || name.length === 0) return;
            const newProject = projectFactory(id, name, date);
            ++id;
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
        }

        function getProject(index) {
            if (!Number.isInteger(index)) return;
            return index < 0 ? _projects[_projects.length + index] : _projects[index];
        }
        const getProjects = () => _projects;

        function addTaskToProject(projectID, taskName, taskDueDate = '', priority = priorities.medium, isBookmarked = false) {
            let selectedProject = getProject(projectID);
            selectedProject.addTask(taskFactory(taskName, taskDueDate, priority, isBookmarked));
            const task = selectedProject.getTasks().slice(-1)[0];
            if(isBookmarked) bookmarks.addTask(task);
            return task;
        }

        function removeTaskFromProject(projectID, task) {
            if(projectID < 0) {
                bookmarks.deleteTask(task);
                _projects.forEach(project => project.deleteTask(task));
                return;
            }
            let selectedProject = getProject(projectID);
            selectedProject.deleteTask(task);
            task.isBookmarked && bookmarks.deleteTask(task);
        }

        let defaultProject = addProject('Default', '23/04/2020');
        defaultProject.addTask(taskFactory('Welcome to Got Todo', '', priorities.low, true));

        return { addProject, removeProject, getProject, getProjects, addTaskToProject, removeTaskFromProject };
    }
)();

const bookmarks = projectFactory(-1, 'Bookmarks');
for (let project of projectManager.getProjects()) {
    for (let task of project.getTasks()) {
        task.isBookmarked() === true && bookmarks.addTask(task);
    }
}

export { bookmarks, projectManager };