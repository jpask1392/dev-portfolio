import React from "react"
import Navigation from "../common/navigation.jsx"
import Contact from "./contact.jsx"

const ContactContainer = props => {
	const isVisible = props.visibleSection === "contact" ? true : false
	return (
		<div id='contact-container' ref={props.contactRefProp}>
			<Contact isVisible={isVisible} />
			<div className='contact-nav-container'>
				<Navigation />
			</div>
		</div>
	)
}

export default ContactContainer
