import React from 'react';

import { globalState, jobTypes, profType, educationType, skillGroup } from '../types';

function getJobTypeFromCode(code: number): string {
	let jobType = '';
	switch (code) {
		case 0:
			jobType = 'Fulltime';
			break;
		case 1:
			jobType = 'Internship';
			break;
	}
	return jobType;
}

const ExpCard: React.FC<{ info: profType }> = function (props) {
	const info = props.info;
	if (!info.companyName) return null;
	return <li className="company">
		<h3 className="company-name m-0">{info.companyName}</h3>
		<p className="m-0">
			<strong>{info.position}</strong>
			<span className="job-type">{getJobTypeFromCode(info.type)}</span>
		</p>
		<p className="m-0">
			<span className="service-time">
				{info.startDate ? 'From ' + info.startDate : ''}
				{info.startDate && info.endDate ? ' To ' + info.endDate : (info.startDate ? ' - current' : '')}
			</span>
		</p>
		<p className="m-0">
			{info.description}
		</p>
	</li>;
}

const EduCard: React.FC<{info: educationType}> = function(props) {
	const info = props.info;
	if (!info.degreeName || !info.instituteName) return null;
	return <li className="degree">
		<h3 className="ins-name m-0">{info.degreeName}</h3>
		<p className="m-0">
			<strong>{info.instituteName}</strong>
			<br/>
			<span className="score">
				{info.score? 'Percentage/CGPA - ' + info.score : ''}
			</span>
		</p>
		<p className="m-0">
			<span className="time">
				{info.startDate ? 'From ' + info.startDate : ''}
				{info.startDate && info.endDate ? ' To ' + info.endDate : (info.startDate ? ' - current' : '')}
			</span>
		</p>
	</li>;
}

const Preview: React.FC<{ info: globalState }> = function (props) {
	const { general, education, profession, skills } = props.info;
	return <div id="preview">
		<div className="personal">
			<h1 className="name">{general.name}</h1>
			<h2 className="m-0">Contact</h2>
			<p className="contact">
				{general.email ? 'Email - ' + general.email : ''}
				{general.email && <br />}
				{general.phone ? 'Phone - ' + general.phone : ''}
				{general.phone && <br />}
				{general.birthDate ? 'Date of Birth - ' + general.birthDate : ''}
				{/* {general.birthDate && <br />} */}
			</p>
		</div>
		<div className="skillset">
			<h2 className="m-0">Skills</h2>
			<ul>
				{skills.map(s => <li>
					<h3 className="heading">{s.name}</h3>
					{s.skills.length > 0? <p>{getSkillsFromGroup(s)}</p> : null}
				</li>)}
			</ul>
		</div>
		<div className="educational">
			<h2 className="m-0">Educational Background</h2>
			<ul className="education">
				{education.map(p => <EduCard info={p} />)}
			</ul>
		</div>
		<div className="professional">
			<h2 className="m-0">Professional Experience</h2>
			<ul className="prof-exp">
				{profession.map(p => <ExpCard info={p} />)}
			</ul>
		</div>
	</div>
}

function getSkillsFromGroup(group: skillGroup): string {
	let skillNames: string[] = [];
	group.skills.forEach(s => skillNames.push(s.name));
	return skillNames.join(', ');
}

export default Preview;