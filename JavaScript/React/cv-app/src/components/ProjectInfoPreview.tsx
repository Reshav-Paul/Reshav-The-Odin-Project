import React from 'react';

import { project } from '../types';

const ProjectInfoPreview: React.FC<{info: project[]}> = function(props) {
    let heading = '';
    if (props.info.length > 0) heading = 'Projects';
    const projects = props.info;
    return <div>
        <h2>{heading}</h2>
        <ol className="projects">
        { projects.map(p => <ProjectCard info={p} />) }
        </ol>
    </div>;
}

const ProjectCard: React.FC<{info: project}> = function(props) {
    return <li key={props.info.id}>
        <h3 className="header">{props.info.name}</h3>
        <p>
            {props.info.description}
            <br/>
            <strong>{props.info.toolsUsed? 'Made Using - ' + props.info.toolsUsed : ''}</strong>
        </p>
    </li>;
}

export default ProjectInfoPreview;