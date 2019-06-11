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
			<div id="contact-container" className="container-max" ref={this.props.contactRefProp}>
				<div id="contact-inner-container">
					<div id="contact-text-container">
						<h1>Drop a message</h1>
						<hr></hr>
						<div>
							<b className="sub-heading">The Socials</b>
							<p>
								<b>Instagram</b> @jamiepask92 
								<br></br>
								<b>Linkedin</b> jamiepask
							</p>
						</div>
					</div>
					<Form />
				</div>
			</div>			
		);
	}
}
