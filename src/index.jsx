import React, { Component } from 'react';
import ReactDOM from "react-dom";
import './masterStyling.scss';
import Navigation from './common/navigation.jsx';
import Project from './portfolio/index.jsx';
import Landing from './entry/landing.jsx';
import About from './entry/about.jsx';
import Portfolio from './entry/portfolio.jsx';
import Contact from './entry/contact.jsx';
import Scroll from './entry/scrollComponent.jsx';
import MessageSent from './entry/messageSent.jsx';
import NoMatch from './common/PageNotFound.jsx';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScrollToTop from './common/ScrollToTop.jsx'
import {onScreen} from './common/commonFunctions.js'
import ScrollPin from './common/scrollPin.jsx'

export default class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			backgroundColor: "black", 
			opacity: 0, 
			visibleSection: "",
			pinLocation: "83.3333%",
			pinColor: "light"
		}

		this.landingRef = React.createRef();
		this.aboutRef = React.createRef();
		this.aboutRefBuffer = React.createRef();
		this.portfolioRef = React.createRef();
		this.portfolioRefBuffer = React.createRef();
		this.contactRef = React.createRef();

		window.addEventListener("scroll", this.handleScroll)

	}

	handleScroll = () => {

		const darkBackground = "#161517"

		if(onScreen(this.aboutRef)) {
			this.setState({visibleSection: "about"})
		} else if(onScreen(this.portfolioRef)) {
			this.setState({visibleSection: "portfolio"})
		} else if(onScreen(this.landingRef)) {
			this.setState({visibleSection: "home"})
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
		}

		// landing
		if(!onScreen(this.landingRef, {elOffset:"bottom"})) {
			this.setState({opacity: 0})
			this.setState({textColor: darkBackground})
		}

		// about
		if(onScreen(this.aboutRefBuffer, {elOffset:"bottom"})) {
			this.setState({backgroundColor: "white", textColor:"#F7F7F7"})
		} else {
			this.setState({backgroundColor: darkBackground, textColor: darkBackground})
		}

		if(!onScreen(this.aboutRef)) {
			this.setState({opacity: 1})
		} else {
			this.setState({opacity: 0})
		}

		// portfolio 
		if(onScreen(this.portfolioRef, {elOffset:"top"})) {
			//add class to element
		} else {
			
		}

		
	}


	render () {
		return (
		<Router>
		<ScrollToTop>
			<Route render={({location}) => (
				
				<div id='page-container'>
					<TransitionGroup style={{height:"100%", opacity:"1"}}>
					<CSSTransition
	                  key={location.key}
	                  classNames="newone"
	                  timeout={300}>
						<Switch location={location}>

							<Route path="/" exact render={(props) => {
								document.title = "Home | Jamie Pask"
								return (
									<div style={{height: "100%"}}> 
										<div 
											className="background-color"
											style={{backgroundColor:this.state.backgroundColor}}
										><h1 style={{opacity: this.state.opacity, color:this.state.textColor}}>{this.state.title}</h1></div>
										<div
											style={{left:this.state.pinLocation}}
											id="pin-container">
											<ScrollPin pinColor={this.state.pinColor}/>
										</div>
										<Navigation/>
										<Landing landingRefProp={this.landingRef}/>
										<div className="about-buffer" ref={this.aboutRefBuffer}></div>
										<About aboutRefProp={this.aboutRef} />
										<div className="portfolio-buffer" ref={this.portfolioRefBuffer}></div>
										<Portfolio 
											portfolioRefProp={this.portfolioRef}
											visibleSection={this.state.visibleSection}
										/>
										<Contact contactRefProp={this.contactRef} />
										<Scroll />
									</div>
								)
							}} />

							<Route path="/sent" exact component={MessageSent} />

							<Route path="/projects/:_id" exact render={(props) => {
								document.title = `${props.match.params._id} | Jamie Pask`
								let projectId = props.location.pathname.replace('/', '');
								return (
									<div className='full-height'>
										<Project projectId={projectId} />
									</div>
								)
							}} />

							<Route component={NoMatch}/>

						</Switch>

                  	</CSSTransition>
                  	</TransitionGroup>
				</div>
				

			)}>
			</Route>
			</ScrollToTop>
		</Router>
		)
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


