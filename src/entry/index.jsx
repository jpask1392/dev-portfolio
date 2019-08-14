import React, { Component } from 'react';
import ReactDOM from "react-dom";
import '../masterStyling.scss';
import Navigation from '../common/navigation.jsx';
// import Project from '../portfolio/index.jsx';
import Landing from './landing.jsx';
import About from './about.jsx';
import Portfolio from './portfolio.jsx';
import Contact from './contact.jsx';
import Scroll from './scrollComponent.jsx';
// import MessageSent from './entry/messageSent.jsx';
// import NoMatch from './common/PageNotFound.jsx';
// import { TransitionGroup, CSSTransition, Transition } from "react-transition-group";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import ScrollToTop from './common/ScrollToTop.jsx'
import {onScreen} from '../common/commonFunctions.js'
import ScrollPin from '../common/scrollPin.jsx'
import Background from '../common/background.jsx'

export default class Home extends React.Component {
	_isMounted = false;

	// static propTypes = {
	// 	name: React.PropTypes.string,
	// };

		constructor(props) {
		super(props);

		this.state = {
			visibleSection: "",
			pinLocation: "83.3333%",
			pinColor: "light",
			translateValue: null
		}

		this.landingRef = React.createRef();
		this.aboutRef = React.createRef();
		this.aboutRefBuffer = React.createRef();
		this.portfolioRef = React.createRef();
		this.portfolioRefBuffer = React.createRef();
		this.contactRef = React.createRef();
		this.contactRefBuffer = React.createRef();

	}

	componentDidMount() {
		this._isMounted = true

		if(this._isMounted) {
			window.addEventListener("scroll", this.handleScroll)
		}
	}

	// updateTranslateValue = (newValue) => {
	// 	this.setState({translateValue: newValue})
	// }

	handleScroll = () => {

		if(onScreen(this.aboutRef)) {
			this.setState({visibleSection: "about"})
		} else if(onScreen(this.portfolioRef)) {
			this.setState({visibleSection: "portfolio"})
		} else if(onScreen(this.landingRef)) {
			this.setState({visibleSection: "home"})
		} else if(onScreen(this.contactRef)) {
			this.setState({visibleSection: "contact"})
		}

		switch(this.state.visibleSection) {
			case "home":
				this.setState({pinLocation: "83.3333%", pinColor:"light"})
				break;
			case "about":
				this.setState({pinLocation: "8.3333%", pinColor:"dark"})
				break;
			case "portfolio":
				this.setState({pinLocation: "83.3333%", pinColor:"light"})
				break;
			case "contact":
				this.setState({pinLocation: "41.6666%", pinColor:"dark"})
				break;
		}
	}

	componentWillUnmount() {
		this._isMounted = false
		window.removeEventListener("scroll", this.handleScroll)
	}

	render() {
		const object = {
			lightBackRefs: [this.aboutRefBuffer, this.aboutRef, this.contactRef], 
			darkBackRefs: [this.landingRef, this.portfolioRef]
		}
		return (
			<div style={{height: "100%"}}>
		
			<Background colors={object}/>
			
			<div
				style={{left:this.state.pinLocation}}
				id="pin-container">

				<ScrollPin pinColor={this.state.pinColor}/>
			</div>

			<Navigation/>
			
			<Landing landingRefProp={this.landingRef}/>
			
			<div 
				className="about-buffer" 
				ref={this.aboutRefBuffer}>
			</div>
			<About aboutRefProp={this.aboutRef} />
			<div 
				className="portfolio-buffer" 
				ref={this.portfolioRefBuffer}>
			</div>
			
			<Portfolio 
				location={this.props.location}
				portfolioRefProp={this.portfolioRef}
				visibleSection={this.state.visibleSection}
				updateTranslateValue={this.props.updateTranslateValue}
				imgInitLocation={this.props.imgInitLocation}
			/>

			<div 
				className="contact-buffer" 
				ref={this.contactRefBuffer}>
			</div>
			
			<Contact 
				location={this.props.location}
				contactRefProp={this.contactRef}
				visibleSection={this.state.visibleSection}
			/>
			</div>
		);
	}
}
