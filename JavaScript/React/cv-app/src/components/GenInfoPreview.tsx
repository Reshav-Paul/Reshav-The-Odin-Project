import React from 'react';

import { genInfoType } from '../types';

const GenInfoPreview: React.FC<{info: genInfoType}> = function(props) {
    const {name, email, phone, birthDate} = props.info;
    let dateString: string = '';
    if (birthDate) {
        dateString = birthDate?.toString();
    }
    if (!name && !email && !phone && !dateString) {
        return <div></div>;
    }
    return (
        <div className="gen-info-preview">
            <h2 className="heading">{name ?? ''}</h2>
            <p>
                {dateString? 'Born: ' + dateString : ''}
                {dateString && <br/>}
                {email? 'Email: ' + email : ''}
                {email && <br/>}
                {phone? 'Phone: ' + phone : ''}
                {phone && <br/>}
            </p>
        </div>
    );
}

export default GenInfoPreview;