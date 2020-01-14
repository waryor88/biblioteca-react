import React, { Component } from 'react';
import './Profile.css';
class Profile extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (

            <div className="profile-container">
                <div className="container">
                    <div className="profile-info">
                        <p>User details</p>
                        <p>User id: {this.props.currentUser.reader.externalId.toUpperCase()}</p>
                        <p>First name: {this.props.currentUser.reader.fname.toUpperCase()}</p>
                        <p>Last name: {this.props.currentUser.reader.lname.toUpperCase()}</p>
                        <p>Phone number: {this.props.currentUser.reader.tel.toUpperCase()}</p>
                        <p>Address: {this.props.currentUser.reader.address.toUpperCase()}</p>
                        <p>Email: {this.props.currentUser.reader.email.toUpperCase()}</p>
                    </div>
                </div>

            </div>

        );
    }
}

export default Profile;
