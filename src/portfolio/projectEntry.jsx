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
		<div id="landing-container">
			<div id="project-intro-text-container">
				<h4>{this.props.data['title-intro']}</h4>
				<h1>{this.props.data['title-main']}</h1>
				<p>{this.props.data['summary']}</p>
			</div>
			<ProjectHeaderImage />
		</div>
		);
	};
};
