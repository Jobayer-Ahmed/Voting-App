import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Signup from './Signup/Signup';
import Login from './Login/Login';
import Profile from './Profile/Profile';
import Homepage from './Homepage/Homepage';
import CreateNewPolls from './CreateNewPolls/CreateNewPolls';
import jwt_decode from 'jwt-decode';
let token = {}, name = '', login;

class App extends Component {
    componentWillMount() {
        let item = localStorage.getItem("token");
        login = localStorage.getItem("login");
        if (login === "true") {
            login = true;
        } else {
            login = false;
        }
        if (item) {
            token = jwt_decode(item).data;
            let temp = jwt_decode(item).data.username.split('');
            temp[0] = temp[0].toUpperCase();
            name = temp.join('');
        } else {
            token = false;
        }
    }

    logout() {
        localStorage.setItem("login", false);
        window.location.reload();
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <nav className="navbar navbar-expand-lg navbar-dark dark_background">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarColor02">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/profile" className={ login ? "nav-link" : "nav-link hide" }>Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/create" className={ login ? "nav-link" : "nav-link hide" }>Create Poll</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/login" className={login ? "nav-link hide" : "nav-link" }>Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/signup" className={login ? "nav-link hide" : "nav-link"}>Signup</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/" className={ login ? "nav-link" : "nav-link hide" } onClick={this.logout}>Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <Route path="/" exact render={(isLogedIn) => <Homepage isLogedIn={login}/>} />
                    <Route path="/signup" exact render={(isLogedIn, ) => <Signup isLogedIn={login} />} />
                    <Route path="/login" exact render={(payload, isLogedIn) => <Login payload={token} isLogedIn={login} />} />
                    <Route path="/profile" exact render={(author, isLogedIn, payload, poll) => <Profile author={name} isLogedIn={login} payload={token} poll={this.poll}/>} />
                    <Route path="/create" exact render={(payload, isLogedIn) => <CreateNewPolls payload={token} isLogedIn={login} />} />
                </div>
            </Router>
        );
    }
}

export default App;