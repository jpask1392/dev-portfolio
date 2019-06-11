import React from 'react';
import axios from 'axios';
import styles from './form.scss';
import { Route, Link } from "react-router-dom";
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const credentials = require("../../server/api/credentials.json"); 

export default class Form extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			subject: '',
			message: '',
			errors: {}
		}

		this.handlePost = this.handlePost.bind(this)
	}

	handlePost = (e) => {

		e.preventDefault();

		axios.post(`http://localhost:3000/email/send`, 
			{ 	name: this.state.name, 
				email: this.state.email,
				subject: this.state.subject,
				message: this.state.message 
			})
			.then(res => {
				res.data.redirect == '/sent' ? 
				window.location = "/sent" : 
				this.setState({ errors: res.data })
			})
	}

	render() {
		return (
			<div id='form-container'>
				<b className='sub-heading'>EMAIL</b>
				<form id='email' action='/' method="POST" onSubmit={(e) => this.handlePost(e)}>
					<input name='name' placeholder='Name' onChange={(e) => this.setState({name: e.target.value})} />
					<div className="error-box"><b className="error-text">{this.state.errors.name}</b></div>
					<input name='email' placeholder='Email' onChange={(e) => this.setState({email: e.target.value})}/>
					<div className="error-box"><b className="error-text">{this.state.errors.email}</b></div>
					<input name='subject' placeholder='Subject' onChange={(e) => this.setState({subject: e.target.value})}/>
					<div className="error-box"><b className="error-text">{this.state.errors.subject}</b></div>
					<textarea name="message" id='email' rows="10" cols="50" placeholder='Message...' onChange={(e) => this.setState({message: e.target.value})}/>
					<div className="error-box"><b className="error-text">{this.state.errors.message}</b></div>
					<button type='submit' ></button>
				</form>

			
			</div>
		);
	}
}
