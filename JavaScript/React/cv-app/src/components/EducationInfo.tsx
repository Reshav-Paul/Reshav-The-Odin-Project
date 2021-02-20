import React from 'react';

import { educationType } from '../types';

type propType = {
	info: educationType[],
	cb: (payload: educationType) => void;
}

class EducationInfo extends React.Component<propType, educationType> {
	constructor(props: propType) {
		super(props);
		this.state = {
			degreeName: '',
			instituteName: '',
			score: '',
			startDate: undefined,
			endDate: undefined,
		};
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleInput(key: string, e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value;
		if (key in this.state) {
			console.log(value);
			this.setState({
				...this.state,
				[key]: value,
			});
		}
	}
	handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		// e.currentTarget.reset();
		this.props.cb(this.state);
		this.setState({
			degreeName: '',
			instituteName: '',
			score: '',
			startDate: '',
			endDate: '',
		});
	}
	render() {
		const { degreeName, instituteName, score, startDate, endDate } = this.state;
		console.log(startDate);
		return (
			<div className="ed-info">
				<form action="" onSubmit={this.handleSubmit}>
					<input type="text" placeholder="Institute Name" value={instituteName} onChange={e => this.handleInput('instituteName', e)}/>
					<input type="text" placeholder="Degree Name" value={degreeName} onChange={e => this.handleInput('degreeName', e)}/>
					<div>
						<label htmlFor="ed-from-date">From</label>
						<input type="date" name="ed-from-date" id="ed-from-date" value={startDate?.toString()} onChange={e => this.handleInput('startDate', e)}/>
						<label htmlFor="ed-to-date" style={{ marginLeft: '1rem' }}>To</label>
						<input type="date" name="ed-to-date" id="ed-to-date" value={endDate?.toString()} onChange={e => this.handleInput('endDate', e)}/>
					</div>
					<div>
						<label htmlFor="score">Percentage/GPA</label>
						<input type="text" name="score" id="score" value={score} onChange={e => this.handleInput('score', e)}/>
					</div>
					<button type="submit">Add</button>
				</form>
			</div>
		);
	}
}

export default EducationInfo;