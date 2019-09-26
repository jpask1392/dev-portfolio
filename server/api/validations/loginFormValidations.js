import { is_string_empty } from "./validationFunctions.js"

export function backendValidations(req) {
	const errList = {}

	// IS REQ.NAME EMPTY
	if (is_string_empty(req.body.name)) {
		errList.name = "* Name can not be empty"
	}

	if (is_string_empty(req.body.email)) {
		errList.email = "* Email can not be empty"
	}

	if (is_string_empty(req.body.subject)) {
		errList.subject = "* Please enter a subject"
	}

	if (is_string_empty(req.body.message)) {
		errList.message = "* Please enter a message"
	}

	return errList
}

export function frontendValidations(formData) {
	const errList = []

	if (is_string_empty(formData.username)) {
		errList.push("* Please enter a valid username")
	}

	if (is_string_empty(formData.password)) {
		errList.push("* Please enter a password")
	}

	return errList
}
