import React from 'react';
import axios from 'axios';
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

		axios.post(`/email/send`, 
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
				<form id='email' action='/' method="POST" onSubmit={(e) => this.handlePost(e)}>
					<div className="name-email-subject"> 
					<div className="input-error-container">
						<b>Name</b>
						<input 
							name='name' 
							onChange={(e) => this.setState({name: e.target.value})} 
						/>
						<div className="error-box">
							<b className="error-text">{this.state.errors.name}</b>
						</div>
					</div>

					<div className="input-error-container">
						<b>Email</b>
						<input 
							name='email' 
							onChange={(e) => this.setState({email: e.target.value})}
						/>
						<div className="error-box">
							<b className="error-text">{this.state.errors.email}</b>
						</div>
					</div>

					<div className="input-error-container">
						<b>Subject</b>
						<input 
							name='subject' 
							onChange={(e) => this.setState({subject: e.target.value})}
						/>
						<div className="error-box">
							<b className="error-text">{this.state.errors.subject}</b>
						</div>
					</div>
					</div>
					<span className="separator"></span>
					<div className="message-container">
					<div className="input-error-container">
						<b>Message</b>
						<textarea 
							name="message" 
							id='email' 
							cols="50"  
							onChange={(e) => this.setState({message: e.target.value})}
						/>
						<div className="error-box">
							<b className="error-text">{this.state.errors.message}</b>
						</div>
					</div>
					</div>
					<button type='submit' >SEND</button>
				</form>

			
			</div>
		);
	}
}
