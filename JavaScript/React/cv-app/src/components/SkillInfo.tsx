import React from 'react';

import { skillGroup, skillType } from '../types';

type propType = {
	info: skillGroup[];
	addGroup: (payload: skillGroup) => void,
	addSkill: (skillGroup: skillGroup, skillName: string) => void,
}

type skillState = {
	skillGroup: skillGroup,
	skill: skillType
}

type skillCardPropType = {
	info: skillGroup,
	onAddSkill: (skillGroup: skillGroup, skillName: string) => void
}

class SkillInfo extends React.Component<propType, skillState> {
	constructor(props: propType) {
		super(props);
		this.state = {
			skillGroup: { id: 0, name: '', skills: [] },
			skill: { id: 0, name: '' }
		}
		this.handleSkillGroupInput = this.handleSkillGroupInput.bind(this);
		this.handleSkillGroupSubmit = this.handleSkillGroupSubmit.bind(this);
		// this.addSkillToSkillGroup = this.addSkillToSkillGroup.bind(this);
	}
	handleSkillGroupInput(e: React.ChangeEvent<HTMLInputElement>) {
		this.setState({
			skillGroup: {
				...this.state.skillGroup,
				name: e.target.value
			}
		});
	}
	handleSkillGroupSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		this.props.addGroup(this.state.skillGroup);
		this.setState({
			skillGroup: { id: 0, name: '', skills: [] }
		});
	}
	render() {
		const info = this.props.info;
		const { skillGroup, skill } = this.state;
		return <div className="skills">
			<h1>Add Skills</h1>
			<form action="" onSubmit={this.handleSkillGroupSubmit}>
				<input type="text" value={skillGroup.name} placeholder="Skill Group Name" onChange={this.handleSkillGroupInput} />
				<button>Add Skill Group</button>
			</form>
			<h2>Skills</h2>
			{
				info.length > 0 &&
				<ul className="skill-groups">
					{info.map(i => <SkillCard info={i} onAddSkill={this.props.addSkill} />)}
				</ul>
			}
		</div>;
	}
}

class SkillCard extends React.Component<skillCardPropType, { name: string }> {
	constructor(props: skillCardPropType) {
		super(props);
		this.state = { name: '' };
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}
	onChange(e: React.ChangeEvent<HTMLInputElement>) {
		this.setState({ name: e.target.value });
	}
	handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log(this.props.info);
		this.props.onAddSkill(this.props.info, this.state.name);
		this.setState({ name: '' });
	}
	render() {
		const props = this.props;
		const skillGroup = props.info;
		const placeholder = "Add skill to " + props.info.name;;
		return <li>
			<strong>{skillGroup.name}</strong>
			<form action="" className="skill-form" onSubmit={this.handleSubmit}>
				<input type="text" value={this.state.name} placeholder={placeholder} onChange={this.onChange} />
				<button>Add</button>
			</form>
			<ul className="skills-list">
				{skillGroup.skills.map(s => <li>{s.name}</li>)}
			</ul>
		</li>;
	}
}

export default SkillInfo;