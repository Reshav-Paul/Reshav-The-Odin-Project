import { homepage } from './home.js';

const tabSelectionHandler = (function () {
    let _selectedTabID = 'home-tab';
    function initialize() {
        document.getElementById('home-tab').addEventListener('click', e => _toggleTabUnderline('home-tab'));
        document.getElementById('menu-tab').addEventListener('click', e => _toggleTabUnderline('menu-tab'));
        document.getElementById('loc-tab').addEventListener('click', e => _toggleTabUnderline('loc-tab'));
        document.getElementById('order-tab').addEventListener('click', e => _toggleTabUnderline('order-tab'));
        document.getElementById('about-tab').addEventListener('click', e => _toggleTabUnderline('about-tab'));
    }
    function _toggleTabUnderline(id) {
        document.querySelector(`#${_selectedTabID} .underline`).classList.add('invisible');
        document.querySelector(`#${id} .underline`).classList.remove('invisible');
        _selectedTabID = id;
    }

    return { initialize };
})();

tabSelectionHandler.initialize();
homepage.render();