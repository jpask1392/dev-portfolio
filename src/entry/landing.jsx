import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

export default class Landing extends Component {

	constructor(props) {
		super(props)

		this.state = {eyeRotationX: 0, eyeRotationY: 0}
	}

	componentDidMount() {
		// window.addEventListener('mousemove', this.handleMouseMove)
	}

	handleMouseMove = (e) => {
		let rotation = 10;
		// if (e.clientY) {

		// get screensize
		var windowHeight = window.innerHeight
		var windowWidth = window.innerWidth

		var xValue = this.convertNumber(-40, 40, windowHeight, e.clientY)
		var yValue = this.convertNumber2(-40, 40, windowWidth, e.clientX)
		// }
		this.setState({eyeRotationY: yValue, eyeRotationX: xValue})
	} 

	convertNumber = (min, max, coordMax, yCurrent) => {
		let Y = ((max - min) / coordMax) * (coordMax - yCurrent) + min
		return Y
	}

	convertNumber2 = (min, max, coordMax, yCurrent) => {
		let Y = ((max - min) / coordMax) * (yCurrent) + min
		return Y
	}

	componentWillUnmount() {
		window.removeEventListener('mousemove', this.handleMouseMove)
	}

	render() {
	
		return (
			<div id="landing-container" ref={this.props.landingRefProp}>
				<div id="landing-inner-container">
					<h1 style={{color:"white"}}>
					L<span className="eyes" style={{transform: `rotateX(${this.state.eyeRotationX}deg) rotateY(${this.state.eyeRotationY}deg)`}}>oo</span>king for an Engineer?
						<span className="smile"></span>
					</h1>
					<h2 style={{color:"#615E65", marginTop:"50px"}}>
						Proficient in <a>Javascript</a> with React, Node environment, MongoDB, testing frameworks, PHP & SQL, Python and more.
					</h2>
				</div>
			</div>
		)
	}
}
