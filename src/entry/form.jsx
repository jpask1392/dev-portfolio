import React from 'react';
import styles from './form.scss'

export default class Form extends React.Component {

	constructor(props) {
		super(props);
	}

	handleClick(e) {
		// e.preventDefault();
	}

	render() {
		return (
			<div id='form-container'>
				<b>EMAIL</b>
				<form id='email' action='/' method="post">
					<input name='name' defaultValue='name' />
					<input name='email' defaultValue='email' />
					<input name='subject' defaultValue='subject' />
					<textarea id='email' rows="10" cols="50" name="comment" />

					<button onClick={this.handleClick } type='submit'></button>
				</form>
			</div>
		);
	}
}
