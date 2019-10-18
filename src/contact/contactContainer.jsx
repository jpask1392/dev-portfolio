import React from "react"
import Contact from "../entry/contact.jsx"
import Navigation from '../common/navigation.jsx'

const ContactContainer = props => {
	return (
		<div id='contact-container' style={{ backgroundColor: "white" }}>
			<Navigation burgerColor='black' />
			<Contact isVisible={true} />
		</div>
	)
}

export default ContactContainer
