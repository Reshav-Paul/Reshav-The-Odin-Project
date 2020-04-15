import { homepage } from './home.js';
import { menupage } from './menu.js'

const tabSelectionHandler = (function () {
    let _selectedTabID = '';
    const _tabs = ['home-tab', 'menu-tab', 'loc-tab', 'order-tab', 'about-tab'];
    function initialize() {
        _tabs.forEach(tab => 
            document.getElementById(tab).addEventListener('click', e => _toggleTabUnderline(tab)));
        _toggleTabUnderline('home-tab');
    }
    function _toggleTabUnderline(id) {
        if(id === _selectedTabID) return;
        console.log('changing tabs ' + id);
        _selectedTabID.length > 0 && document.querySelector(`#${_selectedTabID} .underline`).classList.add('invisible');
        document.querySelector(`#${id} .underline`).classList.remove('invisible');
        _selectedTabID = id;
        _renderPage(_selectedTabID);
    }
    function _renderPage(id) {
        console.log('rendering ' + id);
        if(id === _tabs[0])
            homepage.render();
        else if(id === _tabs[1])
            menupage.render();
    }

    return { initialize };
})();

tabSelectionHandler.initialize();