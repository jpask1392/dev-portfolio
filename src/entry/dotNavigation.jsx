import React from "react"
import { withRouter, Link } from "react-router-dom"
import { connect } from "react-redux"
import { formatTitle } from "../common/commonFunctions"

const DotNavigation = props => {
	const data = props.data
	let visibleIndex = props.visibleProjectIndex

	let componentClassNames = ["scroll-dots", "fade-out"]
	if (props.visible) {
		componentClassNames.push("fixed")
	}

	const goToProject = i => {
		var el = document.getElementsByClassName("gallery-wrapper")[i]
		var location = window.scrollY + el.getBoundingClientRect().top + 1

		window.scrollTo({
			top: location,
			left: 0,
			behavior: "smooth"
		})
	}

	return (
		<div className={componentClassNames.join(" ")}>
			{data.map((project, i) => (
				<span
					key={project["_id"]}
					className={i === visibleIndex ? "active-dot" : ""}
					onClick={() => goToProject(i)}>
					<p className='tool-tip '>
						{data.length !== 0
							? formatTitle(data[i]["projectName"])
							: null}
					</p>
				</span>
			))}

			{props.location.pathname === "/" ? <ViewAllButton /> : null}
		</div>
	)
}

const mapStateToProps = state => ({
	visibleProjectIndex: state.visibleProjectIndex
})

const ViewAllButton = () => (
	<div className='view-all-button'>
		<Link to='/projects'>
			<h3>View all</h3>
		</Link>
	</div>
)

export default connect(mapStateToProps)(withRouter(DotNavigation))
