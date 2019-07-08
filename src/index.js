import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Navigation from './common/navigation.jsx';
import './common/common.scss';
import Home from './entry/home.jsx';
import Project from './portfolio/index.jsx';
import './entry/scrollComponent.scss';
import Landing from './entry/landing.jsx';
import About from './entry/about.jsx';
import Portfolio from './entry/portfolio.jsx';
import Contact from './entry/contact.jsx';
import './entry/about.scss';
import Scroll from './entry/scrollComponent.jsx';
import MessageSent from './entry/messageSent.jsx';
import NoMatch from './common/PageNotFound.jsx';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScrollToTop from './common/ScrollToTop.jsx'

export default class App extends Component {

	constructor(props) {
		super(props);

		this.aboutRef = React.createRef();
		this.portfolioRef = React.createRef();
		this.contactRef = React.createRef();

	}

	render () {
		return (
		<Router>
		<ScrollToTop>
			<Route render={({location}) => (
				<div className='full-height'>
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
									<div className="full-height"> 
										<Landing />
										<About aboutRefProp={this.aboutRef} />
										<Portfolio portfolioRefProp={this.portfolioRef}/>
										<Contact contactRefProp={this.contactRef} />
										<Navigation 
											aboutRefProp={this.aboutRef} 
											portfolioRefProp={this.portfolioRef}  
											contactRefProp={this.contactRef}  
										/>
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


