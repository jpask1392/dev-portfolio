import React 		from 'react';
import NextButton 	from '../common/nextButton.jsx'
import {withRouter}	from 'react-router-dom'

const FooterBar = props =>
	<div 
		className="footer-bar" 
		style={props.backgroundColor !== undefined ? 
			{backgroundColor: props.backgroundColor()} :
			{backgroundColor: "black"}}>

		<div>
			<h2>{props.location.pathname === "/about" ? 
				"Want to reach out?" : 
				`Next up: ${props.nextProject}`}</h2>

			<div className="footer-arrow-container">
				<NextButton linkTo={props.linkTo} backgroundColor="white"/>
			</div>

		</div>
	</div>

export default withRouter(FooterBar);