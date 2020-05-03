import { projectManager, bookmarks, todaysTasks } from './datastore.js';
import { localStorageManager } from './localStorageManager.js';
import { DOMActions } from './DOMActions.js'
import { priorities, projectFactory } from './models.js';

if (!localStorage.getItem('got-todo-projects')) {
    localStorage.setItem('got-todo-projects', JSON.stringify([{
        'id': 0, 'name': 'Default', 'creationDate': '',
        'tasks': [{
            'projectID': 0,
            'name': 'Welcome to GotTodo',
            'dueDate': '',
            'priority': priorities.low,
            'isBookmarked': true,
            'description': 'Use your time to get things done'
        }]
    }]));
}
localStorageManager.getProjects().forEach(localProject => {
    const project = projectManager.addProjectFromLocalStorage(localProject.id, localProject.name, localProject.creationDate);
    const tasks = localProject.tasks;
    tasks.forEach(task => 
        projectManager.addTaskToProject(
            project.getID(),
            task.name,
            task.dueDate,
            task.priority,
            task.isBookmarked,
            task.description
        )
    );
});
projectManager.getProjects().forEach(DOMActions.leftPaneActions.addProjectTile);
DOMActions.rightPaneActions.displayProject(projectManager.getProject(0));
document.querySelector('.project:first-child').classList.add('selected-tile');

document.getElementById('bookmarks').addEventListener(
    'click', e => {
        DOMActions.leftPaneActions.selectedTileStyler(e.currentTarget);
        DOMActions.rightPaneActions.displayProject(bookmarks);
    });

document.getElementById('add-project').addEventListener(
    'click', () => DOMActions.rightPaneActions.displayNewProjectForm());

document.getElementById('left-pane').addEventListener(
    'click', DOMActions.rightPaneActions.removeInputForm);
document.getElementById('today').addEventListener('click', e => {
    DOMActions.leftPaneActions.selectedTileStyler(e.currentTarget);
    DOMActions.rightPaneActions.displayProject(todaysTasks);
});

document.getElementById('menu-icon').addEventListener('click', DOMActions.leftPaneActions.toggleMenuCollapse);
window.onload = () => {
    if(document.body.offsetWidth <= 640) {
        DOMActions.leftPaneActions.toggleMenuCollapse();
    }
}
