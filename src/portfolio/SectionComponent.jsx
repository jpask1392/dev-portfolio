import React from "react"
import PropTypes from "prop-types"
import SectionText from "./sectionTextComponent.jsx"
import { onScreen2 } from "../common/commonFunctions.js"
import GistDisplay from "./gistDisplay.jsx"
import ImageLoader from "../common/imageLoader.jsx"
import { connect } from "react-redux"
import {
	updateVisProjectIndex,
	updateVisSectionIndex
} from "../redux/actions/index"

class Section extends React.Component {
	_isMounted = false

	// specify prop types
	static propTypes = {
		section: PropTypes.object,
		index: PropTypes.number,
		currentProjectID: PropTypes.string,
		index: PropTypes.number,
		setVisibleSection: PropTypes.func
	}

	constructor(props) {
		super(props)
		this.sectionRef = React.createRef()
	}

	componentDidMount = () => {
		this._isMounted = true
		window.addEventListener("scroll", () => this.handleScroll())
	}

	// update visible section
	handleScroll = () => {
		const type = this.props.section.type
		// if this component is visible update redux state
		if (this._isMounted && type === "title" && onScreen2(this.sectionRef)) {
			// update redux with dispatch
			this.props.dispatch(updateVisSectionIndex(this.props.index))
		}
	}

	componentWillUnmount = () => (this._isMounted = false)

	render() {
		// this object looses scope within the self invoking function
		const Ref = this.sectionRef
		const section = this.props.section

		return (
			<div className='section-content'>
				{(() => {
					switch (section.type) {
						case "title":
							return <Title Ref={Ref} txt={section.text} />
						case "image":
							return (
								<Image
									src={section.src}
									caption={section.caption}
								/>
							)
						case "text":
							return <Text txt={section.text} />
						case "gistCode":
							return (
								<GistDisplay
									gist={section.gist}
									file={section.file}
								/>
							)
						default:
							return null
					}
				})()}
			</div>
		)
	}
}

// Function required from Redux to map Redux state to component props
const mapStateToProps = (state, ownProps) => state

// Connect the component to the store
Section = connect(mapStateToProps)(Section)

// Export the connected component
export default Section

// components defined to clean up Section render method
const Image = props => <ImageLoader src={props.src} caption={props.caption} />
const Text = props => <p>{props.txt}</p>
const Title = props => (
	<div>
		<h2 ref={props.Ref}>{props.txt}</h2>
		<hr></hr>
	</div>
)
