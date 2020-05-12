import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const iconStyle = {
    fontSize: '2rem',
    margin: '1rem',
}

function ServiceCard(props) {
    const {title, description, icon, iconColor='white'} = props;
    return (
        <div className='service'>
            <FontAwesomeIcon icon={icon} style={Object.assign({}, iconStyle, {color: iconColor})} />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

export default ServiceCard;