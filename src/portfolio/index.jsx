import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Section from './SectionComponent.jsx';
import ProjectEntry from './projectEntry.jsx';
import Scroll from '../entry/scrollComponent.jsx';

export default class Project extends Component {
	_isMounted = false;

	constructor(props) {
		super(props);

		this.state = {
			data: [],
		}
	}

	componentDidMount() { 		
	this._isMounted = true;

		if(this._isMounted) {
			// SET UP DIFFERENT API END POINTS FOR COLLECTING DATA
			fetch(`/api/${this.props.projectId}`)
		      .then(response => response.json())
		      .then(data => this.setState({ data: data }))		
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}


	render () {
		var data = this.state.data;
		var sectionsArray = this.state.data.sections;
		document.title = `${data.projectName} | Jamie Pask`
		

		if (sectionsArray != null) {
		return (
			<div id='project-page-container'>
				<ProjectEntry data={data} />
				{sectionsArray.map((section, i) => 
					<Section 
						key={i}
						text={section.text}
						title={section.title.toUpperCase()}
						images={section.images}
						index={i}
					/>
			 	)}
			 	<div style={{
			 		width:"100%", 
			 		height:"100px", 
			 		background:"black",
			 		color:"white"
			 	}}>
			 		
			 	</div>
				<Scroll />	
			</div>
		)} else {
			return null;
		}
	}
}