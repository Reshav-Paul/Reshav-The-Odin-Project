import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

class NewBookForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    formStyle = {
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        padding: '1rem',
        backgroundColor: 'white',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '2',
        boxShadow: '0 0 10px black',
        borderRadius: '10px'
    }
    closeIconStyle = {
        position: 'fixed',
        top: '0.9rem',
        right: '1rem',
        fontSize: '1.2rem'
    };

    handleChange = e => {
        const value = e.target.value;
        switch (e.target.name) {
            case 'title':
                this.setState({...this.state, title: value})
                break;
            case 'author':
                this.setState({...this.state, author: value})
                break;
            case 'pages':
                this.setState({...this.state, pages: value})
                break;
            case 'imageUrl':
                this.setState({...this.state, imageUrl: value})
                break;
            case 'isRead':
                this.setState({...this.state, isRead: e.target.checked})
                break;
            default:
                break;
        }
        
    }
    render() {
        const {toggleForm, handleSubmit} = this.props;
        return (
            <form style={this.formStyle}>
                <h4>New Book</h4>
                <FontAwesomeIcon className='icon' icon={faTimes} style={this.closeIconStyle} onMouseUp={toggleForm} />
                <div className='input-row'>
                    <label htmlFor="title">Title</label>
                    <input className='form-input' name='title' type="text" onChange={this.handleChange} required='required'/>
                </div>
                <div className='input-row'>
                    <label htmlFor="author">Author</label>
                    <input className='form-input' name='author' type="text" onChange={this.handleChange} required='required'/>
                </div>
                <div className='input-row'>
                    <label htmlFor="pages">Pages</label>
                    <input className='form-input' name='pages' type="number" onChange={this.handleChange} min={5} />
                </div>
                <div className='input-row'>
                    <label htmlFor="is-read">Completed</label>
                    <input className='form-input' type="checkbox" name="isRead" onChange={this.handleChange} />
                </div>
                <div className='input-row'>
                    <label htmlFor="imageUrl">Image URL</label>
                    <input className='form-input' type="url" name="imageUrl" onChange={this.handleChange} />
                </div>        
                <input type="submit" value="Submit" className='btn'
                    style={{margin: '0.5rem auto 0 auto'}}
                    onMouseUp={e => handleSubmit(e, this.state)} />
            </form>
        );
    }
}

export default NewBookForm;