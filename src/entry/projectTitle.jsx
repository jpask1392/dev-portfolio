import React 				from 'react';
import store 				from '../redux/store/index' 
import { withRouter, Link } from 'react-router-dom';

const ProjectTitle = (props) => {

	let visibleIndex = store.getState().visibleProjectIndex

	return (
		<div className={`title-info ${props.visible ? "fixed fade-out" : ""}`}>
			<p>{props.location.pathname === '/' ? 
					"RECENT WORK" : 
					"ALL PROJECTS"}</p>
			<h2>{props.data[visibleIndex]['projectName']}</h2>
			<p>Click to view the creation process of my current portfolio</p>
		</div>
	)
}

export default withRouter(ProjectTitle);