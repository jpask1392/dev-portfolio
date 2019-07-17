import React from 'react'
import { Route, Link } from "react-router-dom";

export default class NumberNavigation extends React.Component {

	constructor(props) {
		super(props)

		this.state = { projects:[], currentIndex: 0 }
	}

	componentDidMount() { 
		// SET UP DIFFERENT API END POINTS FOR COLLECTING DATA
		// NEED TO KNOW THE CURRENT OBJECTID FIRST
		const currentProjectID = this.props.currentProjectID

		fetch('/api/projects/allIds')
	      .then(response => response.json())
	      .then(projects => this.setState({ projects: projects }))
	      .then(
	      	projects => {
	      		const currentIndex = this.state.projects.map((e) => 
	      			{ return e._id; })
	      			.indexOf(this.props.currentProjectID);
	      		
	      		this.setState({currentIndex: currentIndex})
	  		})
	}

	render(){

		const data = this.state.projects

		return (
			<div id="number-nav-container">
			<ul className="">
				{this.state.projects.map((project, i) => {
					return (
						<li 
							className={(i == this.state.currentIndex) ? 'active-project' : null}
							key={project._id}
						>
							<Link to={`${this.state.projects[i]._id}`}>{`0${i+1}`}</Link>
						</li>
					)
				})}
			</ul>
			</div>
		)
	}

}
