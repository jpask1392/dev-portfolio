import React 			from 'react';
import { onScreen } 	from '../common/commonFunctions.js'
import { connect } 		from 'react-redux'
import PropTypes 		from 'prop-types';
import store 			from '../redux/store/index'
import {
	updateVisProjectIndex,
	updateVisSectionIndex
} from '../redux/actions/index'

class ScrollNavigation extends React.Component {

	// check type of incomming props
	static propTypes = {
		projectSections: PropTypes.array
	};

	constructor(props) {
		super(props);
		this.state = {projectSections: this.props.projectSections}
	}

	handleClick = (i) => {
		// find the indexed element and collect it's current top position
		const el = document.getElementsByClassName('section-content')[i]
		const location = window.scrollY + el.getBoundingClientRect().top + 1

		window.scrollTo({
			top: location,
			left: 0,
			behavior: 'auto'
		})
	}

	render() {
		const visSectI = store.getState().visibleSectionIndex
		return (
			<div className= "scroll-navigation-container">
				{this.state.projectSections.map((section, i) =>
					(section.type) === "title" ?
					<h3 
						key={section.text}
						onClick={() => this.handleClick(i)}
						className={`scroll-nav-header ${visSectI === i ? "active-title" : "" }`}> 
						{section.text}
					</h3> : null
				)}
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
