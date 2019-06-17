import React, { Component } from 'react';
import './about.scss';
import ReactSVG from 'react-svg';
import SvgAboutImage from './SvgAboutImage.jsx';
import { onScreen } from '../common/commonFunctions.js'

export default class About extends Component {
	_isMounted = false;

	constructor(props) {
		super(props);
		this.state = { 
				visible: false, 
			};

		this.handleScroll = this.handleScroll.bind(this);
		this.myRef = React.createRef();
	}

	// COLLECT COMPONENT TOP POSTION
	componentDidMount() { 

		this._isMounted = true;

		if(this._isMounted) {

			if(onScreen(this.myRef)) {
				this.setState({ visible: true });
			}

			window.addEventListener('scroll', this.handleScroll);	
		}

		// WINDOW RESIZE EVENT LISTENER HERE
	}

	// FUNCTION TO HANDLE LOCATION OF COMPONENT ON SCREEN
	handleScroll() {

		if(this._isMounted) {
			if(onScreen(this.myRef)) {
				this.setState({ visible: true });
			} else {
				this.setState({ visible: false })
			}
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		return (
			<div className="about-container " id='about-container' ref={this.props.aboutRefProp}>

				<div id='about-img-container' ref={this.myRef} >

					<SvgAboutImage visible={this.state.visible} />					

				</div>

				<div className="container-max" id='about-text-container'>

					<div className="col rhs">

						<p>
						<b className="sub-heading">Background</b>
						<br/>

						I am Jamie Pask, born and raised in Cardiff, United Kingdom. Spent some time in Vancouver before eventually tying the knot and recently moving to Los Angeles, Santa Monica area.
						</p>

						<p>
						<b className="sub-heading">Achievements</b>
						<br/>

						My professional background is rooted within Architecture. I graduated from Cardiff Metropolitan University in 2015, leading to a career as an Architectural Technologist for the past 3 years.  A need to build an architectural site portfolio back in 2015 led me down the rabbit hole of programming which is an interest almost everyday in the office, creating simple scripts to automate a variety of tasks, saving hundreds of work hours. The more I learned, the more I wanted to progress. I’ve built Wordpress sites for a previous firm and built my web portfolio many times, implementing new techniques through each iteration. My interest shows no signs of slowing down and I am very excited to learn more.<br/>
						</p>

						<p>
						<b className="sub-heading">The Goals</b>
						<br/>

						Full stack development ticks all the boxes for me, from data collection to data driven design schemes, and this is ultimately the route I want to follow. Machine learning is also of intrigue and I would hope that after some time, this will become a staple part of my daily workflow.
						</p>
					</div>
       
				</div>

			</div>
		)
	}
}















