import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Route, NavLink } from "react-router-dom";

export default class Navigation extends Component {

	constructor(props) {
		super(props);
		this.state = { 
			navClicked: false,
			pages: [
				{title: 'Home', link: '/'},
				{title: 'About', link: '/about'},
				{title: 'Projects', link: '/projects'},
				{title: 'Contact', link: '/contact'}
			]
		}

		this.ButtonClick = this.ButtonClick.bind(this)

	}

	ButtonClick() {
		
		if(window.innerWidth < 900) {
			if(this.state.navClicked) {
				document.body.classList.remove("no-scroll")
				this.setState({navClicked:false})
			} else {
				document.body.classList.add("no-scroll")
				this.setState({navClicked:true});
			}
		}
	}

	render() {

		return (
			<div id="nav-container">
				<nav>
					<BurgerIcon active={this.state.navClicked} clickFunction={this.ButtonClick}/>
					<ul className={this.state.navClicked ? "full-page-nav-visible" : ''}>
						<span>
						{this.state.pages.map((page) => 
							<li key={page.title}>
								<NavLink
									to={page.link}
									exact={true}
									onClick={() => this.ButtonClick()}>
									{page.title}
								</NavLink>
							</li>
						)}
						</span>
					</ul>
				</nav>
			</div>
		)
	}
}

const BurgerIcon = (props) =>
	<div id='burger-icon' onClick={() =>  props.clickFunction()}>
		<span className={"burger-icon-line-one" + (props.active ? '-active' : '')}></span>
		<span className={"burger-icon-line-two" + (props.active ? '-active' : '')}></span>
		<span className={"burger-icon-line-three" + (props.active ? '-active' : '')}></span>
	</div>












