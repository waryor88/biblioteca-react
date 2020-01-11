import React from 'react';
import './bookPopup.css';
import axios from "axios";

class BookPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            book: "",
            loanId: "",
            authors:[]
        }
    }

    getBook = () => {
        axios.get('http://localhost:8080/book/loan/' + localStorage.getItem('loanId'), {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
            .then(response => this.setState({book: response.data,authors:response.data.authors},))

    }

    componentDidMount() {
        this.getBook()

    }

    render() {
        return (
            <div className='popup'>
                <div className='popup\_inner'>
                    <p>Book id: {this.state.book.externalId}</p>
                    <p>Title: {this.state.book.title}</p>
                    <p>Year: {this.state.book.year}</p>
                    <p>Type: {this.state.book.bookType}</p>
                    <p>Authors: {this.state.authors.map((author, key) => {
                            const aLenght = this.state.authors.length;
                            if (key === (aLenght - 1)) {
                                return (author.fname + " " + author.lname + "")
                            } else {
                                return (author.fname + " " + author.lname + ",")
                            }
                        }
                    )}</p>
                    <button className='closeButton' onClick={this.props.closePopup}>X</button>
                </div>
            </div>
        );
    }
}

export default BookPopup;
