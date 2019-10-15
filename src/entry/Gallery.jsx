import React from "react"
import { Link } from "react-router-dom"
import { onScreen } from "../common/commonFunctions.js"
import styled, { keyframes } from "styled-components"
import { connect } from "react-redux"
import { updateVisProjectIndex } from "../redux/actions/index"
import ImageLoader from '../common/imageLoader.jsx'

class Gallery extends React.Component {
	constructor(props) {
		super(props)
		this.state = { visible: false, imgInitLocation: 0, clickedIndex: null }
		this.handleScroll = this.handleScroll.bind(this)
		this.projectRef = React.createRef()
		this.imageSize = "-1x"
	}

	componentDidMount = () => {
		window.addEventListener("scroll", this.handleScroll)
		onScreen(this.projectRef) ? this.setState({ visible: true }) : null
		this.imageSizeCalculator()
	}

	handleClick = clickedIndex => {
		const clickedEl = document.getElementsByClassName("project-container")[
			clickedIndex
		]
		const elTopLocation = clickedEl.getBoundingClientRect().top
		this.setState({
			imgInitLocation: elTopLocation,
			clickedIndex: clickedIndex
		})
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

	// optimize image size depending on screen width
	imageSizeCalculator = () => {
		if (window.innerWidth < 1100 && window.innerWidth > 800) {
			this.imageSize = "-2x"
		} else if (window.innerWidth <= 800) {
			this.imageSize = "-3x"
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
		const backgroundImage =
			"url(assets/" +
			project.mainImage["src"] +
			this.imageSize +
			project.mainImage["fileType"]

		return (
			<Wrapper
				y={this.state.imgInitLocation}
				clickedIndex={this.state.clickedIndex}
				currentIndex={this.props.index}
				className='gallery-wrapper'>
				<Link
					className='project-container'
					to={"projects/" + project["_id"]}
					onClick={() => this.handleClick(this.props.index)}>
					<div
						ref={this.projectRef}
						className={componentClasses.join(" ")}
						// src={backgroundImage}
						style={{ backgroundImage: backgroundImage }}
					/>
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
	position: ${props =>
		props.y !== null && props.clickedIndex === props.currentIndex
			? "fixed"
			: "relative"};
	height: 100vh;
	top: 0;
	left: 25%;
	width: 50%;

	animation: ${props =>
		props.y !== null ? props => moveVertically(props.y) : ""};
	animation-duration: 0.2s;
`
const moveVertically = y => keyframes`
    0% { transform : translateY(${y}px) }
    100% { transform : translateY(0px) }
`
