import React 				from 'react';
import { Route, Redirect, Switch } 	from "react-router-dom";
import Login 				from './login/index.jsx';
import AdminLanding 		from './landing/index.jsx';
import SideNavigation 		from './common/sideNavigation.jsx';

export default class AdminIndex extends React.Component {
	// static propTypes = {
	// 	name: React.PropTypes.string,
	// };

	constructor(props) {
		super(props);
		// check session user here ? 
		// if user is logged in redirect to first page
	}

	render() {
		// need to make this user authentication
		return (
			<div className="admin-container">
			{/*Switch used to only render sideNav after login */}
			<Switch>
				<Route path='/admin/login' exact component={Login} />
				<Route path='/admin/' component ={SideNavigation} />
			</Switch>
				<div className="content-container">
				<div className="content-header"><h3>{this.props.location.pathname}</h3></div>
				<Route path='/admin/dashboard' exact render={() => 
					sessionStorage.user ? 
						<AdminLanding /> : 
						<Redirect to={{ pathname: '/admin/login', state: { from: this.props.location } }} />
				} />
				<Route path='/admin/users' exact render={() => 
					sessionStorage.user ? 
						<AdminLanding /> : 
						<Redirect to={{ pathname: '/admin/login', state: { from: this.props.location } }} />
				} />
				<Route path='/admin/projects' exact render={() => 
					sessionStorage.user ? 
						<AdminLanding /> : 
						<Redirect to={{ pathname: '/admin/login', state: { from: this.props.location } }} />
				} />
				</div>
			</div>			
		);
	}
}
