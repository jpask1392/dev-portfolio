import React from "react"
import { withRouter, Link } from "react-router-dom"
import NextButton from "../common/nextButton.jsx"
import { formatTitle } from "../common/commonFunctions"

const ProjectTitle = props => {
	let visibleProjectIndex = props.visibleProjectIndex

	let componentClassNames = ["title-info"]
	if (props.visible) {
		componentClassNames.push("fixed", "fade-out")
	}

	return (
		<div className={componentClassNames.join(" ")}>
			<p>{props.subText}</p>
			<h2>
				{formatTitle(props.data[visibleProjectIndex]["projectName"])}
			</h2>
			<p className='project-summary'>
				{props.data[visibleProjectIndex]["summary"]}
			</p>

			<span onClick={() => props.scrollToEl(visibleProjectIndex)}>
				<Link
					to={`/projects/${
						props.data[visibleProjectIndex]["projectName"]
					}`}>
					<NextButton color='white' />
				</Link>
			</span>
		</div>
	)
}

export default withRouter(ProjectTitle)
