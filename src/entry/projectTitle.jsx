import React from "react"
import { withRouter, Link } from "react-router-dom"
import NextButton from "../common/nextButton.jsx"

const ProjectTitle = props => {
	let visibleProjectIndex = props.visibleProjectIndex

	let componentClassNames = ["title-info"]
	if (props.visible) {
		componentClassNames.push("fixed", "fade-out")
	}

	return props.data.length !== 0 ? (
		<div className={componentClassNames.join(" ")}>
			<p>
				{props.location.pathname === "/"
					? "RECENT WORK"
					: "ALL PROJECTS"}
			</p>
			<h2>{props.data[visibleProjectIndex]["projectName"]}</h2>
			<p className='project-summary'>
				{props.data[visibleProjectIndex]["summary"]}
			</p>

			<span onClick={() => props.changing(visibleProjectIndex)}>
				<Link to={`/projects/${props.data[visibleProjectIndex]["_id"]}`}>
					<NextButton color='white' />
				</Link>
			</span>
		</div>
	) : null
}

export default withRouter(ProjectTitle)
