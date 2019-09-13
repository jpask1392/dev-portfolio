import React from "react"
import Login from "./login/index.jsx"
import AdminLanding from "./landing/index.jsx"
import AdminUser from "./user/index.jsx"
import AdminProjects from "./projects/index.jsx"
import ShowProject from "./projects/show.jsx"
import SideNavigation from "./common/sideNavigation.jsx"

import { Route, Redirect, Switch } from "react-router-dom"

export default class AdminIndex extends React.Component {
	// static propTypes = {
	// 	name: React.PropTypes.string,
	// };

	constructor(props) {
		super(props)
		// check session user here ?
		// if user is logged in redirect to first page
	}

	render() {
		// need to make this user authentication
		// redirects used when user not authenticated
		return (
			<div className='admin-container'>
				{/*Switch used to only render sideNav after login */}
				<Switch>
					<Route path='/admin/login' exact component={Login} />
					<Route
						path='/admin/'
						render={props => (
							<div>
								<SideNavigation />

								<div className='content-container'>
									<div className='content-header'>
										<h3>{props.location.pathname}</h3>
									</div>
									<div style={{ padding: "30px" }}>
										<Route
											path='/admin/dashboard'
											exact
											render={() =>
												sessionStorage.user ? (
													<AdminLanding />
												) : (
													<Redirect
														to={{
															pathname:
																"/admin/login",
															state: {
																from: this.props
																	.location
															}
														}}
													/>
												)
											}
										/>
										<Route
											path='/admin/users'
											exact
											render={() =>
												sessionStorage.user ? (
													<AdminUser />
												) : (
													<Redirect
														to={{
															pathname:
																"/admin/login",
															state: {
																from: this.props
																	.location
															}
														}}
													/>
												)
											}
										/>
										<Route
											path='/admin/projects'
											exact
											render={() =>
												sessionStorage.user ? (
													<AdminProjects />
												) : (
													<Redirect
														to={{
															pathname:
																"/admin/login",
															state: {
																from: this.props
																	.location
															}
														}}
													/>
												)
											}
										/>
										<Route
											path='/admin/view_project/:id'
											exact
											render={props => {
												const projectID =
													props.match.params.id
												return sessionStorage.user ? (
													<ShowProject
														id={projectID}
													/>
												) : (
													<Redirect
														to={{
															pathname:
																"/admin/login",
															state: {
																from: this.props
																	.location
															}
														}}
													/>
												)
											}}
										/>
									</div>
								</div>
							</div>
						)}
					/>
				</Switch>
			</div>
		)
	}
}
