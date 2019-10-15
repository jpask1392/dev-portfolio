import React from "react"
import PropTypes from "prop-types"
import { onScreen2 } from "../common/commonFunctions.js"
import GistDisplay from "./gistDisplay.jsx"
import ImageLoader from "../common/imageLoader.jsx"
import { connect } from "react-redux"
import { updateVisSectionIndex } from "../redux/actions/index"
import SwaggerUI from "swagger-ui-react"
import "../../node_modules/swagger-ui-react/swagger-ui.css"

class Section extends React.Component {
	// specify prop types
	static propTypes = {
		section: PropTypes.object,
		index: PropTypes.number,
		currentProjectID: PropTypes.string,
	}

	constructor(props) {
		super(props)
		this.sectionRef = React.createRef()
	}

	componentDidMount = () =>
		window.addEventListener("scroll", this.handleScroll)

	// update visible section
	handleScroll = () => {
		const type = this.props.section.type
		// if this component is visible update redux state
		if (type === "title" && onScreen2(this.sectionRef)) {
			// update redux with dispatch
			this.props.dispatch(updateVisSectionIndex(this.props.index))
		}
	}

	componentWillUnmount = () =>
		window.removeEventListener("scroll", this.handleScroll)

	render() {
		const section = this.props.section
		return (
			<div className='section-content'>
				{(() => {
					switch (section.type) {
						case "title":
							return (
								<Title
									Ref={this.sectionRef}
									txt={section.text}
								/>
							)
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

// Connect the component to the store
Section = connect()(Section)

// Export the connected component
export default Section

// components defined to clean up Section render method
const Image = props => (
	<ImageLoader
		src={props.src}
		fileType={props.fileType}
		caption={props.caption}
	/>
)
const Text = props => <p dangerouslySetInnerHTML={{ __html: `${props.txt}` }} />
const Title = props => (
	<div>
		<h2 ref={props.Ref}>{props.txt}</h2>
		<hr></hr>
	</div>
)
