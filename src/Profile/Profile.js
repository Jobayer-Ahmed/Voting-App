import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Redirect } from 'react-router';
import { Link } from "react-router-dom";
import autoBind from "react-autobind"
let login, username;
const dateExt = (str) => {
    if (parseInt(str, 10) === 1) {
        return `${str}st`;
    } else if(parseInt(str, 10) === 2) {
        return `${str}nd`;
    } else if(parseInt(str, 10) === 3) {
        return `${str}rd`;        
    } else {
        return `${str}th`;
    }
};
const months = (str) => {
    let month = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return month[parseInt(str, 10)+1];
}
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataset: {},
            options: 'adada'
        }
        autoBind(this);
    }
    componentWillMount() {
        const ref = this;
        let token = localStorage.getItem("token");
        if (token) {
            localStorage.setItem("name", jwt_decode(token).data.name);
            username = localStorage.getItem("username");
            login = localStorage.getItem("login");
        }
        if (login === "true") {
            login = true;
        } else {
            login = false;
        }
        axios.get(`https://gravel-coals.glitch.me/user-polls/${username}`)
            .then((res) => {
                ref.setState({
                    dataset: res.data
                });
            })
            .catch((err) => {
                console.log('No polls right now');
            });
    }

    putVote(id) {
        const ref = this;
        let data = {id: id, vote: ref.state.options};
        axios({
             method: 'put',
            url: 'https://gravel-coals.glitch.me/polls',
            data: data
        })
        .then((res) => {
            if (res.status === 200) {
                alert("Successfully voted");
	            window.location.href = "http://fcc-voting-apps.surge.sh/";
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    deletePoll(id) {
    	if (window.confirm('Are you sure?')) {
    		axios({
	            method: 'delete',
	            url: `https://gravel-coals.glitch.me/polls/${id}`,
	            data: id
	        })
	        .then((res) => {
	            if (res.status === 200) {
	                alert("Successfully Deleted");
	                window.location.href = "http://fcc-voting-apps.surge.sh/";
	            }
	        })
	        .catch((err) => {
	            console.log(err);
	        })
    	}
    }

    render() {
        let {dataset} = this.state, data = [];
    	if(!this.props.isLogedIn && !login) {
		    return <Redirect to='/login'/>;
    	}
        if (dataset.length) {
            // console.log(dataset);
            dataset.map((el, i) => {
                let date_time = new Date(el.createdAt);
                let date = `${dateExt(date_time.getDate())} ${months(date_time.getMonth())} ${date_time.getFullYear()}`;
                return data.push(
                    <div className="col-lg-4 col-md-4 col-sm-6 col-12" key={i}>
                    	<div className="delete" onClick={() => this.deletePoll(el._id)}>X</div>
                        <div className="card">
                            <div className="container-fluid">
                            	<h3 className="text-success">{el.name}</h3>
                                <hr/>
                                <p className="dateWithAuthor">
                                    <span className="date text-info text_small">{date}</span>
                                </p>
                                <h6 className="text-warning"><b>Options:</b></h6>
                                <div className="options">
                                    {
                                        el.options.map((el, i) => {
                                            // console.log(el);
                                            let id = el._id
                                            return (
                                                <div key={i}>
                                                    <label>
                                                        <input type="radio" value={el.name} value={el._id} checked={this.state.options === id} onChange={(e) => this.setState({options: e.target.value})}/> &nbsp;
                                                        {`${el.name} `}
                                                        <span className="text-right text-warning">{`${el.votes}`}</span>
                                                    </label>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="submit text-right">
                                    <button className="btn btn-warning" onClick={() => this.putVote(el._id)}>Vote</button>
                                </div>
                                <br/>
                            </div>
                        </div>
                    </div>
                )
            })
        } else {
        }
        return (
            <div className="Profile">
                <div className="container">
                    <br/>
                    <h1 className="text-center text-danger">Welcome back {localStorage.getItem("name")}</h1>
                    <h3 className="text-center text-success">Polls you're created</h3>
                    <hr/>
                    <br/>
                    <br/>
                    <div className="row">{data}</div>
                </div>
            </div>
        );
    }
}

export default Profile;