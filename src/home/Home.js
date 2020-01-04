import React, { Component } from 'react';
import './Home.css';
import Wall from '../common/login.jpeg'
class Home extends Component {
    render() {
        return (
            <div className="home-container">
                <img src={Wall} alt="library "></img>
            </div>
        )
    }
}

export default Home;
