import React from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

class ScrollNavigation extends React.Component {
	// check type of incomming props
	static propTypes = {
		projectSections: PropTypes.array
	}

	constructor(props) {
		super(props)
	}

	handleClick = i => {
		// find the indexed element and collect it's current top position
		const el = document.getElementsByClassName("section-content")[i]
		const location = window.scrollY + el.getBoundingClientRect().top + 1

		window.scrollTo({
			top: location,
			left: 0,
			behavior: "auto"
		})
	}

	render() {
		const visSectI = this.props.visibleSectionIndex
		const projectSections = this.props.projectSections
		return (
			<div className='scroll-navigation-container'>
				{projectSections.map((section, i) =>
					section.type === "title" ? (
						<p
							style={
								visSectI === i
									? {
											color: this.props.bkgColor,
											borderColor: this.props.bkgColor
									  }
									: { color: "grey" }
							}
							key={section.text}
							onClick={() => this.handleClick(i)}
							className={`scroll-nav-header ${
								visSectI === i ? "active-title" : ""
							}`}>
							{section.text}
						</p>
					) : null
				)}
			</div>
		)
	}
}

// Function required from Redux to map Redux state to component props
const mapStateToProps = state => ({
	visibleSectionIndex: state.visibleSectionIndex
})

// Connect the component to the store
ScrollNavigation = connect(mapStateToProps)(ScrollNavigation)

// Export the connected component
export default ScrollNavigation
