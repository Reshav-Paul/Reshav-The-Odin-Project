import React from 'react';

function FeatureCard(props) {
    const {title, description, imageUrl, reverse=''} = props;
    return (
        <div className = {`feature-card ${reverse}`} >
            <div style = {{flex: '0.6'}}>
                <h3 style={{color: '#363795'}}>{title}</h3>
                <p>{description}</p>
            </div>
            <div className='feature-img' style={{ backgroundImage: `url(${imageUrl})` }}></div>
        </div>
    );
}

export default FeatureCard;