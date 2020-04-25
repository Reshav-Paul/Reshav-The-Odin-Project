import {projectFactory, taskFactory, priorities} from './models.js'
import {DOMActions} from './DOMActions.js'


const defaultProject = projectFactory('Default', '23/04/2020');
const collegeProject = projectFactory('College', '24/04/2020');

DOMActions.leftPaneActions.addProjectTile(defaultProject);
DOMActions.leftPaneActions.addProjectTile(collegeProject);

let task1 = taskFactory('Task 1', '30/04/2020', priorities.high);
task1.setBookmark(true);
let task2 = taskFactory('Task 2', '28/04/2020', priorities.low);
let task3 = taskFactory('Task 3', '02/05/2020', priorities.medium);
let task4 = taskFactory('Task 4', '29/04/2020', priorities.low);
task4.setBookmark(true);

defaultProject.addTask(task1);
defaultProject.addTask(task2);
collegeProject.addTask(task3);
collegeProject.addTask(task4);

DOMActions.rightPaneActions.displayProject(defaultProject);

let projects = [defaultProject, collegeProject];

const bookmarks = projectFactory('Bookmarks');
for (let project of projects) {
    for(let task of project.getTasks()) {
        task.getBookmark() === true && bookmarks.addTask(task);
    }
}
document.getElementById('bookmarks').addEventListener(
    'click', () => DOMActions.rightPaneActions.displayProject(bookmarks));