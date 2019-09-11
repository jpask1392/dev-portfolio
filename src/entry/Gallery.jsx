import React, { Component } 	from 'react';
import { Link } 				from "react-router-dom";
import { onScreen } 			from '../common/commonFunctions.js'
import styled, { keyframes } 	from 'styled-components';
import { connect } 				from 'react-redux'
import {
	updateVisProjectIndex,
	updateVisSectionIndex
} from '../redux/actions/index'

class Gallery extends Component {
	constructor(props) {
		super(props)
		this.state = { visible: false }
		this.handleScroll = this.handleScroll.bind(this)
		this.projectRef = React.createRef()
	}

	componentDidMount() {
		window.addEventListener("scroll", this.handleScroll)
		window.addEventListener("resize", this.getFirstElementInfo)
		// check on load if the image is on screen
		if(onScreen(this.projectRef, {elOffset: "middle"})) {this.setState({visible: true})} 
	}

	// need to set a visible project index in the Redux state 
	handleScroll = () => {
		// set visible to rotate image
		// can propbably do this with prevProps
		(onScreen(this.projectRef, {elOffset: "middle"})) ?
    		this.setState({visible: true}) : 
    		this.setState({visible: false})

    	// check what this function is doing
    	if(onScreen(this.projectRef, {elOffset: "top", screenOffset:"middle"}) | 
    		onScreen(this.projectRef, {elOffset: "bottom", screenOffset:"middle"})) 
    	{	
    		// update visible project index with dispatch
    		this.props.dispatch(updateVisProjectIndex(this.props.index))
    	}
	} 

    componentWillUnmount = () => window.removeEventListener("scroll", this.handleScroll)

    render() {
    	const project = this.props.data;

	    return (	    	
	    	<Wrapper 
	    		y={this.props.imgInitLocation}
	    		clickedIndex={this.props.clickedIndex}
	    		currentIndex={this.props.index}
	    		className="gallery-wrapper">
		    	<div className="project-container">
				<Link 
					className="link-to-project"
					to={"projects/" + project['_id']}
					onClick={(e) => { 
						this.props.Changing(e, this.props.index) 
						return (
							ga('send', {
							  hitType: 'event',
							  eventCategory: 'Videos',
							  eventAction: 'sdkjfnjksdfsdf',
							  eventLabel: 'Fall sdf,sdnfjk'
							})
						)
					}}>
					<div 	
						ref={this.projectRef}
						className={`individual-project ${this.state.visible ? "rotate" : ""}`}
						style={{backgroundImage: 'url(/assets/' + project['mainImagePath']}}>
					</div>
				</Link>
				</div>
			</Wrapper>
		);
    }
}

// Function required from Redux to map Redux state to component props
const mapStateToProps = (state, ownProps) => state

// Connect the component to the store
Gallery = connect(mapStateToProps)(Gallery)

// Export the connected component
export default Gallery

const Wrapper = styled.div`

	position: ${props => (props.y !== null && props.clickedIndex === props.currentIndex) ?
		 		"fixed" : "relative"};
	height: 100vh;
	top: 0;
	left:25%;
	width: 50%;

	animation : ${props => (props.y !== null) ? 
					props => moveVertically(props.y) : ""};
	animation-duration: 0.2s;
`
const moveVertically = (y) => keyframes`
    0% { transform : translateY(${y}px) }
    100% { transform : translateY(0px) }
`