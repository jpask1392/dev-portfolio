import React from 'react';
import Form from './form.jsx';
import { onScreen } from '../common/commonFunctions.js'
import Navigation from '../common/navigation.jsx';

export default class contact extends React.Component {

	constructor(props) {
		super(props);

		this.state = {visible: false}
		this.handleScroll = this.handleScroll.bind(this)

	}

	componentDidMount() {
		this._isMounted = true
		
		this.props.location.pathname === '/contact' ? 
			this.setState({visible: true}) : 
			null

		if(this._isMounted) {
			window.addEventListener("scroll", this.handleScroll)
		}
	}

	handleScroll = () => {

		if(this._isMounted & onScreen(this.props.contactRefProp, {elOffset:"top"})) {
			this.setState({visible: true})
		} else {
			this.setState({visible: false})
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
		window.removeEventListener("scroll", this.handleScroll)
	}

	render() {
		return (
		
			<div 
				id="contact-container" 
				ref={this.props.contactRefProp}
				style={this.props.location.pathname === '/contact' ? {backgroundColor:"white"} : null}
			> 

			<div className={this.state.visible & this.props.location.pathname === "/" ? 
					"temp-image hide contact-page" : 
					""
				}>
			</div>
				<div className="contact-text-container">
					<h2>Reach out :)</h2>
					
					<p>
						Thanks for taking the time to check out what I have to offer. If you have any questions about me or my capabilities please reach out. I’d be happy to answer any questions you may have
					</p>

					<h3 className="sub-heading">Or check out the socials</h3>
					<p>
						<a href="https://www.instagram.com/jpaskart/" target="_blank">
							<i className="fab fa-instagram"></i>
						</a>
						<a href="https://github.com/jpask1392" target="_blank">
							<i className="fab fa-github-square"></i>
						</a>
						<a href="https://www.linkedin.com/in/jamie-pask/" target="_blank">
							<i className="fab fa-linkedin"></i>
						</a>
					</p>

				</div>

				<div className={this.state.visible ? "start contact-page end" : "start contact-page"}>
					<Form />
				</div>


				<form action="/" method="post">
					<button type='submit'></button>
				</form>

				<BottomNavigation />

			</div>
		
		);
	}
}


const BottomNavigation = () => {

	if (location.pathname === '/') {
		return (
			<div className="contact-nav-container">
				<Navigation />
			</div>
		)
	} else {
		return null
	}
}


