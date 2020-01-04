import React from 'react'
import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table'

import './loans.css'
import axios from 'axios'
import './util.css'
import './main.css'
import bookIcon from './book-icon.png'
import {ifElse} from "@progress/kendo-data-query/dist/npm/funcs";
class Popup extends React.Component {
    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <h1>{this.props.text}</h1>
                    <button onClick={this.props.closePopup}>close me</button>
                </div>
            </div>
        );
    }
}
class Loans extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         books: [],
    //         delimitator: "",
    //         criteria: "title",
    //         query: "mamaliga",
    //         bookId:""
    //     }
    // }
    //
    //
    // render() {
    //     return (
    //
    //         <div><p>Loan component</p></div>
    //
    //     )
    // }

    constructor(props) {
        super(props);
        this.state = {
            showPopup: false
        };
    }
    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
    render() {
        return (
            <div className='app'>
                <h1>hihi</h1>
                <button onClick={this.togglePopup.bind(this)}>show popup</button>
                <button onClick={() => {alert('woooooooot?');}}>try me when popup is open</button>
                {this.state.showPopup ?
                    <Popup
                        text='Close Me'
                        closePopup={this.togglePopup.bind(this)}
                    />
                    : null
                }
            </div>
        );
    }







}

export default Loans;
