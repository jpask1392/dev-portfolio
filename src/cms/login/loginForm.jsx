import React from "react"
import { withRouter } from "react-router-dom"
import { userServices } from "./userServices"
import { frontendValidations } from "../../../server/api/validations/loginFormValidations"

class LoginForm extends React.Component {
	// Split up logic and presentational sections
	constructor(props) {
		super(props)
		this.state = { errors: [], loginAttempt: 0 }
	}

	// update errors while typing
	onChange = e => {
		const username = document.forms["loginForm"]["username"].value
		const password = document.forms["loginForm"]["password"].value

		const formData = { username: username, password: password }

		if (this.state.loginAttempt > 0) {
			e.preventDefault()
			this.setState({
				errors: frontendValidations(formData)
			})
		}
	}

	onSubmit = e => {
		// Prevent the post request until data is validated
		e.preventDefault()
		document.cookie = "username=Jamie"
		document.cookie = "password=password"

		console.log(document.cookie)

		// collect sent data
		const username = document.forms["loginForm"]["username"].value
		const password = document.forms["loginForm"]["password"].value
		const rememberMe = document.forms["loginForm"]["rememberMe"].value

		// create an object for validating
		const formData = { username: username, password: password }

		// validate on front end first
		// if no errors returned
		if (frontendValidations(formData).length === 0) {
			// Post the data to backend for cleansing
			userServices
				.login(username, password)
				// when login function is complete check session storage and redirect
				.then(() => {
					if (sessionStorage.user) {
						this.props.history.push(`/admin/dashboard`)
					} else {
						this.setState({
							errors: ["Username or Password is incorrect"]
						})
					}
				})
		}
		// if the function returns errors display them on screen
		else {
			this.setState({
				errors: frontendValidations(formData),
				loginAttempt: this.state.loginAttempt + 1
			})
		}
	}

	// check all information before posting to the endpoint
	// if there are any errors update error box in parent component --
	// need a function prop for this
	// if no userend errors pass data to backend to check database for user
	// if no backend errors add user to session and redirect to first page

	// need to add privelages to users..
	// if username is guest, disable ability to edit data

	render() {
		return (
			<div id='login-form'>
				<div className='welcome-header'>
					<h3>welcome.</h3>
				</div>
				<div className='login-form-container'>
					<div id='form-error-container'>
						{this.state.errors.map((value, i) => (
							<p key={i}>{value}</p>
						))}
					</div>
					<form
						name='loginForm'
						id='loginForm'
						method='post'
						action='/admin/login'
						onSubmit={e => this.onSubmit(e)}
						className='center-to-parent'>
						<span className='input-container'>
							<i className='fas fa-user'></i>
							<input
								name='username'
								placeholder='Username'
								onChange={e => this.onChange(e)}
							/>
						</span>
						<span className='input-container'>
							<i className='fas fa-lock'></i>
							<input
								name='password'
								placeholder='Password'
								type='password'
								onChange={e => this.onChange(e)}
							/>
						</span>

						<span id='remember-me-container'>
							<input name='rememberMe' type='checkbox' />
							<dt>Remember Me</dt>
						</span>
					</form>
				</div>
				<button form='loginForm' type='submit'>
					Login
				</button>
			</div>
		)
	}
}

// HOC passes the history object to component
export default withRouter(LoginForm)
