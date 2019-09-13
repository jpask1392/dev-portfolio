import axios from "axios"

export const userServices = {
	login,
	logout
}

// login function
// make a post request and check if username and password exist
function login(username, password) {
	return (
		axios
			.post("/users/authenticate", { username, password })
			.then(res => {
				return res.data
			})
			// if an error is returned throw a catch
			.catch(error => {
				// handle all response codes here
				if (error.response.status === 401) {
					console.log("User unauthorized")
					logout()
				}
			})
			// if no errors are returned from server
			// set user to current session
			.then(user => {
				// if there is a user in the response a user exists
				// create a session for the user
				if (user) {
					sessionStorage.setItem("user", JSON.stringify(user))
				}
			})
	)
}

// logout function
function logout() {
	// remove the current user from the session
	console.log("Logged Out")
	sessionStorage.removeItem("user")
}
