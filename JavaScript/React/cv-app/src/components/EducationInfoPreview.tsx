import React from 'react';

import { educationType } from '../types';

const EducationPreviewCard: React.FC<{ info: educationType }> = function (props) {
    const {degreeName,instituteName,score,startDate,endDate} = props.info;
    return <div>
        <h3 className="header">{degreeName ?? ''}</h3>
        <p>
            {instituteName? 'Recieved From ' + instituteName : ''}
            <br/>
            {startDate? 'From ' + startDate : ''}
            {startDate && endDate? ' To ' + endDate : (startDate? ' and Ongoing' : '')}
            {startDate? <br/>:null}
            {score? 'Percentage/GPA: ' + score : ''}
        </p>
    </div>;
}

const EducationInfoPreview: React.FC<{ info: educationType[] }> = function (props) {
    return <div className="ed-info-preview">
        {props.info.map(i => <EducationPreviewCard info={i} />)}
    </div>;
}

export default EducationInfoPreview;