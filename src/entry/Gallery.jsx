import React from "react"
import { Link } from "react-router-dom"
import { onScreen } from "../common/commonFunctions.js"
import styled, { keyframes } from "styled-components"
import { connect } from "react-redux"
import { updateVisProjectIndex } from "../redux/actions/index"
import ImageLoader from "../common/imageLoader.jsx"

class Gallery extends React.Component {
	constructor(props) {
		super(props)
		this.state = { visible: false, imgInitLocation: null, clickedIndex: null }
		this.handleScroll = this.handleScroll.bind(this)
		this.projectRef = React.createRef()
	}

	componentDidMount = () => {
		window.addEventListener("scroll", this.handleScroll)
		onScreen(this.projectRef) ? this.setState({ visible: true }) : null
	}

	handleScroll = () => {
		const screenOptions = {
			screenOffset: "middle",
			elOffset: "bottom"
		}
		if (onScreen(this.projectRef, { screenOptions })) {
			this.setState({ visible: true })
			this.props.dispatch(updateVisProjectIndex(this.props.index))
		} else if (this.state.visible) {
			this.setState({ visible: false })
		}
	}

	componentWillUnmount = () =>
		window.removeEventListener("scroll", this.handleScroll)

	render() {
		const project = this.props.data
		const componentClasses = ["individual-project"]
		if (this.state.visible) {
			componentClasses.push("rotate")
		}

		return (
			<Wrapper
				y={this.props.imgInitLocation}
				clickedIndex={this.props.clickedIndex}
				currentIndex={this.props.index}
				className='gallery-wrapper'>
				<Link
					className='project-container'
					to={"projects/" + project["projectName"]}
					onClick={() => this.props.scrollToEl(this.props.index)}>
					<span
						ref={this.projectRef}
						className={componentClasses.join(" ")}>
						<ImageLoader
							src={project.mainImage["src"]}
							fileType={project.mainImage["fileType"]}
						/>
					</span>
				</Link>
			</Wrapper>
		)
	}
}

// Connect the component to the store
Gallery = connect()(Gallery)

// Export the connected component
export default Gallery

const Wrapper = styled.div`
	${props =>
		props.y !== null && props.clickedIndex === props.currentIndex
			? "position: fixed; left: 50%; transform: translateX(-50%);"
			: "position: relative"};
	height: 100vh;
	margin: auto;
	width: 35%;
	top: 0;
	
	
	display: flex;
	align-items: center;
	animation: ${props =>
		props.y !== null ? props => moveVertically(props.y) : ""};
	animation-duration: 0.2s;
`
const moveVertically = y => keyframes`
    0% { transform : translateY(${y}px) translateX(-50%) }
    100% { transform : translateY(0px) translateX(-50%) }
`
