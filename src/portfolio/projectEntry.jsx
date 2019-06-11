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
				<p>{this.props.data['titleIntro']}</p>
				<b className="sub-heading">{this.props.data['titleMain']}</b>
				<p>{this.props.data['summary']}</p>
				<hr></hr>
			</div>
			<ProjectHeaderImage src={this.props.data['projectHeaderImage']}/>
		</div>
		);
	}
}
