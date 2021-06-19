import React from 'react';

import { project } from '../types';
import ProjectInfoPreview from './ProjectInfoPreview';

type propType = {
	info: project[],
	cb: (payload: project) => void;
}

class ProjectInfo extends React.Component<propType, project> {
	constructor(props: propType) {
		super(props);
		this.state = {
			id: 0,
			name: '',
			description: '',
			toolsUsed: '',
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.handleDescriptionInput = this.handleDescriptionInput.bind(this);
	}

	handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		this.props.cb(this.state);
		this.setState({
			id: 0,
			name: '',
			description: '',
			toolsUsed: '',
		});
	}

	handleInput(key: string, e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value;
		if (key in this.state) {
			this.setState({
				...this.state,
				[key]: value
			});
		}
	}

	handleDescriptionInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
		this.setState({ description: e.target.value });
	}

	render() {
		const { name, description, toolsUsed } = this.state;

		return <div className="proj-info">
			
			<form action="" onSubmit={this.handleSubmit} className="regular-form">
				<h1>Add Projects</h1>
				<input required value={name} type="text" name="proj-name" id="proj-name" className="name" placeholder="Project Name"
					onChange={e => this.handleInput('name', e)} />
				<label htmlFor="proj-tools">What did you use in this project?</label>
				<input value={toolsUsed} type="text" name="proj-tools" id="proj-tools" className="tools" placeholder="Tools"
					onChange={e => this.handleInput('toolsUsed', e)} />
				<label htmlFor="proj-description">Describe your project</label>
				<textarea value={description} name="proj-description" id="proj-description" cols={30} rows={10} onChange={this.handleDescriptionInput}></textarea>

				<button>Add Project</button>
			</form>
			<ProjectInfoPreview info={this.props.info} />
		</div>;
	}
}

export default ProjectInfo;