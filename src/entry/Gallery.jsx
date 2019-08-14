import React, { Component } from 'react';
import Img from 'react-image';
import { Link } from "react-router-dom";
import ImageLoader from '../portfolio/imageLoader.jsx'
import {onScreen} from '../common/commonFunctions.js'
import { TransitionGroup, CSSTransition, Transition } from "react-transition-group";
import styled, {keyframes} from 'styled-components';

export default class Gallery extends Component {
	constructor(props) {
		super(props)
		this.state = { visible: false }
		
		this.handleScroll = this.handleScroll.bind(this)
		this.projectRef = React.createRef()
	}

	componentDidMount() {

		window.addEventListener("scroll", this.handleScroll)
		window.addEventListener("resize", this.getFirstElementInfo)
		this.getFirstElementInfo()

	}

	getFirstElementInfo = () => {
		// Get current location's distance from the top of the page
		var position = window.pageYOffset;

		// Get an element's distance from the top of the page
		var getElemDistance = function ( elem ) {
		    var location = 0;
		    if (elem.offsetParent) {
		        do {
		            location += elem.offsetTop;
		            elem = elem.offsetParent;
		        } while (elem);
		    }
		    return location >= 0 ? location : 0;
		};
		var elem = document.getElementsByClassName("project-container")[0]
		var location = getElemDistance( elem );

		var height = elem.clientHeight
		this.props.updateFirstImageContainer(location, height)
	}

    handleScroll = () => {
   		
    	if(onScreen(this.projectRef, {elOffset: "middle"})) {
    		this.setState({visible: true})
    	} else {
    		this.setState({visible: false})
    	}

    	if(onScreen(this.projectRef, {elOffset: "top", screenOffset:"middle"}) | onScreen(this.projectRef, {elOffset: "bottom", screenOffset:"middle"}))
    	 {
    		this.props.updateIndex(this.props.index)
    	}
    }

    // updateTranslateValue = () => {
    // 	const translateValue = this.projectRef.current.getBoundingClientRect().top
    // }

    componentWillUnmount() {
    	window.removeEventListener("scroll", this.handleScroll)
    }

    render() {
  
    	var project = this.props.data;
	    return (	    	
	    	<Wrapper 
	    		y={this.props.imgInitLocation}
	    		clickedIndex={this.props.clickedIndex}
	    		currentIndex={this.props.index}>
		    	<div 
		    		className={this.props.className}
		    		onClick={() => this.updateTranslateValue()}
		    	>
				<Link 
					className="link-to-project"
					to={"projects/" + project['_id']}
					onClick={(e) => this.props.Changing(e, this.props.index)}>
					<div 	
						ref={this.projectRef}
						className={
							this.state.visible ? 
								"individual-project rotate" : 
								"individual-project"
						}
						style={{
							backgroundImage: 'url(/assets/' + project['mainImagePath'] + '.png)'
						}}>
					</div>
				</Link>
				</div>
			</Wrapper>


		);
    }
}


const Wrapper = styled.div`

	position: 
		${props => (props.y !== null & props.clickedIndex === props.currentIndex) ?
		 "fixed" 
		 : "relative"};
	height: 100vh;
	top: 0;
	left:25%;
	width: 50%;

	animation : ${props => (props.y !== null) ? 
					props => moveVertically(props.y)
					: ""};
	animation-duration: 0.2s;
`
const moveVertically = (y) => keyframes`
    0% { transform : translateY(${y}px) }
    100% { transform : translateY(0px) }
`
