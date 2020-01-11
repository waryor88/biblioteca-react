import React from 'react'
import './loans.css'
import axios from 'axios'
import './util.css'
import './main.css'
import './bookPopup.css'
import BookPopup from './BookPopup'
class Loans extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loans: [],
            criteria: "",
            book:"",
            query: "",
            loanId: "",
            showPopup: false
        }

    }
    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }



    getResult = () => {
        axios.get('http://localhost:8080/loan', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
            .then(response => this.setState({loans: response.data}))
    }



    componentDidMount() {
        this.getResult()
    }

    render() {
        return (
            <div className="loansContainer">
                <table className="cinereousTable">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Loan date</th>
                        <th>Return date</th>
                        <th>Loaned books</th>

                    </tr>
                    </thead>

                    <tbody>

                    {this.state.loans.map((item, key) => <tr>
                        <td>{item.externalId}</td>
                        <td>{item.loanDate}</td>
                        <td>{item.returnDate}</td>
                        <td>{item.loanBooks.map((loanBook, key) => {
                                const aLenght = item.loanBooks.length;
                                if (key === (aLenght - 1)) {
                                    return (loanBook.title + " " + "")
                                } else {
                                    return (loanBook.title + " " +",")
                                }
                            }
                        )}
                            <button className="table-button"
                                    onClick={() =>{ {this.togglePopup()};{localStorage.setItem("loanId", item.externalId)}}}>info
                            </button>
                        </td>

                    </tr>)

                    }

                    </tbody>
                </table>
                {this.state.showPopup ?
                    <BookPopup
                        text='Close Me'
                        closePopup={this.togglePopup.bind(this)}
                    />
                    : null
                }
            </div>

        )

    }
}

export default Loans;
