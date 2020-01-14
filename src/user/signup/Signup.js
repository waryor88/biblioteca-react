import React, { Component } from 'react';
import './Signup.css';
import { Link, Redirect } from 'react-router-dom'
import { signup } from '../../util/APIUtils';
import Alert from 'react-s-alert';

class Signup extends Component {
    render() {
        if(this.props.authenticated) {
            return <Redirect
                to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>;            
        }

        return (
            <div className="signup-container">
                <div className="signup-content">
                    <h1 className="signup-title">Signup before using library app</h1>

                    <SignupForm {...this.props} />
                    <span className="login-link">Already have an account? <Link to="/login">Login!</Link></span>
                </div>
            </div>
        );
    }
}



class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            fname:'',
            lname:'',
            tel:'',
            address:'',
            adminKey:''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        });        
    }

    handleSubmit(event) {
        event.preventDefault();   

        const signUpRequest = Object.assign({}, this.state);

        signup(signUpRequest)
        .then(response => {
            Alert.success("You're successfully registered. Please login to continue!");
            this.props.history.push("/login");
        }).catch(error => {
            Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');            
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-item">
                    <p>Admin key</p>
                    <input type="text" name="adminKey"
                           className="form-control" placeholder="AdminKey"
                           value={this.state.adminKey} onChange={this.handleInputChange}/>
                </div>
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
                           value={this.state.tel} onChange={this.handleInputChange} />
                </div>
                <div className="form-item">
                    <p>Address</p>
                    <input type="text" name="address"
                           className="form-control" placeholder="Address"
                           value={this.state.address} onChange={this.handleInputChange} />
                </div>
                <div className="form-item">
                    <p>Email</p>
                    <input type="email" name="email" 
                        className="form-control" placeholder="Email"
                        value={this.state.email} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <p>Password</p>
                    <input type="password" name="password" 
                        className="form-control" placeholder="Password"
                        value={this.state.password} onChange={this.handleInputChange} required/>
                </div>
                <div className="form-item">
                    <button type="submit" className="btn btn-block btn-primary" >Sign Up</button>
                </div>
            </form>                    

        );
    }
}

export default Signup
