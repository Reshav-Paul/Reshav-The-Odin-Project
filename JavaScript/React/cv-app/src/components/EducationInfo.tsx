import React from 'react';

import { educationType } from '../types';
import EducationInfoPreview from './EducationInfoPreview';

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
		return (
			<div className="ed-info">
				<form action="" onSubmit={this.handleSubmit} className="regular-form">
					<h1>Educational Information</h1>
					<input required type="text" placeholder="Institute Name" value={instituteName} onChange={e => this.handleInput('instituteName', e)}/>
					<input required type="text" placeholder="Degree Name" value={degreeName} onChange={e => this.handleInput('degreeName', e)}/>
					<div>
						<label htmlFor="ed-from-date">From</label>
						<input type="date" name="ed-from-date" id="ed-from-date" value={startDate?.toString()} onChange={e => this.handleInput('startDate', e)}/>
						<label htmlFor="ed-to-date" style={{ marginLeft: '1rem' }}>To</label>
						<input type="date" name="ed-to-date" id="ed-to-date" value={endDate?.toString()} onChange={e => this.handleInput('endDate', e)}/>
					</div>
					<div>
						<label htmlFor="score">Percentage/GPA</label>
						<input required type="text" name="score" id="score" value={score} onChange={e => this.handleInput('score', e)}/>
					</div>
					<button type="submit">Add</button>
				</form>
				<EducationInfoPreview info={this.props.info} />
			</div>
		);
	}
}

export default EducationInfo;