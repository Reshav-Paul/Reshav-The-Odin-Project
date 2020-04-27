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
            let selectedProject;
            for(const project of _projects) {
                if(project.getID() === projectID) {
                    selectedProject = project;
                    break;
                }
            }
            selectedProject.addTask(taskFactory(taskName, taskDueDate, priority, isBookmarked));
            const task = selectedProject.getTasks().slice(-1)[0];
            if(isBookmarked) bookmarks.addTask(task);
            return task;
        }

        addProject('Default', '23/04/2020');
        addProject('College', '24/04/2020');

        let task1 = taskFactory('Task 1', '30/04/2020', priorities.high);
        task1.setBookmark(true);
        let task2 = taskFactory('Task 2', '28/04/2020', priorities.low);
        let task3 = taskFactory('Task 3', '02/05/2020', priorities.medium);
        let task4 = taskFactory('Task 4', '29/04/2020', priorities.low);
        task4.setBookmark(true);

        getProject(0).addTask(task1);
        getProject(0).addTask(task2);
        getProject(1).addTask(task3);
        getProject(1).addTask(task4);

        return { addProject, removeProject, getProject, getProjects, addTaskToProject };
    }
)();

const bookmarks = projectFactory(-1, 'Bookmarks');
for (let project of projectManager.getProjects()) {
    for (let task of project.getTasks()) {
        task.getBookmark() === true && bookmarks.addTask(task);
    }
}

export { bookmarks, projectManager };