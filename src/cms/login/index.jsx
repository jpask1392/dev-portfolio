import React from "react"
import LoginForm from "./LoginForm.jsx"
import Background from "../../common/background.jsx"

const Login = props => {
	return (
		<div style={{ width: "100%", height: "100vh", position: "relative" }}>
			<Background />
			<div className='center-to-parent'>
				<LoginForm />
			</div>
		</div>
	)
}

export default Login
