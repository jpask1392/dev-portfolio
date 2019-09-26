import React from "react"
import Navigation from "../common/navigation.jsx"
import Landing from "./landing.jsx"
import About from "./about.jsx"
import Portfolio from "./portfolio.jsx"
import Contact from "./contact.jsx"
import { onScreen } from "../common/commonFunctions.js"
import ScrollPin from "../common/scrollPin.jsx"
import Background from "../common/background.jsx"
import PropTypes from "prop-types"

export default class Home extends React.Component {
	static propTypes = {
		updateTranslateValue: PropTypes.func,
		imgInitLocation: PropTypes.number
	}

	constructor(props) {
		super(props)
		this.state = {
			visibleSection: "",
			translateValue: null
		}
		this.visibleSection = ""
		this.pinLocation = "83.3333%"
		this.pinColor = "light"

		this.landingRef = React.createRef()
		this.aboutRef = React.createRef()
		this.aboutRefBuffer = React.createRef()
		this.portfolioRefBuffer = React.createRef()
		this.portfolioRef = React.createRef()
		this.contactRef = React.createRef()
		this.contactRefBuffer = React.createRef()
	}

	componentDidMount = () =>
		window.addEventListener("scroll", this.handleScroll)

	handleScroll = () => {
		if (onScreen(this.aboutRef)) {
			this.setState({ visibleSection: "about" })
		} else if (onScreen(this.portfolioRef)) {
			this.setState({ visibleSection: "portfolio" })
		} else if (onScreen(this.landingRef)) {
			this.setState({ visibleSection: "home" })
		} else if (onScreen(this.contactRef)) {
			this.setState({ visibleSection: "contact" })
		}

		switch (this.state.visibleSection) {
			case "home":
				this.pinLocation = "83.3333%"
				this.pinColor = "light"
				break
			case "about":
				this.pinLocation = "8.3333%"
				this.pinColor = "dark"
				break
			case "portfolio":
				this.pinLocation = "83.3333%"
				this.pinColor = "light"
				break
			case "contact":
				this.pinLocation = "41.6666%"
				this.pinColor = "dark"
				break
		}
	}

	componentWillUnmount = () =>
		window.removeEventListener("scroll", this.handleScroll)

	render() {
		const bkgColors = {
			lightBackRefs: [
				this.aboutRefBuffer,
				this.aboutRef,
				this.contactRef
			],
			darkBackRefs: [this.landingRef, this.portfolioRef]
		}

		return (
			<div style={{ height: "100%" }}>
				<Background colors={bkgColors} />

				<div style={{ left: this.pinLocation }} id='pin-container'>
					<ScrollPin pinColor={this.pinColor} />
				</div>

				<Navigation />

				<Landing landingRefProp={this.landingRef} />

				<div className='about-buffer' ref={this.aboutRefBuffer}></div>

				<About
					aboutRefProp={this.aboutRef}
					visibleSection={this.state.visibleSection}
				/>

				<div
					className='portfolio-buffer'
					ref={this.portfolioRefBuffer}></div>

				<Portfolio
					portfolioRefProp={this.portfolioRef}
					visibleSection={this.state.visibleSection}
					updateTranslateValue={this.props.updateTranslateValue}
					imgInitLocation={this.props.imgInitLocation}
				/>

				<div
					className='contact-buffer'
					ref={this.contactRefBuffer}></div>

				<Contact
					contactRefProp={this.contactRef}
					visibleSection={this.state.visibleSection}
				/>
			</div>
		)
	}
}
