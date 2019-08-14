import React 				from 'react';
import SectionText 			from './sectionTextComponent.jsx';
import SvgText 				from './SvgTitleComponent.jsx';
import Carousel 			from './SectionsCarousel.jsx';
import { onScreen2 } 		from '../common/commonFunctions.js'
import { connect } 			from 'react-redux'
import {
	updateVisProjectIndex,
	updateVisSectionIndex
} from '../redux/actions/index'

class Section extends React.Component {
	static propTypes = {
		// text: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.sectionRef = React.createRef()
	}

	componentDidMount() {
		window.addEventListener("scroll", () => this.handleScroll())	     
	}

	handleScroll = () => {
		// if this component is visible update redux state 
		if (onScreen2(this.sectionRef)) {
			// update redux with dispatch
			this.props.dispatch(updateVisSectionIndex(this.props.index))
			// console.log(this.props)
		}
	}

	render() {
		return (
			<div className="section-content-container" ref={this.sectionRef}>
				<h2>{this.props.title}</h2>
				<hr></hr>
				<img src={`/assets/${this.props.images[0].filePath}`}></img>
				<p>{this.props.text}</p>
			</div>
		);
	}
}

// Function required from Redux to map Redux state to component props
const mapStateToProps = (state, ownProps) => state

// Connect the component to the store
Section = connect(mapStateToProps)(Section)

// Export the connected component
export default Section
