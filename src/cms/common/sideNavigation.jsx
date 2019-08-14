import React 			from 'react';
import { NavLink } 		from "react-router-dom";
import { userServices } from '../login/userServices'

export default class SideNavgiation extends React.Component {
	// static propTypes = {
	// 	name: React.PropTypes.string,
	// };

	constructor(props) {
		super(props);
		this.state = {
			sections: [
				{name: "Dashboard", link: "/admin/dashboard"}, 
				{name: "Users", link: "/admin/users"}, 
				{name: "Projects", link: "/admin/projects"}
			]
		}
	}

	render() {
		return (
			<div id="side-nav-container">
				<div className="side-nav-header"></div>
				<ul>
				{this.state.sections.map((section) => 	
					<li key={section.name}>
						<NavLink  
							to={section.link}>
							<b>{section.name}</b>
						</NavLink>
					</li>
				)}
				</ul>
				<button 
					type="button"
					onClick={() => { 
						userServices.logout()
						window.location.replace('/admin/login')
					}}>Logout
				</button>
			</div>
		);
	}
}
