import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import BookCard from '../components/BookCard';
import NewBookForm from '../components/NewBookForm';

class Catalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formOpen: false,
            books: [
                {
                    id: uuidv4(),
                    title: 'Happy',
                    author: 'Alex Lemon',
                    pages: 302,
                    imageUrl: 'https://images.unsplash.com/photo-1459369510627-9efbee1e6051?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
                    isRead: true
                },
                {
                    id: uuidv4(),
                    title: 'Your soul is a river',
                    author: 'Nikita Gill',
                    pages: 280,
                    imageUrl: 'https://images.unsplash.com/photo-1511108690759-009324a90311?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
                    isRead: false
                },
                {
                    id: uuidv4(),
                    title: 'Milk and Honey',
                    author: 'Rupi Kaur',
                    pages: 403,
                    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
                    isRead: false
                }
            ]
        };
    }

    toggleReadStatus = (id) => {
        const newState = this.state.books.map(book => {
            if(book.id === id) book.isRead = !book.isRead;
            return book;
        });
        this.setState(newState);
    }

    toggleBookForm = () => {
        this.setState({...this.state, formOpen: !this.state.formOpen});
    }

    handleFormSubmit = (e, book) => {
        e.preventDefault();
        if (!book.title || !book.author) return;
        if (!book.title.length || !book.author.length) return;
        if (book.pages && parseInt(book.pages) < 5) return;
        book.id = uuidv4();
        this.setState({...this.state, books: [...this.state.books, book]}, this.toggleBookForm);
    }

    getNewBookForm = () => {
        if(!this.state.formOpen) return null;
        return <NewBookForm toggleForm={this.toggleBookForm} handleSubmit={this.handleFormSubmit} />
    }

    render() {

        let bookcards = this.state.books.map(book => 
            <BookCard key={book.id} book={book} toggleReadStatus={this.toggleReadStatus} />
        );
        const gridStyle = {
            width: 'calc(100% - 2rem)',
            margin: '1rem 0',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gridGap: '1rem'
        };

        return(
            <div id='catalog' className='page' style={{minHeight: 'calc(100% - 70px)', backgroundColor: '#222'}}>
                {this.getNewBookForm()}
                <button className='btn' style={{marginBottom: '0'}} onMouseUp={this.toggleBookForm}>Add Book</button>
                <div style={gridStyle}>
                    {bookcards}
                </div>
            </div>
        );
    }
}

export default Catalog;