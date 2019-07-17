import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Route } from "react-router-dom";

export default class Navigation extends Component {

	// STATE FOR BUTTON CLICKED
	constructor(props) {
		super(props);
		this.state = { 
			navClicked: false,
		}

		this.ButtonClick = this.ButtonClick.bind(this)
	}

	ButtonClick() {
		// this.state.navClicked ? 
		// 	this.setState({navClicked:false}) : 
		// 	this.setState({navClicked:true});
		if(this.state.navClicked) {
			document.body.classList.remove("no-scroll")
			this.setState({navClicked:false})
		} else {
			document.body.classList.add("no-scroll")
			this.setState({navClicked:true});
		}
	}

	render() {


		return (
			<div id="nav-container">
				<nav>
					<BurgerIcon 
						active={this.state.navClicked}
						clickFunction={this.ButtonClick}
					/>
					<ul className={this.state.navClicked ? "full-page-nav" : ''}>
						<span>
							<li><a href="#">Home</a></li>
							<li><a href="#">About</a></li>
							<li><a href="#">Projects</a></li>
							<li><a href="#">Contact</a></li>
						</span>
					</ul>
				</nav>
			</div>
		)
	}
}

function BurgerIcon(props) {
	return (
		<div id='burger-icon' onClick={() =>  props.clickFunction()}>
			<span className={"burger-icon-line-one" + (props.active ? '-active' : '')}></span>
			<span className={"burger-icon-line-two" + (props.active ? '-active' : '')}></span>
			<span className={"burger-icon-line-three" + (props.active ? '-active' : '')}></span>
		</div>
	)
}












