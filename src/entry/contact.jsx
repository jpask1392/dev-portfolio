import React from "react"
import Form from "./form.jsx"
import { onScreen } from "../common/commonFunctions.js"
import Navigation from "../common/navigation.jsx"
import { withRouter } from "react-router-dom"

class Contact extends React.Component {
	constructor(props) {
		super(props)

		this.state = { visible: false }
		this.handleScroll = this.handleScroll.bind(this)
	}

	componentDidMount = () => {
		this.props.location.pathname === "/contact"
			? this.setState({ visible: true })
			: null

		window.addEventListener("scroll", this.handleScroll)
	}

	handleScroll = () => {
		if (this.props.location.pathname !== "/contact") {
			this.setState(() =>
				onScreen(this.props.contactRefProp, { elOffset: "top" })
					? { visible: true }
					: { visible: false }
			)
		}
	}

	componentWillUnmount = () =>
		window.removeEventListener("scroll", this.handleScroll)

	render() {
		return (
			<div
				id='contact-container'
				ref={this.props.contactRefProp}
				style={
					this.props.location.pathname === "/contact"
						? { backgroundColor: "white" }
						: null
				}>
				<div className='contact-text-container'>
					<div className='contact-inner-text-container'>
						<h2>Reach out :)</h2>
						<span>
							<h3
								style={{
									marginBottom: "30px",
									color: "lightGrey",
									display: "inline"
								}}>
								Download PDF Resum&eacute; Here
							</h3>
							<a
								onClick={() =>
									ga("send", {
										hitType: "event",
										eventCategory: "downloads",
										eventAction: "Portfolio downloaded",
										eventLabel: "Portfolio downloaded"
									})
								}
								style={{ color: "black" }}
								href='/assets/resume.pdf'
								download>
								<i
									className='fas fa-file-download'
									style={{ marginLeft: "20px" }}></i>
							</a>
						</span>
						<p>
							Thanks for taking the time to check out what I have
							to offer. If you have any questions about me or my
							capabilities please reach out. I’d be happy to
							answer any questions you may have
						</p>

						<h3 className='sub-heading'>
							Or check out the socials
						</h3>
						<p>
							<a
								href='https://github.com/jpask1392'
								target='_blank'>
								<i className='fab fa-github-square'></i>
							</a>
							<a
								href='https://www.linkedin.com/in/jamie-pask/'
								target='_blank'>
								<i className='fab fa-linkedin'></i>
							</a>
							<a
								href='https://www.instagram.com/jpaskart/'
								target='_blank'>
								<i className='fab fa-instagram'></i>
							</a>
						</p>
					</div>
				</div>

				<div
					className={
						this.state.visible
							? "start contact-page end"
							: "start contact-page"
					}>
					<Form />
				</div>

				<BottomNavigation />
			</div>
		)
	}
}

export default withRouter(Contact)

const BottomNavigation = () => {
	if (location.pathname === "/") {
		return (
			<div className='contact-nav-container'>
				<Navigation />
			</div>
		)
	} else {
		return null
	}
}
