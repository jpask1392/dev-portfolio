import React from 'react';
import ProjectCoreDisplay from './projectCoreDisplay.jsx'

export default class AdminProjects extends React.Component {
	// static propTypes = {
	// 	name: React.PropTypes.string,
	// };

	constructor(props) {
		super(props);
		this.state = { projects: [] }
	}

	componentDidMount = () => {
		// fetchs all imformation on all project
		// should the project data be different for different users ? 
		fetch(`/api/projects/`)
	      .then(response => response.json())
	      .then(data => this.setState({ projects: data }))	
	}

	updateArray = (newOrder) => {
		this.setState({projects: newOrder})
	}

	// add a new project button
	// edit project button 
	// authenticate the users status -- admin/ guest etc 

	render() {
		return (
			<div>
				<h3>List of projects</h3>
				<ul style={{padding:"0"}}>
				{this.state.projects.map((project, i) => 
					<li 
						key={project['_id']}
						style={{listStyleType:"none"}}>
						<ProjectCoreDisplay 
							projectArray={this.state.projects}
							projectData={project}
							index={i}
							updateArray={this.updateArray.bind(this)}
						/>
					</li>
				)}
				</ul>
			</div>
		);
	}
}
