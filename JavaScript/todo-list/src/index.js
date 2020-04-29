import {localStorageManager, projectManager, bookmarks} from './datastore.js';
import {DOMActions} from './DOMActions.js'
import { priorities } from './models.js';

// const defaultProject = projectManager.getProject(0);
if(!localStorage.getItem('got-todo-projects')) {
    localStorage.setItem('got-todo-projects', JSON.stringify([{
        'id': 0, 'name': 'Default', 'creationDate': '',
        'tasks': [{
            'projectID': 0,
            'name': 'Welcome to GotTodo',
            'dueDate': '',
            'priority': priorities.low,
            'isBookmarked': true}]
    }]));
}
localStorageManager.getProjects().forEach(localProject => {
    const project = projectManager.addProjectFromLocalStorage(localProject.id, localProject.name, localProject.creationDate);
    const tasks = localProject.tasks;
    tasks.forEach(task => projectManager.addTaskToProject(
        project.getID(),
        task.name,
        task.dueDate,
        task.priority,
        task.isBookmarked
    ));
});
projectManager.getProjects().forEach(DOMActions.leftPaneActions.addProjectTile);
DOMActions.rightPaneActions.displayProject(projectManager.getProject(0));

document.getElementById('bookmarks').addEventListener(
    'click', () => DOMActions.rightPaneActions.displayProject(bookmarks));

document.getElementById('add-project').addEventListener(
    'click', () => DOMActions.rightPaneActions.displayNewProjectForm());

document.getElementById('left-pane').addEventListener(
    'click', DOMActions.rightPaneActions.removeInputForm);