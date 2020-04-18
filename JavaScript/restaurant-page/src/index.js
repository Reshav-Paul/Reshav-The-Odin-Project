import { homepage } from './home.js';
import { menupage } from './menu.js'
import { locationPage } from './location.js';
import { aboutPage } from './about.js';

const tabSelectionHandler = (function () {
    let _selectedTabID = '';
    const _tabs = ['home-tab', 'menu-tab', 'loc-tab', 'about-tab'];
    function initialize() {
        _tabs.forEach(tab => 
            document.getElementById(tab).addEventListener('click', e => _toggleTabUnderline(tab)));
        _toggleTabUnderline('home-tab');
    }
    function _toggleTabUnderline(id) {
        if(id === _selectedTabID) return;
        if(_selectedTabID.length > 0) {
            document.querySelector(`#${_selectedTabID} a`).style['color'] = 'white';
            _selectedTabID.length > 0 && document.querySelector(`#${_selectedTabID} .underline`).classList.add('invisible');
        }
        _selectedTabID = id;
        document.querySelector(`#${_selectedTabID} .underline`).classList.remove('invisible');
        document.querySelector(`#${_selectedTabID} a`).style['color'] = '#24b307';
        _renderPage(_selectedTabID);
    }
    function _renderPage(id) {
        if(id === _tabs[0])
            homepage.render();
        else if(id === _tabs[1])
            menupage.render();
        else if(id === _tabs[2])
            locationPage.render();
        else if(id === _tabs[3])
            aboutPage.render();
    }

    return { initialize };
})();

tabSelectionHandler.initialize();