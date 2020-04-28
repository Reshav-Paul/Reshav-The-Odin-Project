import {projectManager, bookmarks} from './datastore.js';
import {DOMActions} from './DOMActions.js'

const defaultProject = projectManager.getProject(0);
DOMActions.leftPaneActions.addProjectTile(defaultProject);

DOMActions.rightPaneActions.displayProject(defaultProject);
document.getElementById('bookmarks').addEventListener(
    'click', () => DOMActions.rightPaneActions.displayProject(bookmarks));

document.getElementById('add-project').addEventListener(
    'click', () => DOMActions.rightPaneActions.displayNewProjectForm());

document.getElementById('left-pane').addEventListener(
    'click', DOMActions.rightPaneActions.removeInputForm);