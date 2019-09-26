import React from "react"
import ProjectCoreDisplay from "./projectCoreDisplay.jsx"
import AddNewProject from "./AddNewProject.jsx"

export default class AdminProjects extends React.Component {
	constructor(props) {
		super(props)
		this.state = { projects: [] }
	}

	componentDidMount = () => this.fetchData()

	fetchData = () => {
		fetch(`/api/projects/`)
			.then(response => response.json())
			.then(data => this.setState({ projects: data }))
	}

	updateArray = newOrder => {
		this.setState({ projects: newOrder })
	}

	render() {
		return (
			<div id='project-list-container'>
				<h3>List of projects</h3>
				<AddNewProject updateArray={this.updateArray.bind(this)} />
				<ul style={{ padding: "0" }}>
					{this.state.projects.map((project, i) => (
						<ProjectCoreDisplay
							key={project._id}
							projectArray={this.state.projects}
							projectData={project}
							index={i}
							updateArray={this.updateArray.bind(this)}
						/>
					))}
				</ul>
			</div>
		)
	}
}
