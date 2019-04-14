import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Route, Link } from "react-router-dom";

export default class Navigation extends Component {

	// ADD STATE FOR BUTTON CLICKED
	constructor(props) {
		super(props);
		this.state = { navClicked: false }
	}
	
	// FUNCTION USED FOR STATE CHANGES 
	ButtonClick() {
		this.state.navClicked ? this.setState({navClicked:false}) : this.setState({navClicked:true});
	}


	// RENDER GETS CALLED EVERYTIME STATE IS UPDATED
	render() {
		return (
			<span id="nav-container">
			<Route path="/:_id" exact component={BackButton} />
			<nav className="nav-button" onClick={() =>  this.ButtonClick()}>
				<BurgerIcon active={this.state.navClicked}/>
			</nav>
			<CSSTransition 	in={this.state.navClicked} 
							timeout={0} 
							classNames="nav-items"
							unmountOnExit={true}>
							<NavList />
			</CSSTransition>
			</span>
		)
	}
}

function HandleScroll(location) {
	var goTo;

	// TODO - NEED TO COME BACK TO THIS
	switch (location) {
		case "home": goTo = "landing-container"; break;
		case "about": goTo = "about-container"; break;
		case "portfolio": goTo = "test-container"; break;
		case "contact": goTo = "test-container" ;
	}

}

// NAV LIST COMPONENT
function NavList() {
	return (
		<nav id="nav-list">
			<ul>
				<li><Link to="/" onClick={HandleScroll("about")}>Home</Link></li>
				<li><a href="#">About</a></li>
				<li><a href="#">Projects</a></li>
				<li><a href="#">Contact</a></li>
			</ul>
		</nav>
	)
} 

// NAV BURGER ICON COMPONENT WITH PROPS TO PASS ACTIVE:TRUE/FALSE PROPS
function BurgerIcon(props) {
	return (
		<div id='burger-icon'>
			<span className={"burger-icon-line-one" + (props.active ? '-active' : '')}></span>
			<span className={"burger-icon-line-two" + (props.active ? '-active' : '')}></span>
			<span className={"burger-icon-line-three" + (props.active ? '-active' : '')}></span>
		</div>
	)
}

// BACK BUTTON TO RENDER WHEN ROUTE MATCHES '/:id'
function BackButton() {
	return (
	<div id='back-button'>
		<Link to="/"> 
			<div id="back-button-container">
				<span className="back-icon-line-three"></span>
				<span className="back-icon-line-one"></span>
				<span className="back-icon-line-two"></span>
			</div>
		</Link>
	</div>
	)
}













