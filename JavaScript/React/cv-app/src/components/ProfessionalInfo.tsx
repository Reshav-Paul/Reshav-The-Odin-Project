import React from 'react';

import { profType, jobTypes } from '../types';

type propType = {
	info: profType[],
	cb: (payload: profType) => void;
}

class ProfessionalInfo extends React.Component<propType, profType> {
	constructor(props: propType) {
		super(props);
		this.state = {
			companyName: '',
			description: '',
			position: '',
			type: jobTypes.fulltime,
			startDate: '',
			endDate: '',
		};
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleJobTypeChange = this.handleJobTypeChange.bind(this);
		this.handleDescriptionInput = this.handleDescriptionInput.bind(this);
	}
	handleInput(key: string, e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value;
		if (key in this.state) {
			// console.log(value);
			this.setState({
				...this.state,
				[key]: value,
			});
		}
	}
	handleDescriptionInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
		this.setState({description: e.target.value});
	}
	handleJobTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
		this.setState({type: parseInt(e.target.value)});
	}
	handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		this.props.cb(this.state);
		this.setState({
			companyName: '',
			description: '',
			position: '',
			type: jobTypes.fulltime,
			startDate: '',
			endDate: '',
		});
	}
	render() {
		const { companyName, description, position, type, startDate, endDate } = this.state;
		return (
			<div className="ed-info">
				<form action="" onSubmit={this.handleSubmit}>
					<h1>Professional Experience</h1>
					<input type="text" name="company-name" placeholder="Company Name" value={companyName} onChange={e => this.handleInput('companyName', e)}/>
					<input type="text" name="designation" placeholder="Designation" value={position} onChange={e => this.handleInput('position', e)}/>
					<select name="industry" id="industry" onChange={this.handleJobTypeChange} value={type}>
						<option value={jobTypes.fulltime}>Fulltime</option>
						<option value={jobTypes.internship}>Internship</option>
					</select>
					<div>
						<label htmlFor="ed-from-date">From</label>
						<input type="date" name="ed-from-date" id="ed-from-date" value={startDate?.toString()} onChange={e => this.handleInput('startDate', e)}/>
						<label htmlFor="ed-to-date" style={{ marginLeft: '1rem' }}>To</label>
						<input type="date" name="ed-to-date" id="ed-to-date" value={endDate?.toString()} onChange={e => this.handleInput('endDate', e)}/>
					</div>
					<label htmlFor="description">Describe what you acheived there</label>
					<textarea value={description} name="description" id="prof-description" cols={30} rows={10} onChange={this.handleDescriptionInput}></textarea>
					<button type="submit">Add</button>
				</form>
			</div>
		);
	}
}

export default ProfessionalInfo;