import React from 'react'
import './project.scss'
import ProjectHeaderImage from './ProjectHeaderImageComponent.jsx'
import { Route, Link } from "react-router-dom";
import NumberNavigation from './NumberNavigation.jsx'

export default class projectEntry extends React.Component {

	constructor(props) {
		super(props);


	}

	backgroundColor() {
		switch(this.props.data['projectName']) {
			case "Dev Portfolio":
				return "#C90000";
			case "Python":
				return "#b3b5b4";
			case "Arch Portfolio":
				return "#c1a503";
			case "EPT Website":
				return "#4777c2";
		}
	}

	render() {

		return (
		<div className="project-cont" style={{
			height:"100%", 
			position:"relative",
			background: this.backgroundColor()
		}}>
			<div id="project-landing-container">
				<div id="project-intro-text-container">
					<BackButton />
					<h2 
						className="sub-heading"
						style={{textTransform:"uppercase"}}
					>
						{this.props.data['projectName']}
					</h2>
					<p>{this.props.data['titleMain']}</p>
					<hr></hr>
					<p>{this.props.data['summary']}</p>

					<NumberNavigation
						currentProjectID={this.props.data['_id']}
					/>

				</div>
			</div>
			<ProjectHeaderImage 
				src={this.props.data['projectHeaderImage']}
				title={this.props.data['projectName']}
				textColor={this.backgroundColor.bind(this)}
			/>
		</div>
		);
	}
}

// BACK BUTTON TO RENDER WHEN ROUTE MATCHES '/:id'
function BackButton() {

	return (
	<div id='back-button'>
		<Link to="/"> 
			<div id="back-button-container">
				<span className="back-icon-line-three"></span>
				<span className="back-icon-line-one"></span>
				<span className="back-icon-line-two"></span>
			</div>
		</Link>
	</div>
	)
}

