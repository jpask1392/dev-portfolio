import React from "react"
import store from "../redux/store/index"
import { withRouter, Link } from "react-router-dom"
import NextButton from "../common/nextButton.jsx"

const ProjectTitle = props => {
	// this state should not be higher than 3 if the
	let visibleIndex = store.getState().visibleProjectIndex

	if (props.data.length !== 0) {
		return (
			<div
				className={`title-info ${
					props.visible ? "fixed fade-out" : ""
				}`}>
				<p>
					{props.location.pathname === "/"
						? "RECENT WORK"
						: "ALL PROJECTS"}
				</p>
				<h2>{props.data[visibleIndex]["projectName"]}</h2>
				<p className='project-summary'>
					{props.data[visibleIndex]["summary"]}
				</p>

				<span onClick={e => props.Changing(e, visibleIndex)}>
					<Link to={`/projects/${props.data[visibleIndex]["_id"]}`}>
						<NextButton color='white' />
					</Link>
				</span>
			</div>
		)
	} else {
		return null
	}
}

export default withRouter(ProjectTitle)
