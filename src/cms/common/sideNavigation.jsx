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
			visible: true,
			sections: [
				{name: "Dashboard", link: "/admin/dashboard"}, 
				{name: "Users", link: "/admin/users"}, 
				{name: "Projects", link: "/admin/projects"}
			]
		}
	}

	toggleVisible = () => this.setState(prevProps => ({ visible: !prevProps.visible })) 
	

	render() {
		
		return (
			<React.Fragment>
			<button
				className="side-nav-toggle-btn" 
				onClick={this.toggleVisible}>
					SHOW/HIDE
				</button>
			<div 
				id="side-nav-container" 
				className={this.state.visible ? "side-nav-show" : "side-nav-hide"}>
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
			</React.Fragment>
		);
	}
}
