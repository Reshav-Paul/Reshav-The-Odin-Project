import React from 'react';

import { certification } from '../types';

type propType = {
    info: certification[],
    cb: (payload: certification) => void,
}

class CertificationInfo extends React.Component<propType, certification> {
    constructor(props: propType) {
        super(props);
        this.state = {
            id: 0,
            name: '',
            issuer: '',
            url: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(key: string, e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            ...this.state,
            [key]: e.target.value,
        });
    }

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        this.props.cb(this.state);
        this.setState({
            id: 0,
            name: '',
            issuer: '',
            url: '',
        });
    }

    render() {
        const {name, issuer, url} = this.state;
        return <div className="cert-info">
            <form action="" onSubmit={this.handleSubmit} className="left-aligned-small-form">
                <h1>Certifications</h1>
                <input value={name} onChange={e => this.handleInput('name', e)} type="text" name="name" placeholder="Title" />
                <input value={issuer} onChange={e => this.handleInput('issuer', e)} type="text" name="issuer" placeholder="Issuing Organization" />
                <input value={url} onChange={e => this.handleInput('url', e)} type="text" name="url" placeholder="Certificate URL" />
                <button>Submit</button>
            </form>
            <ul className="certifications-list">
                {this.props.info.map(c => <li id={c.id.toString()}>
                    <h2 className="header">{c.name}</h2>
                    <h3 className="issuer">{c.issuer}</h3>
                    {
                        c.url
                        && 
                        <a href={c.url}>Link - {c.url}</a>
                    }
                </li>)}
            </ul>

        </div>
    }
}

export default CertificationInfo;