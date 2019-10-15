import React, { Component } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./redux/store/index"
import { TransitionGroup, CSSTransition } from "react-transition-group"

// styling
import "./masterStyling.scss"

import Navigation from "./common/navigation.jsx"
import Project from "./portfolio/index.jsx"
import Portfolio from "./entry/portfolio.jsx"
import Contact from "./entry/contact.jsx"
import MessageSent from "./entry/messageSent.jsx"
import NoMatch from "./common/PageNotFound.jsx"
import ScrollToTop from "./common/ScrollToTop.jsx"
import Home from "./entry/index.jsx"
import Background from "./common/background.jsx"
import About from "./about/index.jsx"
import PageChange from "./common/pageChange.jsx"
import AdminIndex from "./cms/index.jsx"
import PortfolioContainer from "./projects/portfolioContainer.jsx"

const App = props => {
	// const PageTracker = pageName =>
	// 	ga("send", {
	// 		hitType: "event",
	// 		eventCategory: "Page views",
	// 		eventAction: "Navigation tab clicked",
	// 		eventLabel: `${pageName} page visited`
	// 	})

	return (
		<BrowserRouter>
			<ScrollToTop>
				<Route
					render={({ location }) => (
						<div id='page-container'>
							<TransitionGroup style={{ height: "100%" }}>
								<CSSTransition
									key={location.key}
									classNames='newone'
									timeout={1000}>
									<Switch location={location}>
										<Route
											path='/'
											exact={true}
											render={() => {
												return (
													<div>
														<PageChange />
														<Home />
													</div>
												)
											}}
										/>

										<Route
											path='/about'
											exact
											render={props => {
												document.title = `About | Jamie Pask`
												return (
													<div
														style={{
															height: "100%"
														}}>
														<PageChange />
														<Navigation />
														<About />
													</div>
												)
											}}
										/>

										<Route
											path='/sent'
											exact
											component={MessageSent}
										/>

										<Route
											path='/projects'
											exact
											render={props => {
												document.title = `Projects | Jamie Pask`
												return (
													<div className='full-height'>
														<PageChange />
														<Background />
														<Navigation />
														<PortfolioContainer />
													</div>
												)
											}}
										/>

										<Route
											path='/projects/:projectName'
											exact
											render={props => {
												// document.title = `${props.match.params._id} | Jamie Pask`
												let projectName = props.location.pathname.replace(
													"/projects/",
													""
												)
												return (
													<div className='full-height'>
														<Navigation />
														<Project
															projectName={
																projectName
															}
														/>
													</div>
												)
											}}
										/>

										<Route
											path='/contact'
											exact
											render={() => {
												document.title = `Contact | Jamie Pask`
												return (
													<div className='full-height'>
														<Background />
														<PageChange />
														<Navigation burgerColor='black' />
														<Contact />
													</div>
												)
											}}
										/>

										<Route
											path='/admin'
											exact
											component={NoMatch}
										/>
										<Route
											path='/admin/'
											component={AdminIndex}
										/>

										<Route component={NoMatch} />
									</Switch>
								</CSSTransition>
							</TransitionGroup>
						</div>
					)}></Route>
			</ScrollToTop>
		</BrowserRouter>
	)
}

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
)
