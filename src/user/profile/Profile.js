import React, { Component } from 'react';
import './Profile.css';
import Accounts from './Accounts';
class Profile extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }
    render() {
        return (

            <div className="profile-container">
                <h1>{this.props.currentUser.name.toUpperCase()+'s'+' accounts'}</h1>
                <div className="container">
                    <div className="profile-info">

                       <Accounts/>

                    </div>
                </div>

            </div>

        );
    }
}

export default Profile;
