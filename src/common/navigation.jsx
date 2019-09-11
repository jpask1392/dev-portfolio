import React 					from 'react';
import { CSSTransition } 		from 'react-transition-group';
import { withRouter, NavLink } 	from "react-router-dom";

class Navigation extends React.Component {

	static defaultProps = {
		burgerColor: "white"
	}

	constructor(props) {
		super(props);
		this.state = { 
			navClicked: false,
			burgerColor: this.props.burgerColor,
			pages: [
				{title: 'Home', link: '/', exact: true},
				{title: 'About', link: '/about', exact: false},
				{title: 'Projects', link: '/projects', exact: false},
				{title: 'Contact', link: '/contact', exact: false}
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

			this.setState(() => {
				if(this.props.location.pathname === '/contact') {
					this.state.navClicked ?
						{burgerColor:"black"}:
						{burgerColor:"white"}
				}
			})
		}
	}

	render() {

		return (
			<div id="nav-container">
				<nav>
					<BurgerIcon 
						active={this.state.navClicked} 
						clickFunction={this.ButtonClick}
						burgerColor={this.state.burgerColor}/>

					<ul className={this.state.navClicked ? "full-page-nav-visible" : ''}>
						<span>
						{this.state.pages.map((page) => 
							<li key={page.title}>
								<NavLink
									to={page.link}
									exact={page.exact}
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

export default withRouter(Navigation)

const BurgerIcon = (props) =>
	<div id='burger-icon' onClick={() =>  props.clickFunction()}>
		<span 
			style={{background: props.burgerColor}} 
			className={"burger-icon-line-one" + (props.active ? '-active' : '')}>
		</span>
		<span 
			style={{background: props.burgerColor}} 
			className={"burger-icon-line-two" + (props.active ? '-active' : '')}>
		</span>
		<span 
			style={{background: props.burgerColor}} 
			className={"burger-icon-line-three" + (props.active ? '-active' : '')}>
		</span>
	</div>












