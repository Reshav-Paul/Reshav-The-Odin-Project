import React from 'react';

type propType = {
    text: string,
    cb: () => void,
    active: boolean
}

const SideNav : React.FC<propType> = function({text, cb, active}) {
    return (
        <a href="#" onClick={cb} className={active? 'active' : ''} >{ text }</a>
    );
}

export default SideNav;