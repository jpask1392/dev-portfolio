import React from 'react';
import Form from './form.jsx';

export default class contact extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
		
			<div id="contact-container" ref={this.props.contactRefProp}> <div>
					<h1>Contact</h1>
					<hr></hr>
					<Form />
					<p>
						<a href="https://www.instagram.com/jpaskart/" target="_blank">
							<i className="fab fa-instagram"></i>
						</a>
						<a href="https://github.com/jpask1392" target="_blank">
							<i className="fab fa-github-square"></i>
						</a>
						<a href="https://www.linkedin.com/in/jamie-pask/" target="_blank">
							<i className="fab fa-linkedin"></i>
						</a>
					</p>
				</div>
			</div>
		
		);
	}
}
