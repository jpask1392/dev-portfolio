import React from 'react';

export default class Input extends React.Component {
	// static propTypes = {
	// 	name: React.PropTypes.string,
	// };

	constructor(props) {
		super(props);
		this.state = {mode: "view"}
	}

	onClick = () => {
		if (this.state.mode === "view") {
			this.setState({mode:"edit"})
		} else {
			this.setState({mode:"view"})
		}
	}

	// save button will need to push the changed data to the database

	render() {
		return this.state.mode === "view" ? 
			<div onDoubleClick={() => this.onClick()}> Hello <button onClick={() => this.onClick()}>Edit</button></div> : 
			<div> Input<input/> <button onClick={() => this.onClick()}>Save</button></div>
	}
}
