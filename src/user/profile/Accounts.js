import React from 'react';
import './accounts.css';
import {Button} from 'reactstrap';
import axios from 'axios'

class Accounts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currency: "",
            open: 0,
            accounts: [],
        }

    }

    getResult = currency => {
        axios.get("http://localhost:8080/accounts/" + currency, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
            .then(response => this.setState({accounts: response.data}))
    }

    openStep = number => {
        if (number === this.state.open) {
            this.setState({open: 0})
        } else {
            this.setState({open: number})
        }
    }

    render() {
        return (
            <div className="App">
                <div className="table">
                    <div className="column">
                        <Button color="btn btn-info" onClick={() => {
                            this.openStep(1);
                            this.getResult('RON')
                        }}>RON</Button>
                        <div className={this.state.open === 1 ? "column-body open" : "column-body"}>
                            {this.state.accounts.map((item, key) =>
                                <div className="item">
                                    <p>Id: </p><p>{item.externalId}</p>
                                    <p>Balance: </p><p>{item.balance}</p>
                                    <p>Currency: </p><p>{item.currency}</p>
                                    <p>Open date: </p><p>{item.openDate}</p>
                                    <p>Transactions :{item.transactions.map((transaction, key) =>
                                        <div>
                                            <p>Id:</p>
                                            <p>{transaction.externalId}</p>
                                            <p>Amount:</p>
                                            <p>{transaction.amount}</p>
                                            <p>Transaction type :</p>
                                            <p>{transaction.transactionType}</p>
                                        </div>
                                    )}</p>
                                </div>,
                            )}
                        </div>

                    </div>

                    <div className="column">
                        <Button color="btn btn-info" onClick={() => {
                            this.openStep(2);
                            this.getResult('DOLLAR')
                        }}>DOLLAR</Button>
                        <div className={this.state.open === 2 ? "column-body open" : "column-body"}>
                            {this.state.accounts.map((item, key) =>
                                <div className="item">
                                    <p>Id: </p><p>{item.externalId}</p>
                                    <p>Balance: </p><p>{item.balance}</p>
                                    <p>Currency: </p><p>{item.currency}</p>
                                    <p>Open date: </p><p>{item.openDate}</p>
                                    <p>Transactions :{item.transactions.map((transaction, key) =>
                                        <div>
                                            <p>Id:</p>
                                            <p>{transaction.externalId}</p>
                                            <p>Amount:</p>
                                            <p>{transaction.amount}</p>
                                            <p>Transaction type :</p>
                                            <p>{transaction.transactionType}</p>
                                        </div>
                                    )}</p>
                                </div>
                            )}
                        </div>

                    </div>

                    <div className="column">
                        <Button color="btn btn-info" onClick={() => {
                            this.openStep(3);
                            this.getResult('EURO')
                        }}>EURO</Button>
                        <div className={this.state.open === 3 ? "column-body open" : "column-body"}>
                            {this.state.accounts.map((item, key) =>
                                <div className="item">
                                    <p>Id: </p><p>{item.externalId}</p>
                                    <p>Balance: </p><p>{item.balance}</p>
                                    <p>Currency: </p><p>{item.currency}</p>
                                    <p>Open date: </p><p>{item.openDate}</p>
                                    <p>Transactions :{item.transactions.map((transaction, key) =>
                                        <div>
                                            <p>Id:</p>
                                            <p>{transaction.externalId}</p>
                                            <p>Amount:</p>
                                            <p>{transaction.amount}</p>
                                            <p>Transaction type :</p>
                                            <p>{transaction.transactionType}</p>
                                        </div>
                                    )}</p>
                                </div>
                            )}
                        </div>

                    </div>


                </div>
            </div>
        );
    }
}

export default Accounts;
