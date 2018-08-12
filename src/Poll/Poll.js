import React, { Component } from 'react';

class Poll extends Component {
    render() {
    	console.log(this.props.data);
        return (
            <div className="Poll">
                <h1>Hello World</h1>
            </div>
        );
    }
}

export default Poll;