import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import SvgAboutImage from './SvgAboutImage.jsx';
import { onScreen } from '../common/commonFunctions.js'
import AboutCarousel from './aboutCarousel.jsx'


export default class About extends Component {
	_isMounted = false;

	constructor(props) {
		super(props);
		this.state = { 
				visible: false, 
			};
		this.handleScroll = this.handleScroll.bind(this)

	}

	componentDidMount() {
		window.addEventListener("scroll", this.handleScroll)

		setTimeout(this.removeDelay, 3000)
	}

	componentWillUnmount() {
		this._isMounted = false;

		
	}

	handleScroll = () => {
		if(onScreen(this.props.aboutRefProp, {elOffset:"top"})) {
			this.setState({visible: true})
		} else {
			this.setState({visible: false})
		}
	}

	removeDelay = () => {
		console.log("Blah")
	}

	render() {

		return (
			<div className="about-container " id='about-container' ref={this.props.aboutRefProp}>
				<div className={this.state.visible ? "temp-image hide" : ""}></div>
				<div className={this.state.visible ? "white-flash-cover-one" : ""}></div>
				<div className={this.state.visible ? "white-flash-cover-two" : ""}></div>
				<div className={this.state.visible ? "start end" : "start"}></div>
				<div 
					id="about-text-container"
					className={this.state.visible ? "fade-in-text" : ""}
				>
					<h2>I’m a passionate developer constantly improving. </h2>
					<p style={{marginTop: "30px", marginBottom: "30px"}}>To sum it up</p>
					<span>
						<b className="sub-heading">June 2014</b>
						<p>
						Graduated from Cardiff Metropolitan University with a Bachelor Degree in Architectural Design and Technology
						</p>
						<br></br>

						<b className="sub-heading">June 2015</b>
						<p>
						Began working as a technician after close to year of traveling around America and Canada. During this time I began to develop an interest for software development after trying to create a web portfolio.
						</p>
						<br></br>

						<b className="sub-heading">June 2018</b>
						<p>
						After 3 years of working as a technician I decided to finally pursue a career as a software developer. I tied the knot and moved off to Los Angeles, Brentwood area.
						</p>
						<br></br>
					</span>
				</div>
			</div>
		)
	}
}















