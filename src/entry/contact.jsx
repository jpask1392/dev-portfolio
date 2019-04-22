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
			<div id="contact-container" className="container-max">
				<div id="contact-inner-container">
					<div id="contact-text-container">
						<h1>Drop a message</h1>
					</div>
					<Form />
				</div>
			</div>			
		);
	}
}
