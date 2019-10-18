import React from "react"
import Login from "./login/index.jsx"
import AdminLanding from "./landing/index.jsx"
import AdminUser from "./user/index.jsx"
import AdminProjects from "./projects/index.jsx"
import ShowProject from "./projects/show.jsx"
import SideNavigation from "./common/sideNavigation.jsx"
import Header from "./common/header.jsx"

import { Route, Redirect, Switch } from "react-router-dom"

const AdminIndex = props => {
	const redirectObj = {
		pathname: "/admin/login",
		state: {
			from: props.location
		}
	}
	return (
		<div className='admin-container'>
			<Switch>
				<Route
					path={`${props.match.url}/login`}
					exact
					component={Login}
				/>

				<Route
					path={`${props.match.url}/`}
					render={() => (
						<div>
							<SideNavigation />
							<div className='content-container'>
								<Header>{props.location.pathname}</Header>

								<Route
									path={`${props.match.url}/dashboard`}
									exact={true}
									render={() =>
										sessionStorage.user ? (
											<AdminLanding />
										) : (
											<Redirect to={redirectObj} />
										)
									}
								/>

								<Route
									path={`${props.match.url}/users`}
									exact={true}
									render={() =>
										sessionStorage.user ? (
											<AdminUser />
										) : (
											<Redirect to={redirectObj} />
										)
									}
								/>

								<Route
									path={`${props.match.url}/projects`}
									exact={true}
									render={() =>
										sessionStorage.user ? (
											<AdminProjects />
										) : (
											<Redirect to={redirectObj} />
										)
									}
								/>

								<Route
									path='/admin/view_project/:id'
									exact={true}
									render={props =>
										sessionStorage.user ? (
											<ShowProject id={props.match.params.id} />
										) : (
											<Redirect to={redirectObj} />
										)
									}
								/>
							</div>
						</div>
					)}
				/>
			</Switch>
		</div>
	)
}

export default AdminIndex
