import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { TransitionGroup, CSSTransition, Transition } from "react-transition-group";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './redux/store/index'

// styling 
import './masterStyling.scss';

// Custom components 
import { onScreen } 	from './common/commonFunctions.js'
import Navigation 		from './common/navigation.jsx'; 
import Project 			from './portfolio/index.jsx';
import Portfolio 		from './entry/portfolio.jsx';
import Contact 			from './entry/contact.jsx';
import Scroll 			from './entry/scrollComponent.jsx';
import MessageSent 		from './entry/messageSent.jsx';
import NoMatch 			from './common/PageNotFound.jsx';
import ScrollToTop 		from './common/ScrollToTop.jsx'
import ScrollPin 		from './common/scrollPin.jsx'
import Home 			from './entry/index.jsx'
import Background 		from './common/background.jsx'
import About 			from './about/index.jsx'
import PageChange 		from './common/pageChange.jsx'
import AdminIndex 		from './cms/index.jsx'



export default class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			translateValue: null
		}
	}

	updateTranslateValue = (newValue) => {
		this.setState({translateValue: newValue})
	}

	render () {
		return (
		<Router>
		<ScrollToTop>
			<Route render={({location}) => (
				
				<div id='page-container'>
				
					<TransitionGroup style={{height:"100%"}}>
					<CSSTransition
	                  key={location.key}
	                  classNames="newone"
	                  timeout={1000}>
						<Switch location={location}>

							<Route path="/" exact={true} render={(props) => {
								document.title = "Home | Jamie Pask"
								return (
									<div style={{height:"100%"}}>
										<PageChange />
										<Home 
											location={props.location}
											updateTranslateValue={this.updateTranslateValue.bind(this)}
											imgInitLocation={this.state.translateValue}
										/>
									</div>
								)
							}} />

							<Route path="/about" exact render={(props) => {
									document.title = "Home | Jamie Pask"
									return (
										<div style={{height:"100%"}}>
											<PageChange />
											<Navigation/>
											<About 
												location={props.location}
											/>
										</div>
									)
								}} />

							<Route path="/sent" exact component={MessageSent} />

							<Route path="/projects" exact render={(props) => {

								document.title = `Projects | Jamie Pask`

								
								return (
									<div className='full-height'>
										<PageChange />
										<Background />
										<Navigation />
										<Portfolio 
											visibleSection="portfolio"
											location={props.location}
											updateTranslateValue={this.updateTranslateValue.bind(this)}
											imgInitLocation={this.state.translateValue}
										/> 
									</div>
								)
							}} />

							<Route path="/projects/:_id" exact render={(props) => {
								
								document.title = `${props.match.params._id} | Jamie Pask`
								let projectId = props.location.pathname.replace('/projects/', '');
								return (
									<div className='full-height'>
										<Navigation/>
										{/*<PageChange />*/}
										<Project 
											projectId={projectId}
											location={location}
										 />
									</div>
								)
							}} />

							<Route path="/contact" exact render={(props) => {
								
								document.title = `Contact | Jamie Pask`
								
								return (
									<div className='full-height'>
										<Background />
										<PageChange />
										<Navigation />
										<Contact
											location={props.location}
										/>
									</div>
								)
							}} />

							<Route path='/admin' exact component={NoMatch}/>
							<Route path='/admin/' component={AdminIndex}/>

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
	<Provider store={store}>
  		<App />
  	</Provider>,
  	document.getElementById('root')
);


