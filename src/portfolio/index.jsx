import React 				from 'react';
import Section 				from './SectionComponent.jsx';
import ProjectEntry 		from './projectEntry.jsx';
import ScrollPin 			from '../common/scrollPin.jsx'
import FooterBar 			from '../common/footerBar.jsx'
import ScrollNavigation 	from './ScrollNavigation.jsx';
// import { BrowserRouter as Router, Route } from "react-router-dom";


export default class Project extends React.Component {
	_isMounted = false;

	constructor(props) {
		super(props);

		this.state = {
			data: [],
			pinLocation: "83.3333%",
			pinColor: "light",
			visibleSection: null,
			nextProjectName: "",
			nextProjectId: null
		}
	}

	componentDidMount() { 	

		this._isMounted = true;

		if(this._isMounted) {
			const currentProjectID = this.props.projectId
			let currentIndex;
			
			// fetchs all imformation on current project
			fetch(`/api/projects/${this.props.projectId}`)
		      .then(response => response.json())
		      .then(data => this.setState({ data: data }))
		      .then(() => document.title = `${this.state.data.projectName} | Jamie Pask`)		

		    // fetchs id and project name for next project in the list
		    fetch('/api/projects/allIds')
		      .then(response => response.json())
		      .then(projects => {
		      	currentIndex = projects.map((project) => project._id).indexOf(currentProjectID)
		      	this.setState({
		      		nextProjectName: projects[currentIndex + 1].projectName,
		      		nextProjectId: projects[currentIndex + 1]._id
		      	})
		      })
		}
	}

	backgroundColor() {
		switch(this.state.data['projectName']) {
			case "Dev Portfolio"			: return "#FF2222";
			case "Python"					: return "#b3b5b4";
			case "Architecture Portfolio"	: return "#c1a503";
			case "EPT Website"				: return "#4777c2";
		}
	}

	setVisibleSection = section => { this.setState({visibleSection: section})}
	
	componentWillUnmount = () => this._isMounted = false

	render () {
		var data = this.state.data;
		var sectionsArray = this.state.data.sections;
		if (sectionsArray !== undefined) {
		return (
			<div id='project-page-container'>

				<div className="project-page-pin-container">
					<ScrollPin />
				</div>	

				<ProjectEntry 
					data={data} 
					imgInitLocation={this.props.imgInitLocation}
					backgroundColor={this.backgroundColor.bind(this)}
				/>

				<div className="sections-container">

					<ScrollNavigation 
						projectSections={sectionsArray}
						visibleSection={this.state.visibleSection}
					/>

					<div className="sections-inner-container">

						<div className="project-brief-container">
							<h3 style={{color: this.backgroundColor(), textTransform:"uppercase"}}>{data.projectName}</h3>
						</div>

						<div className="section-content-container">
						{sectionsArray.map((section, i) => 
							<Section 
								section={section}
								key={i}
								index={i}
								setVisibleSection={this.setVisibleSection.bind(this)}
								currentProjectID={data._id}
							/>
					 	)}
					 	</div>

				 	</div>

			 	</div>

			 	<FooterBar
			 		backgroundColor={this.backgroundColor.bind(this)}
			 		location={this.props.location}
			 		nextProject={this.state.nextProjectName}
			 		linkTo={`/projects/${this.state.nextProjectId}`}
			 	 />
				
			</div>
		)} else {
			return null;
		}
	}
}