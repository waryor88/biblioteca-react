import React, {Component} from 'react';
import './admin.css';
import {Link, Redirect} from 'react-router-dom'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import axios from "axios";

class AdminComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            delimitator: "",
            criteria: "author",
            query: "",
            bookId: "",
            book: "",
            postBook: '',
            title: '',
            bookType: '',
            year: '',
            externalId: '',
            deletedBook:false,
            postAuthor:''


        }
    }

    buttonDelete = () => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () =>{ this.deleteBook();this.getResult();this.getResult()}
                },
                {
                    label: 'No',
                    onClick: () => this.getResult()
                }
            ]
        })
    };

    getBook = () => {
        axios.get('http://localhost:8080/book/search?criteria=' + this.state.criteria + '&query=' + this.state.query, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
            .then(response => this.setState({books: response.data, query: ""}))

    }
    deleteBook = () => {
        axios.delete('http://localhost:8080/book/delete/' + localStorage.getItem('bookId'), {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
            .then(() => window.alert("Book succesfully deleted !"))

    }

    componentDidMount() {
        this.getResult()
    }

    getResult = () => {
        axios.get('http://localhost:8080/book', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
            .then(response => this.setState({books: response.data}))
    }

    setBook = () => {
        this.setState({externalId: localStorage.getItem('bookId')}
        )
    }

    setData = () => {
        this.setState({
            postBook: JSON.stringify({
                externalId:localStorage.getItem('bookId'),
                title: this.state.title,
                year: this.state.year,
                bookType: this.state.bookType
            })
        })
    }


    editTheBook = () => {
        axios.put('http://localhost:8080/book', this.state.postBook
            , {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                    'Content-Type': 'application/json',
                }
            }
        )

    }

    render() {
        if (this.props.authenticated) {
            return <Redirect
                to={{
                    pathname: "/",
                    state: {from: this.props.location}
                }}/>;
        }

        return (
            <div className="allContainer">
                <div className="signup-container">
                    <div className="signup-content rightSide">
                        <h1 className='signup-title'>Author details</h1>
                        <AddAuthorForm {...this.props}/>
                    </div>
                    <div className="signup-content leftSide">
                        <h1 className="signup-title">Book details</h1>
                        <AddBookForm {...this.props}/>
                    </div>
                </div>
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

                        <button className="button-class" onClick={() => {
                            this.getBook()
                        }}>Search
                        </button>
                    </div>
                    <table onMouseOver={() => {
                        this.setBook()
                    }} className="cinereousTable">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Year</th>
                            <th>Authors</th>
                            <th>Loan</th>
                        </tr>
                        </thead>

                        <tbody>

                        {this.state.books.map((item, key) => <tr>
                            <td>{item.externalId}</td>
                            <td><input onChange={(e) => this.setState({title: e.target.value})} className="centerInput"
                                       type="text"
                                       placeholder={item.title}></input></td>
                            <td><input onChange={(e) => this.setState({bookType: e.target.value})}
                                       className="centerInput" type="text"
                                       placeholder={item.bookType}></input></td>
                            <td><input onChange={(e) => this.setState({year: e.target.value})} className="centerInput"
                                       type="text"
                                       placeholder={item.year}></input></td>
                            <td>{item.authors.map((author, key) => {
                                    const aLenght = item.authors.length;
                                    if (key === (aLenght - 1)) {
                                        return (author.fname + " " + author.lname + "")
                                    } else {
                                        return (author.fname + " " + author.lname + ",")
                                    }
                                }
                            )}</td>
                            <td onMouseOver={() => {
                                {
                                    localStorage.setItem("bookId", item.externalId)
                                }
                                ;
                                {
                                    this.setData()
                                }
                            }}>
                                <button className="table-button"
                                        onClick={async () => {
                                            {
                                                {
                                                    this.setData()
                                                }
                                                ;
                                                {
                                                    this.editTheBook()
                                                }
                                                ;
                                                {
                                                    await this.getBook()
                                                }
                                                ;
                                                {
                                                    alert("Book succesfully updated !")
                                                }
                                            }
                                        }}>Edit book
                                </button>
                                <button onClick={()=>{this.buttonDelete()}} className="table-button">Delete book</button>
                            </td>
                        </tr>)

                        }

                        </tbody>
                    </table>
                </div>
            </div>

        );
    }
}

class AddBookForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            bookType: '',
            year: '',
            bookPost: '',
            authorId:'',
            bookId:''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


   async handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
       await this.setState({
            postBook: JSON.stringify({
                title: this.state.title,
                year: this.state.year,
                bookType: this.state.bookType

            })
        })
        this.setState({
            [inputName]: inputValue
        });
    }

    handleSubmit=()=> {
        axios.post('http://localhost:8080/book', this.state.postBook
            , {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                    'Content-Type': 'application/json',
                }
            }
        )
    }
    handlePut=()=> {
        axios.post('http://localhost:8080/author/'+this.state.authorId+'/assign/'+this.state.bookId, '',
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                    'Content-Type': 'application/json',
                }
            }
        ).then(window.alert("Assign succesfully !"))
    }

    render() {
        return (

            <form>
                <div className="form-item">
                    <p>Title</p>
                    <input type="text" name="title"
                           className="form-control" placeholder="Title"
                           value={this.state.title} onChange={this.handleInputChange} required/>
                </div>

                <div className="form-item">
                    <p>Year</p>
                    <input type="text" name="year"
                           className="form-control" placeholder="Year"
                           value={this.state.year} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <p>Book type</p>
                    <input type="text" name="bookType"
                           className="form-control" placeholder="BookType"
                           value={this.state.bookType} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <button onClick={() => {
                        {
                            this.handleSubmit()
                        }

                        {
                            window.alert("Book succesfully added !")
                        }

                    }} type="submit" className="btn btn-block btn-primary">Add book
                    </button>
                </div>
                <br></br>

                <div className="form-item">
                    <p>AuthorId</p>
                    <input type="text" name="authorId"
                           className="form-control" placeholder="authorId"
                           value={this.state.authorId} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <p>BookId</p>
                    <input type="text" name="bookId"
                           className="form-control" placeholder="bookId"
                           value={this.state.bookId} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <button onClick={() => {
                        {
                            this.handlePut()
                        }


                    }} type="submit" className="btn btn-block btn-primary">Assign author to book
                    </button>
                </div>




            </form>


        );
    }
}

class AddAuthorForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            email: '',
            fname: '',
            lname: '',
            tel: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        await this.setState({
            postAuthor: JSON.stringify({
                address: this.state.address,
                email: this.state.email,
                fname: this.state.fname,
                lname:this.state.lname,
                tel:this.state.tel
            })
        })
        this.setState({
            [inputName]: inputValue
        });
    }

    handleSubmit=()=> {
        axios.post('http://localhost:8080/author', this.state.postAuthor
            , {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                    'Content-Type': 'application/json',
                }
            }
        )
    }

    render() {
        return (

            <form onChange={this.handleInputChange}>
                <div className="form-item">
                    <p>First name</p>
                    <input type="text" name="fname"
                           className="form-control" placeholder="FirstName"
                           value={this.state.fname} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <p>Last name</p>
                    <input type="text" name="lname"
                           className="form-control" placeholder="LastName"
                           value={this.state.lname} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <p>Phone number</p>
                    <input type="text" name="tel"
                           className="form-control" placeholder="PhoneNumber"
                           value={this.state.tel} onChange={this.handleInputChange}/>
                </div>
                <div className="form-item">
                    <p>Address</p>
                    <input type="text" name="address"
                           className="form-control" placeholder="Address"
                           value={this.state.address} onChange={this.handleInputChange}/>
                </div>
                <div className="form-item">
                    <p>Email</p>
                    <input type="email" name="email"
                           className="form-control" placeholder="Email"
                           value={this.state.email} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <button onClick={() => {
                        {
                            this.handleSubmit()
                        }

                        {
                            window.alert("Author succesfully added !")
                        }

                    }} type="submit" className="btn btn-block btn-primary">Add author</button>
                </div>
            </form>


        );
    }
}


export default AdminComponent
