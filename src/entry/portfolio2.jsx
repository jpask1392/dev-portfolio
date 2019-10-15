import React, { useState, useEffect } from "react"
import Gallery from "./gallery.jsx"
import DotNavigation from "./dotNavigation.jsx"
import ProjectTitle from "./projectTitle.jsx"

const Portfolio2 = props => {
	let data = props.data
	let visible = props.isVisible
	let visibleProjectIndex = props.visibleProjectIndex

	return (
		<React.Fragment>
			<ProjectTitle
				visible={visible}
				data={data}
				visibleProjectIndex={visibleProjectIndex}
			/>
			<DotNavigation data={data} visible={visible} />
			<div id='gallery-container'>
				{data.map((project, i) => (
					<Gallery key={project["_id"]} index={i} data={project} />
				))}
			</div>
		</React.Fragment>
	)
}

export default Portfolio2
