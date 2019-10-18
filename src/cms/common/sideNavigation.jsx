import React from "react"
import { NavLink } from "react-router-dom"
import { userServices } from "../login/userServices"
import Header from "../common/header.jsx"

export default class SideNavgiation extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			sections: [
				{ name: "Dashboard", link: "/admin/dashboard" },
				{ name: "Users", link: "/admin/users" },
				{ name: "Projects", link: "/admin/projects" }
			]
		}
	}

	render() {
		return (
			<div id='side-nav-container' className='side-nav-show'>
				<Header color='white'>Logo</Header>
				<ul>
					{this.state.sections.map(section => (
						<li key={section.name}>
							<NavLink to={section.link}>
								<b>{section.name}</b>
							</NavLink>
						</li>
					))}
				</ul>

				<button
					type='button'
					onClick={() => {
						userServices.logout()
						window.location.replace("/admin/login")
					}}>
					Logout
				</button>
			</div>
		)
	}
}
