import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { Redirect } from 'react-router'
import axios from 'axios';

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			email: '',
			name: ''
		};
		autoBind(this);
		document.title = 'Voting Apps | Create new account';
	}

	submitForm(e) {
		e.preventDefault();
		const ref = this;
		const emailTester = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (ref.state.password.length > 7) {
			if (emailTester.test(String(ref.state.email).toLowerCase())) {
				axios.post('https://gravel-coals.glitch.me/register', {
					username: ref.state.username,
					password: ref.state.password,
					name: ref.state.name,
					email: ref.state.email
				})
				.then((res) => {
					localStorage.setItem("token", JSON.stringify(res.data));
					localStorage.setItem("name", JSON.stringify(ref.state.name));
					localStorage.setItem("login", true);
					localStorage.setItem("username", ref.state.username);
					window.location.href = "http://fcc-voting-apps.surge.sh/";
	        		// window.location.reload();
				})
				.catch((err) => {
					alert("This Username is already been registered");
					console.log(err);
				})
			} else {
				alert('Email is not valid');
			}
		} else {
			if (ref.state.password.length < 7) {
				alert("Password is Too short. It must be contain more then 8 character, 1 number and 1 uppercase letter");
			} else {
				alert("Password must be contain atlast 1 number and 1 uppercase letter");
			}
		}
	}

    render() {
    	const ref = this;
    	if (ref.props.isLogedIn) {
		    return <Redirect to='/'/>;
    	}
        return (
            <div className="Signup">
            	<div className="container">
            		<br/>
            		<br/>
            		<h2>Create New Account</h2>
            		<hr/>
            		<br/>
	            	<form onSubmit={ref.submitForm}>
	            		<label>Full Name <span className="required"></span></label>
						<input type="text" className="form-control" name="name" value={ref.state.name} onChange={(e) => ref.setState({name: e.target.value})} placeholder="Full Name"/>
						<br/>
	            		<label>Email Address</label>
						<input type="text" className="form-control" name="email" value={ref.state.email} onChange={(e) => ref.setState({email: e.target.value})} placeholder="Email Address"/>
						<br/>
	            		<label>Username <span className="required"></span></label>
						<input type="text" className="form-control" name="username" value={ref.state.username} onChange={(e) => ref.setState({username: e.target.value})} placeholder="Username"/>
	            		<br/>
	            		<label>Password <span className="required"></span> <br/> <span className="black">must contain 1 number and 1 uppercase letter</span></label>
	            		<input type="password" className="form-control" name="password" value={ref.state.password} onChange={(e) => ref.setState({password: e.target.value})} placeholder="Password"/>
	            		<br/>
	            		<button className="btn btn-info">Sign up</button>
	            	</form>
            	</div>
            </div>
        );
    }
}

export default Signup;