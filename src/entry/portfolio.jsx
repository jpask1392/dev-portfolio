import React from "react"
import { withRouter } from "react-router-dom"
import Gallery from "./gallery.jsx"
import DotNavigation from "./dotNavigation.jsx"
import ProjectTitle from "./projectTitle.jsx"
import {connect} from 'react-redux'

class Portfolio extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
			isVisible: false,
			topOfCurrentEl: 0,
			clickedIndex: null
		}
	}

	componentDidMount = () => {
		const locationPathname = this.props.location.pathname

		// home path returns a capped amount of projects
		if (locationPathname === "/") {
			fetch("/api/projects?limit=3")
				.then(response => response.json())
				.then(data => this.setState({ data }))

			// projects path returns all the projects
		} else if (locationPathname === "/projects") {
			fetch("/api/projects")
				.then(response => response.json())
				.then(data => this.setState({ data }))

			this.setState({ isVisible: true })
		}
	}

	// triggered when project is clicked to create smooth transition to new page
	Changing = (e, clickedIndex) => {
		const clickedEl = document.getElementsByClassName("project-container")[
			clickedIndex
		]
		const elTopLocation = clickedEl.getBoundingClientRect().top
		this.props.updateTranslateValue(elTopLocation)
		this.setState({ clickedIndex: clickedIndex })
		// disable title updated during this transition
		// this.transitioning = true
	}

	componentDidUpdate = prevProps => {
		if (prevProps.visibleSection !== this.props.visibleSection) {
			this.setState(state => {
				if (this.props.visibleSection === "portfolio") {
					return { isVisible: true }
				} else if (state.isVisible) {
					return { isVisible: false }
				}
			})
		}
	}

	render() {
		let data = this.state.data
		let visible = this.state.isVisible
		let visibleIndex = this.props.visibleProjectIndex

		return (
			<div id='portfolio-container' ref={this.props.portfolioRefProp}>
				{data.length !== 0 ? (
					<React.Fragment>
						<ProjectTitle
							visible={visible}
							data={data}
							Changing={this.Changing.bind(this)}
							visibleProjectIndex={visibleIndex}
						/>

						<DotNavigation data={data} visible={visible} />

						<div id='gallery-container'>
							{data.map((project, i) => (
								<Gallery
									key={project["_id"]}
									index={i}
									data={project}
									Changing={this.Changing.bind(this)}
									imgInitLocation={this.props.imgInitLocation}
									clickedIndex={this.state.clickedIndex}
								/>
							))}
						</div>
					</React.Fragment>
				) : null}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	visibleProjectIndex: state.visibleProjectIndex
})

export default connect(mapStateToProps)(withRouter(Portfolio))
