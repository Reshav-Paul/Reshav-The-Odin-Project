import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {

    const navBgStyle = {
        backgroundColor: '#333',
        color: 'white',
        height: '70px',
        width: '100%',
        position: 'fixed',
        zIndex: '2'
    }
    const navListStyle = {
        height: '100%',
        display: 'flex',
        alignItems: 'center'
    }

    return (
        <div id='navbar' style = {navBgStyle}>
            <ul id='navbar-nav' style = {navListStyle}>
                <li >
                    <Link to='/' className = 'navlink'>Home</Link>
                </li>
                <li>
                    <Link to='/catalog' className = 'navlink'>Catalog</Link>
                </li>
                <li>
                    <Link to='/about' className = 'navlink'>About</Link>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;