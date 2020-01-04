import React from 'react'
import './books.css'
import axios from 'axios'
import './util.css'
import './main.css'

class Books extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            delimitator: "",
            criteria: "",
            query: "",
            bookId: ""
        }
    }

    getBook = () => {
        axios.get('http://localhost:8080/book/search?criteria=' + this.state.criteria + '&query=' + this.state.query, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
            .then(response => this.setState({books: response.data}))

    }


    getResult = () => {
        axios.get('http://localhost:8080/book', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
            .then(response => this.setState({books: response.data}))
    }

    componentDidMount() {
        this.getResult()
    }

    render() {
        return (
            <div className="booksContainer">
                <div className="rowContainer">
                    <input onChange={(e) => this.setState({query: e.target.value})} type="text"
                           placeholder="Search book by"></input>

                    <select className="select-style" onChange={(e) => this.setState({criteria: e.target.value})}>
                        <option value="author">Author</option>
                        <option value="title">Title</option>
                        <option value="bookType">Type</option>
                        <option value="year">Year</option>
                    </select>

                    <button className="button-class" onClick={this.getBook}>Search</button>
                </div>
                <table className="cinereousTable">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Year</th>
                        <th>Authors</th>
                        <th>Loan</th>
                    </tr>
                    </thead>

                    <tbody>

                    {this.state.books.map((item, key) => <tr>
                        <td>{item.title}</td>
                        <td>{item.bookType}</td>
                        <td>{item.year}</td>
                        <td>{item.authors.map((author, key) => {
                                const aLenght = item.authors.length;
                                if (key === (aLenght - 1)) {
                                    return (author.fname + " " + author.lname + "")
                                } else {
                                    return (author.fname + " " + author.lname + ",")
                                }
                            }
                        )}</td>
                        <td>
                            <button className="table-button"
                                    onClick={() => localStorage.setItem("bookId", item.externalId)}>Loan this book
                            </button>
                        </td>
                    </tr>)

                    }

                    </tbody>
                </table>
            </div>

        )

    }
}

export default Books;
