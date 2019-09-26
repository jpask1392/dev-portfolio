import React from "react"
import PropTypes from "prop-types"
import { onScreen2 } from "../common/commonFunctions.js"
import GistDisplay from "./gistDisplay.jsx"
import ImageLoader from "../common/imageLoader.jsx"
import { connect } from "react-redux"
import {
	updateVisProjectIndex,
	updateVisSectionIndex
} from "../redux/actions/index"
import SwaggerUI from "swagger-ui-react"
import "../../node_modules/swagger-ui-react/swagger-ui.css"

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
									fileType={section.fileType}
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
						case "swaggerAPI":
							return (
								<SwaggerUI
									url={`https://api.swaggerhub.com/apis/
											${section.swagOwner}/
											${section.swagAPI}/
											${section.swagVersion}`}
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
const Image = props => <ImageLoader src={props.src} fileType={props.fileType} caption={props.caption} />
const Text = props => <p dangerouslySetInnerHTML={{ __html: `${props.txt}` }} />
const Title = props => (
	<div>
		<h2 ref={props.Ref}>{props.txt}</h2>
		<hr></hr>
	</div>
)
