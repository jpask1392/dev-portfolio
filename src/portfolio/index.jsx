import React from "react"
import Section from "./SectionComponent.jsx"
import ProjectEntry from "./projectEntry.jsx"
import ScrollPin from "../common/scrollPin.jsx"
import FooterBar from "../common/footerBar.jsx"
import ScrollNavigation from "./ScrollNavigation.jsx"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import {
	updateVisProjectIndex,
	updateVisSectionIndex
} from "../redux/actions/index"

class Project extends React.Component {
	_isMounted = false

	constructor(props) {
		super(props)

		this.state = {
			data: [],
			pinLocation: "83.3333%",
			pinColor: "light",
			nextProjectName: "",
			nextProjectId: null
		}
	}

	componentDidMount() {
		this._isMounted = true
		// the timeout is set to avoid the state changing during page transition
		setTimeout(() => {
			// reset the visible index state here
			this.props.dispatch(updateVisProjectIndex(0))
		}, 300)
		
		if (this._isMounted) {
			const currentProjectID = this.props.projectId
			let currentIndex

			// fetchs all imformation on current project
			fetch(`/api/projects/${this.props.projectId}`)
				.then(response => response.json())
				.then(data => this.setState({ data: data }))
				.then(
					() =>
						(document.title = `${this.state.data.projectName} | Jamie Pask`)
				)

			// fetchs id and project name for next project in the list
			fetch("/api/projects/allIds")
				.then(response => response.json())
				.then(projects => {
					currentIndex = projects
						.map(project => project._id)
						.indexOf(currentProjectID)

					this.setState(() =>
						projects.length > currentIndex + 1
							? {
									nextProjectName:
										projects[currentIndex + 1].projectName,
									nextProjectId:
										projects[currentIndex + 1]._id
							  }
							: {
									nextProjectName: projects[0].projectName,
									nextProjectId: projects[0]._id
							  }
					)
				})
		}
	}

	componentWillUnmount = () => {
		this._isMounted = false
	}

	render() {
		const data = this.state.data
		const sectionsArray = this.state.data.sections

		if (sectionsArray !== undefined) {
			return (
				<div id='project-page-container'>
					<div className='project-page-pin-container'>
						<ScrollPin />
					</div>

					<ProjectEntry
						data={data}
						imgInitLocation={this.props.imgInitLocation}
						bkgColor={data["bkgColor"]}
					/>

					<div className='sections-container'>
						<ScrollNavigation
							projectSections={sectionsArray}
							bkgColor={data["bkgColor"]}
						/>

						<div className='sections-inner-container'>
							<div className='project-brief-container'>
								<h3 style={{ color: data["bkgColor"] }}>
									{data.projectName}
								</h3>

								{data.githubLink ? (
									<GithubLink
										ghLink={data.githubLink}
										name={data.projectName}
									/>
								) : null}
							</div>

							<div className='section-content-container'>
								{sectionsArray.map((section, i) => (
									<Section
										section={section}
										key={i}
										index={i}
										currentProjectID={data._id}
									/>
								))}
							</div>
						</div>
					</div>

					<FooterBar
						bkgColor={data["bkgColor"]}
						nextProject={this.state.nextProjectName}
						linkTo={`/projects/${this.state.nextProjectId}`}
					/>
				</div>
			)
		} else {
			return null
		}
	}
}

const mapStateToProps = (state, ownProps) => state

// Connect the component to the store
Project = connect(mapStateToProps)(Project)

export default Project

const GithubLink = props => (
	<span>
		<p style={{ color: "lightgrey", display: "inline" }}>
			View code on github
		</p>
		<a
			href={`https://github.com/jpask1392/${props.ghLink}`}
			target='_blank'
			style={{ fontSize: "20px", marginLeft: "10px", color: "black" }}
			onClick={() =>
				ga("send", {
					hitType: "event",
					eventCategory: "Page views",
					eventAction: "Github link clicked",
					eventLabel: `${props.name} github page visited`
				})
			}>
			<i className='fab fa-github-square'></i>
		</a>
	</span>
)
