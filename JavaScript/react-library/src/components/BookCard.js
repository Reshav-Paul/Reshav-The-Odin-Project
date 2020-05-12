import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheckSquare} from '@fortawesome/free-solid-svg-icons'

function BookCard(props) {
    const {title, author, pages, imageUrl, isRead} = props.book;
    const cardStyle = {
        backgroundImage: 'linear-gradient(270deg, #005C97, #363795)',
        padding: '0.5rem 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
    const checkStyle = {
        fontSize: '1.3rem',
        color: isRead? '#3ac25c':'#e76b55',
        marginLeft: '1rem',
    }
    const getPagesHeader = () => {
        if (!pages) return null;
        return (<h5>{pages} pages</h5>);
    }
    return (<div className='book-card' style={{backgroundImage: `url(${imageUrl}), url('https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260')`}}>
        <div style={cardStyle}>
            <div>
                <h4>{title} - {author}</h4>
                {getPagesHeader()}
            </div>
            <FontAwesomeIcon icon={faCheckSquare} style={checkStyle} onMouseUp={() => props.toggleReadStatus(props.book.id)} />
        </div>
    </div>);
}

export default BookCard;