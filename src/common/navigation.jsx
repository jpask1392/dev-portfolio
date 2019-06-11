import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Route, Link } from "react-router-dom";
import FullPageNav from './fullPageNav.jsx';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export default class Navigation extends Component {

	// STATE FOR BUTTON CLICKED
	constructor(props) {
		super(props);
		this.state = { 
			navClicked: false,
		 }
	}
	
	// FUNCTION USED FOR STATE CHANGES 
	ButtonClick() {
		this.state.navClicked ? this.setState({navClicked:false}) : this.setState({navClicked:true});
	}

	// RENDER GETS CALLED EVERYTIME STATE IS UPDATED
	render() {

		return (
			<span id="nav-container">
			<Route path="/projects/:_id" exact component={BackButton} />
			<Route path="/" exact render={() => (
				<nav className="nav-button" onClick={() =>  this.ButtonClick()}>
						
							<BurgerIcon active={this.state.navClicked}/>
						
				</nav>
			)} />
			<CSSTransition 	in={this.state.navClicked} 
							timeout={1000} 
							classNames="nav-items"
							unmountOnExit={true}>
							<FullPageNav 
								aboutRefProp={this.props.aboutRefProp} 
								portfolioRefProp={this.props.portfolioRefProp}
								contactRefProp={this.props.contactRefProp}
								active={this.ButtonClick.bind(this)}
							/>
			</CSSTransition>
			</span>
		)
	}
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













