import React, { Component } from 'react';
import './landing.scss';
import { CSSTransition } from 'react-transition-group';

export default class Landing extends Component {

	// ADD ANIMATION CLASS ONE BY ONE WITH RANDOM TIMING
	// GENERATE RANDOM NUMBER EVERY TIME THE COMPONENT IS UPDATED?


	render() {
	
		return (
			<div id="landing-container">
				<HomeImage />
			</div>
		)
	}
}



class HomeImage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {idName: ''}
		this.addClassRandomly = this.addClassRandomly.bind(this)
	}
	componentDidMount() {
		this.addClassRandomly("Jamie_Pask")
		this.addClassRandomly("Nosql_databases_")
		this.addClassRandomly("FULL_STACK_DEVELOPER")
		this.addClassRandomly("HTML")
		this.addClassRandomly("GIT_VERSION_CONTROL_")
		this.addClassRandomly("AMAZON_WEB_SERVICES")
		this.addClassRandomly("Javascript")
		this.addClassRandomly("PHP_")
		this.addClassRandomly("Problem_solver")
		this.addClassRandomly("Nosql_databases_2")
		this.addClassRandomly("SQL")
		this.addClassRandomly("WEBPACK")
		this.addClassRandomly("design_enthusiast_")
		this.addClassRandomly("mongodb")
		this.addClassRandomly("React_JS")
	}

	addClassRandomly(idName) {

		// RANDOM TIMEOUT BETWEEN 50 AND 1000
		const randNum = Math.floor(Math.random() * (2500 - 500)) + 500

		idName == 'Jamie_Pask' ?
		setTimeout(() => {
			document.querySelector(`#${idName}`).classList.add("appear")
		}, 500) : 
		setTimeout(() => {
			document.querySelector(`#${idName}`).classList.add("appear")
		}, randNum)

	}
	

	render() {
		  return (
		    <div className="home-svg-wrapper">
		    <svg className="home-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 850" height="100%" >
		 	 <rect className="background" width="300%" height="300%" x="-100%" y="-100%" />
		       <path 
		       		className="blob2" 
		       		d="M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z"
		       	/>

			  <g id="Group_38" data-name="Group 38">
			    <text className="test" id="Jamie_Pask" data-name="Jamie Pask" transform="translate(369.928 849.454) rotate(-90)" fontSize="150" fontFamily="Roboto-Bold, Roboto" fontWeight="700" letterSpacing="-0.04em"><tspan x="0" y="0">Jamie Pask</tspan></text>
			    <text id="Nosql_databases_" data-name="Nosql databases " transform="translate(410.928 467.454) rotate(-90)"  fontSize="30" fontFamily="Roboto-Medium, Roboto" fontWeight="500"><tspan x="0" y="0">Nosql databases </tspan></text>
			    <text id="FULL_STACK_DEVELOPER" data-name="FULL STACK DEVELOPER" transform="translate(247.902 622.141) rotate(-90)" fontSize="30" fontFamily="Roboto-Medium, Roboto" fontWeight="500"><tspan x="0" y="0">FULL STACK DEVELOPER</tspan></text>
			    <text id="mongodb" transform="translate(410.928 733.454) rotate(-90)"  fontSize="30" fontFamily="Roboto-Bold, Roboto" fontWeight="700"><tspan x="0" y="0">mongodb</tspan></text>
			    <text id="HTML" transform="translate(513.928 704.454) rotate(-90)"  fontSize="30" fontFamily="Roboto-Bold, Roboto" fontWeight="700"><tspan x="0" y="0">HTML</tspan></text>
			    <text id="GIT_VERSION_CONTROL_" data-name="GIT VERSION CONTROL " transform="translate(445.928 392.454) rotate(-90)"  fontSize="30" fontFamily="Roboto-Medium, Roboto" fontWeight="500"><tspan x="0" y="0">GIT VERSION CONTROL </tspan></text>
			    <text id="AMAZON_WEB_SERVICES" data-name="AMAZON WEB SERVICES" transform="translate(388.428 501.954)"  fontSize="30" fontFamily="Roboto-Medium, Roboto" fontWeight="500"><tspan x="0" y="0">AMAZON WEB SERVICES</tspan></text>
			    <text id="React_JS" transform="translate(388.428 536.954)"  fontSize="30" fontFamily="Roboto-Bold, Roboto" fontWeight="700"><tspan x="0" y="0">React.JS</tspan></text>
			    <text id="Javascript" transform="translate(422.428 423.954)"  fontSize="30" fontFamily="Roboto-Bold, Roboto" fontWeight="700"><tspan x="0" y="0">Javascript</tspan></text>
			    <text id="PHP_" data-name="PHP " transform="translate(388.428 571.954)"  fontSize="30" fontFamily="Roboto-Medium, Roboto" fontWeight="500"><tspan x="0" y="0">PHP </tspan></text>
			    <text id="Problem_solver" data-name="Problem solver" transform="translate(489.428 571.954)"  fontSize="30" fontFamily="Roboto-Bold, Roboto" fontWeight="700"><tspan x="0" y="0">Problem solver</tspan></text>
			    <text id="Nosql_databases_2" data-name="Nosql databases " transform="translate(478.928 808.454) rotate(-90)"  fontSize="30" fontFamily="Roboto-Light, Roboto" fontWeight="300" opacity="0.268"><tspan x="0" y="0">Nosql databases </tspan></text>
			    <text id="SQL" transform="translate(489.428 610.954)"  fontSize="30" fontFamily="Roboto-Light, Roboto" fontWeight="300" opacity="0.268"><tspan x="0" y="0">SQL</tspan></text>
			    <text id="WEBPACK" transform="translate(455.428 384.954)"  fontSize="30" fontFamily="Roboto-Light, Roboto" fontWeight="300" opacity="0.268"><tspan x="0" y="0">WEBPACK</tspan></text>
			    <text id="design_enthusiast_" data-name="design enthusiast " transform="translate(425.428 462.954)"  fontSize="30" fontFamily="Roboto-Light, Roboto" fontWeight="300" opacity="0.268"><tspan x="0" y="0">design enthusiast </tspan></text>
			  </g>
		    
		     <circle className="overlay"  cx="300" cy="300" r="4000" />
		     
		</svg>


		    </div>
		  )
		
	}
}


