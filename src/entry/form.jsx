import React from "react"
import axios from "axios"
import NextButton from "../common/nextButton.jsx"

const credentials = require("../../server/api/credentials.json")

export default class Form extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: "",
			email: "",
			subject: "",
			message: "",
			errors: {}
		}

		this.handlePost = this.handlePost.bind(this)
	}

	handlePost = e => {
		e.preventDefault()

		axios
			.post(`/email/send`, {
				name: this.state.name,
				email: this.state.email,
				subject: this.state.subject,
				message: this.state.message
			})
			.then(res => {
				res.data.redirect == "/sent"
					? (window.location = "/sent")
					: this.setState({ errors: res.data })
			})
	}

	// handle errors client side before sending

	render() {
		return (
			<div id='form-container'>
				<h2 style={{ color: "white" }}>Thank you</h2>
				<form
					id='email'
					action='/'
					method='POST'
					onSubmit={e => this.handlePost(e)}>
					<dl>
						<dt>Name</dt>
						<dd>
							<input
								name='name'
								onChange={e =>
									this.setState({ name: e.target.value })
								}
							/>
							<div className='error-box'>
								<b className='error-text'>
									{this.state.errors.name}
								</b>
							</div>
						</dd>

						<dt>Email</dt>
						<dd>
							<input
								name='email'
								onChange={e =>
									this.setState({ email: e.target.value })
								}
							/>
							<div className='error-box'>
								<b className='error-text'>
									{this.state.errors.email}
								</b>
							</div>
						</dd>

						<dt>Subject</dt>
						<dd>
							<input
								name='subject'
								onChange={e =>
									this.setState({ subject: e.target.value })
								}
							/>
							<div className='error-box'>
								<b className='error-text'>
									{this.state.errors.subject}
								</b>
							</div>
						</dd>

						<dt>Message</dt>
						<dd style={{ flexGrow: "1", position: "relative" }}>
							<textarea
								name='message'
								id='email'
								cols='50'
								onChange={e =>
									this.setState({ message: e.target.value })
								}
							/>
							<div className='error-box'>
								<b className='error-text'>
									{this.state.errors.message}
								</b>
							</div>
						</dd>
					</dl>

					<button type='submit' style={{ alignSelf: "flex-end" }}>
						<NextButton color='white' text='Send' />
					</button>
				</form>
			</div>
		)
	}
}
