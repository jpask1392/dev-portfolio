import React from 'react';
import PropTypes from 'prop-types'

export default class ShowProject extends React.Component {
	static propTypes = {
		id: PropTypes.string,
	};

	constructor(props) {
		super(props);

		this.state = {projectData: []} 
	}

	componentDidMount = () => {
		// console.log("hi")
		fetch(`/api/projects/${this.props.id}`)
			.then(res => res.json())
			.then(data => this.setState({projectData: data}))
	}

	render() {
		return (
			<div style={{whiteSpace:"pre-wrap"}}>
				{JSON.stringify(this.state.projectData, null, 2)}
			</div>
		);
	}
}
