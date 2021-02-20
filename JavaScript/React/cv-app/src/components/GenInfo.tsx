import React from 'react';

import { genInfoType } from '../types';

type propType = {
    info: genInfoType,
    cb: (info: genInfoType) => void,
}

class GenInfo extends React.Component<propType, genInfoType> {

    constructor(props: propType) {
        super(props);
        this.state = {
            name: props.info.name,
            email: props.info.email,
            phone: props.info.phone,
            birthDate: props.info.birthDate,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleSubmit (e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        this.props.cb(this.state);
    }

    handleInput (e: React.ChangeEvent<HTMLInputElement>, key: string) {
        e.preventDefault();
        if (key in this.state) {
            this.setState({
                ...this.state,
                [key]: e.target.value,
            });
        }
    }

    render() {
        const { name, email, phone, birthDate } = this.state;
        return (
            <div className='gen-info'>
                <form action="">
                    <input type="text" placeholder="Name" name="name" id="name" value={name} onChange={e => this.handleInput(e, 'name')}/>
                    <input type="email" placeholder="Email" name="email" id="email" value={email} onChange={e => this.handleInput(e, 'email')}/>
                    <div>
                        <label htmlFor="birth-date">Date of Birth</label>
                        <input type="date" name="birth-date" id="birth-date" value={birthDate?.toString()} onChange={e => this.handleInput(e, 'birthDate')}/>
                    </div>
                    <input type="text" placeholder="Phone Number" name="phone" id="phone" value={phone} onChange={e => this.handleInput(e, 'phone')}/>
                    <button onClick={ this.handleSubmit }>Edit</button>
                </form>
            </div>
        );
    }
}

export default GenInfo;