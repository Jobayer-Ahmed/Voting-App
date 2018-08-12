import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Redirect } from 'react-router'
import axios from 'axios';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
		};
		autoBind(this);
		document.title = 'Voting Apps | Login your account';
	}

	submitForm(e) {
		const ref = this;
		e.preventDefault();
		axios.post('https://gravel-coals.glitch.me/login', {
			name: ref.state.username,
			password: ref.state.password
		})
		.then((res) => {
			if (res.status === 200) {
				localStorage.setItem("login", true);
				localStorage.setItem("token", JSON.stringify(res.data));
				localStorage.setItem("username", ref.state.username);
				window.location.href = "http://fcc-voting-apps.surge.sh/";
				// window.location.reload();
			}
		})
		.catch((err) => {
			alert("No user found");
		})
	}

    render() {
    	const ref = this;
    	if (this.props.isLogedIn) {
		    return <Redirect to='/'/>;
    	}
        return (
            <div className="Login">
            	<div className="container">
            		<br/>
            		<br/>
            		<h2>Login Your Account</h2>
            		<hr/>
            		<br/>
	            	<form onSubmit={ref.submitForm}>
	            		<label>Username <span className="required"></span></label>
						<input type="text" className="form-control" name="username" value={ref.state.username} onChange={(e) => ref.setState({username: e.target.value})} placeholder="Username"/>
	            		<br/>
	            		<label>Password <span className="required"></span></label>
	            		<input type="password" className="form-control" name="password" value={ref.state.password} onChange={(e) => ref.setState({password: e.target.value})} placeholder="Password"/>
	            		<br/>
	            		<button className="btn btn-success">Login</button>
	            	</form>
            	</div>
            </div>
        );
    }
}

export default Login;