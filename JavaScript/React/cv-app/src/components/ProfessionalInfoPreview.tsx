import React from 'react';

import { profType, jobTypes } from '../types';

const ProfessionalInfoPreviewCard: React.FC<{ info: profType }> = function (props) {
	const { companyName, position, type, description, endDate, startDate } = props.info;
	if (!companyName && !position && !type && !description && !startDate) {
		return <div></div>;
	}
	let jobTypeStatement: string = '';
	let designationStatement: string = '';
	console.log(type);
	if (type == jobTypes.fulltime) jobTypeStatement = 'In a Fulltime Role';
	if (type == jobTypes.internship) jobTypeStatement = 'In an Internship Position';
	if (position) {
		if (endDate) designationStatement = 'Worked as a';
		else designationStatement = 'Working as a';
	}
	return <div>
		<h3>{companyName ?? ''}</h3>
		<p>
			{position && startDate ? designationStatement + ' ' + position : ''}
			{position && startDate && <br />}
			{jobTypeStatement}
			<br />
			{startDate ? 'From ' + startDate : ''}
			{startDate && endDate ? ' To ' + endDate : (startDate ? ' - current' : '')}
			{startDate && <br />}
			{description}
		</p>
	</div>;
}

const ProfessionalInfoPreview: React.FC<{ info: profType[] }> = function (props) {
	return <div>
			{props.info.map(i => <ProfessionalInfoPreviewCard info={i} />)}
	</div>;
}

export default ProfessionalInfoPreview;