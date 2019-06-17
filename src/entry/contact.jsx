import React from 'react';
import './contact.scss';
import '../common/common.scss';
import Form from './form.jsx';

export default class contact extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="full-width">
			<div id="contact-container" ref={this.props.contactRefProp}>
				<div>
					<h1>Contact</h1>
					<Form />
					<p>
						<b>Instagram</b>
						<b>Linkedin</b>
					</p>
				</div>
			</div>
			</div>		
		);
	}
}
