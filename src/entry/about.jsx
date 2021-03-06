import React from "react"
import NextButton from "../common/nextButton.jsx"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import ImageLoader from "../common/imageLoader.jsx"

export default class About extends React.Component {
	static propTypes = {
		aboutRefProp: PropTypes.object.isRequired,
		visibleSection: PropTypes.string.isRequired
	}

	constructor(props) {
		super(props)
		this.state = { isVisible: false }
	}

	componentDidUpdate = prevProps => {
		if (prevProps.visibleSection !== this.props.visibleSection) {
			this.setState(state => {
				if (this.props.visibleSection === "about") {
					return { isVisible: true }
				} else if (state.isVisible) {
					return { isVisible: false }
				}
			})
		}
	}

	render() {
		const visible = this.state.isVisible
		return (
			<div
				className='about-container'
				id='about-container'
				ref={this.props.aboutRefProp}>
				<div className={`start about-page ${visible ? "end" : ""}`}>
					<span>
						<ImageLoader
							src='homeAboutImg'
							fileType='.jpg'
							h='100vh'
						/>
					</span>
				</div>
				<div
					id='about-text-container'
					className={visible ? "fade-in-text" : ""}>
					<h2>I’m a passionate developer constantly improving.</h2>
					<p style={{ marginTop: "30px", marginBottom: "30px" }}>
						To sum it up:
					</p>
					<span>
						<h3 className='sub-heading'>June 2018</h3>
						<p>
							After 3 years of working as a technician I decided
							to finally pursue a career as a software developer.
							I tied the knot and moved off to Los Angeles,
							Brentwood area.
						</p>
						<br></br>
						<h3 className='sub-heading'>June 2015</h3>
						<p>
							Began working as a technician after close to year of
							traveling around America and Canada. During this
							time I began to develop an interest for software
							development after trying to create a web portfolio.
						</p>
						<br></br>
						<h3 className='sub-heading'>June 2014</h3>
						<p>
							Graduated from Cardiff Metropolitan University with
							a Bachelor Degree in Architectural Design and
							Technology
						</p>
						<br></br>
					</span>
					<div
						style={{
							float: "right",
							marginTop: "50px"
						}}>
						<Link to='/about'>
							<NextButton color='#2699FB' text='Read More' />
						</Link>
					</div>
				</div>
			</div>
		)
	}
}
