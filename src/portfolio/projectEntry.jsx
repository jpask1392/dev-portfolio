import React from 'react';
import './project.scss';
import ProjectHeaderImage from './ProjectHeaderImageComponent.jsx';

export default class projectEntry extends React.Component {
	static propTypes = {
		// name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
		<div id="project-landing-container" className="container-max">
			<div id="project-intro-text-container" className="col lhs">
				<h4>{this.props.data['title-intro']}</h4>
				<h1>{this.props.data['title-main']}</h1>
				<p>{this.props.data['summary']}</p>
			</div>
			<ProjectHeaderImage />
		</div>
		);
	};
};
