import React from "react"
import Navigation from "../common/navigation.jsx"
import Landing from "./landing.jsx"
import About from "./about.jsx"
import Portfolio from "./portfolio.jsx"
import ContactContainer from "./contactContainer.jsx"
import { onScreen } from "../common/commonFunctions.js"
import ScrollPin from "../common/scrollPin.jsx"
import Background from "../common/background.jsx"
import PropTypes from "prop-types"
import PortfolioContainer from "./portfolioContainer.jsx"

export default class Home extends React.Component {
	static propTypes = {
		updateTranslateValue: PropTypes.func,
		imgInitLocation: PropTypes.number
	}

	constructor(props) {
		super(props)
		this.state = {
			visibleSection: "",
			loaded: false
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

	componentDidMount = () => {
		document.title = `Home | Jamie Pask`
		window.addEventListener("scroll", this.handleScroll)
	}

	handleScroll = () => {
		if (onScreen(this.landingRef)) {
			this.visibleSection = "home"
			this.pinLocation = "83.3333%"
			this.pinColor = "light"
		}
		if (onScreen(this.aboutRef)) {
			this.visibleSection = "about"
			this.pinLocation = "8.3333%"
			this.pinColor = "dark"
		}
		if (onScreen(this.portfolioRef)) {
			this.visibleSection = "portfolio"
			this.pinLocation = "83.3333%"
			this.pinColor = "light"
		}
		if (onScreen(this.contactRef)) {
			this.visibleSection = "contact"
			this.pinLocation = "41.6666%"
			this.pinColor = "dark"
		}

		// only re-render component when the visible section changes
		if (this.visibleSection !== this.state.visibleSection) {
			this.setState({ visibleSection: this.visibleSection })
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
		let visibleSection = this.visibleSection

		return (
			<div style={{ height: "100%" }}>
				<div style={{ left: this.pinLocation }} id='pin-container'>
					<ScrollPin pinColor={this.pinColor} />
				</div>

				<Background colors={bkgColors} />

				<Navigation />

				<Landing landingRefProp={this.landingRef} />

				<div className='about-buffer' ref={this.aboutRefBuffer}></div>

				<About
					aboutRefProp={this.aboutRef}
					visibleSection={visibleSection}
				/>

				<div
					className='portfolio-buffer'
					ref={this.portfolioRefBuffer}></div>

				<PortfolioContainer
					portfolioRefProp={this.portfolioRef}
					visibleSection={visibleSection}
				/>

				<div
					className='contact-buffer'
					ref={this.contactRefBuffer}></div>

				<ContactContainer
					contactRefProp={this.contactRef}
					visibleSection={visibleSection}
				/>
			</div>
		)
	}
}
