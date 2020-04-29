const localStorageManager = (
    function () {
        function getTasksObjectList(project) {
            let objectList = [];
            project.getTasks().forEach(task => {
                objectList.push({
                    'projectID': project.getID(),
                    'name': task.getName(),
                    'dueDate': task.getDueDate(),
                    'priority': task.getPriority(),
                    'isBookmarked': task.isBookmarked()
                });
            });
            return objectList;
        }
        function getProjectStorageObject(project) {
            return {
                'id': project.getID(), 'name': project.getName(),
                'creationDate': project.getCreationDate(), 'tasks': getTasksObjectList(project)
            };
        }
        function addProject(project) {
            let projects = [];
            if (localStorage.getItem('got-todo-projects'))
                projects = JSON.parse(localStorage.getItem('got-todo-projects'));

            let localObject = getProjectStorageObject(project);
            let isModified = false;
            for (const localProject of projects) {
                if (localProject.id === localObject.id) {
                    projects[projects.indexOf(localProject)] = localObject;
                    isModified = true;
                }
            }
            if (!isModified) projects.push(localObject);
            localStorage.setItem('got-todo-projects', JSON.stringify(projects));
        }

        function removeProject(id) {
            let projects = JSON.parse(localStorage.getItem('got-todo-projects'));
            for (const project of projects) {
                if (project.id === id) {
                    projects.splice(projects.indexOf(project), 1);
                }
            }
            localStorage.setItem('got-todo-projects', JSON.stringify(projects));
        }

        function getProjects() {
            return JSON.parse(localStorage.getItem('got-todo-projects'));
        }
        return { addProject, removeProject, getProjects };
    }
)();

export { localStorageManager };