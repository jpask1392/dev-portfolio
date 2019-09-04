import React 			from 'react';
import { onScreen } 	from '../common/commonFunctions.js'
import { connect } 		from 'react-redux'
import PropTypes 		from 'prop-types';

import {
	updateVisProjectIndex,
	updateVisSectionIndex
} from '../redux/actions/index'

class ScrollNavigation extends React.Component {

	// check type of incomming props
	static propTypes = {
		projectSections: PropTypes.array,
		visibleSection: PropTypes.string
	};

	constructor(props) {
		super(props);
		this.state = {projectSections: this.props.projectSections}
	}

	handleClick = (i) => {
		// find the indexed element and collect it's current top position
		var el = document.getElementsByClassName('section-content-container')[i]
		var location = window.scrollY + el.getBoundingClientRect().top + 1

		window.scrollTo({
			top: location,
			left: 0,
			behavior: 'auto'
		})
	}

	render() {

		return (
			<div className= "scroll-navigation-container">
				{this.state.projectSections.map((section, index) => {
					return section.type === "title" ?
						<h3 
							key={section.text}
							onClick={() => this.handleClick(index)}
							className={`scroll-nav-header ${
								(this.props.visibleSectionIndex === index) ?
								"active-title" : "" }`}> {section.text}
						</h3> : null
					})}
			</div>
		)
	}
}

// Function required from Redux to map Redux state to component props
const mapStateToProps = (state, ownProps) => state

// Connect the component to the store
ScrollNavigation = connect(mapStateToProps)(ScrollNavigation)

// Export the connected component
export default ScrollNavigation
