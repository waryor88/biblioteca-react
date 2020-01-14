import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './AppHeader.css';
import axios from "axios";
import bookLogo from '../common/bookLogo.png'
class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdmin:false,
            emptyBody:''
        }
    }
    checkAdmin = () => {
        axios.post('http://localhost:8080/isAdmin', this.state.emptyBody,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            .then(response => this.setState({isAdmin: response.data}))

    }
    componentDidMount() {
        this.checkAdmin()
    }
    renderAdminButton = () => {
        if(this.state.isAdmin)
            return 1;

    }




    render() {
        return (
            <header className="app-header">
                <div className="container">
                    <div className="app-branding">
                        <Link to="/" className="app-title">
                            <img className='logoBook' src={bookLogo}></img>
                            </Link>
                    </div>
                    <div className="app-options">
                        <nav className="app-nav">
                                { this.props.authenticated ? (
                                    <ul>
                                        <li>
                                            <NavLink to="/profile">Profile</NavLink>
                                            <NavLink to="/books">Books</NavLink>
                                            <NavLink to="/loans">My loans</NavLink>
                                            {this.renderAdminButton() &&
                                            <NavLink to="/admin">Admin panel</NavLink>
                                            }
                                        </li>
                                        <li>
                                            <a onClick={this.props.onLogout}>Logout</a>
                                        </li>
                                    </ul>
                                ): (
                                    <ul>
                                        <li>
                                            <NavLink to="/login">Login</NavLink>        
                                        </li>
                                        <li>
                                            <NavLink to="/signup">Signup</NavLink>        
                                        </li>
                                    </ul>
                                )}
                        </nav>
                    </div>
                </div>
            </header>
        )
    }
}

export default AppHeader;
