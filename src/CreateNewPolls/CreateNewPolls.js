import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import autoBind from 'react-autobind';

const polls = (str) => {
	let tempArr1 = str.split(', '), tempArr2 = [];
	tempArr1.map((el, i) => {
		let temp = {
			key: i,
			name: el,
			vote: 0
		}
		tempArr2.push(temp);
	});
	return tempArr2;
};

let details = {
	options: [],
	name: '',
	user: ''
};

class CreateNewPolls extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			options: ''
		}
		autoBind(this)
	}

	submitForm(e) {
		e.preventDefault();
		const ref = this;
        let id = jwt_decode(localStorage.getItem("token")).data._id, date = new Date();
		details.name = ref.state.name;
		details.user = id;
		details.options = polls(this.state.options);
		details.owner = ref.props.payload.username;
		details.author = ref.props.payload.name;
		details.createdAt = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`
		console.log(details.name, details.options, details.user, details.owner, details.createdAt);
		if (ref.state.options.length >= 1) {
			axios.post('https://gravel-coals.glitch.me/polls', {
				user: details.user,
				name: details.name,
				owner: details.owner,
				options: details.options,
				author: details.author
			})
			.then((res) => {
				ref.setState({
					name: '',
					options: '',
				});
				alert("Polls add successfully");
			})
			.catch((err) => {
				console.log(err);
			})
		}
	}

    render() {
    	const ref = this;
    	if (!this.props.isLogedIn) {
    		return <Redirect to='/login'/>;
        }
        return (
            <div className="CreateNewPolls">
                <div className="container">
                	<br/>
	        		<br/>
	        		<h2>Create New Poll</h2>
	        		<hr/>
	        		<br/>
	        		<form onSubmit={ref.submitForm}>
	        			<label className="text-warning">Poll name</label>
	        			<input type="text" className="form-control" placeholder="Polls name" value={ref.state.name} onChange={(e) => ref.setState({name: e.target.value})} />
		        		<br/>
		        		<label className="text-warning">Options are separated by comma (,)</label>
		        		<textarea name="polls-option" className="form-control" value={ref.state.options} onChange={(e) => ref.setState({options: e.target.value})} placeholder="Options" ></textarea>
		        		<br/>
		        		<button className="btn btn-success">Submit Polls</button>
	        		</form>
                </div>
            </div>
        );
    }
}

export default CreateNewPolls;