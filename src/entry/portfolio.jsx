import React, { useState, useEffect } from "react"
import Gallery from "./gallery.jsx"
import DotNavigation from "./dotNavigation.jsx"
import ProjectTitle from "./projectTitle.jsx"

const Portfolio = props => {
	let data = props.data
	let visible = props.isVisible
	let visibleProjectIndex = props.visibleProjectIndex

	const [clickedIndex, updateClickedIndex] = useState(null)
	const [imgInitLocation, updateimgInitLocation] = useState(null)

	const handleClick = currentIndex => {
		const clickedEl = document.getElementsByClassName("gallery-wrapper")
		const elTop = clickedEl[currentIndex].getBoundingClientRect().top
		updateimgInitLocation(elTop)
		updateClickedIndex(currentIndex)
	}

	return (
		<React.Fragment>
			<ProjectTitle
				visible={visible}
				data={data}
				visibleProjectIndex={visibleProjectIndex}
				scrollToEl={handleClick}
				subText={props.subText}
			/>
			<DotNavigation data={data} visible={visible} />
			<div id='gallery-container'>
				{data.map((project, i) => (
					<Gallery
						key={project["_id"]}
						imgInitLocation={imgInitLocation}
						index={i}
						data={project}
						clickedIndex={clickedIndex}
						scrollToEl={handleClick}
					/>
				))}
			</div>
		</React.Fragment>
	)
}

export default Portfolio
