import React 		from 'react';
import NextButton 	from '../common/nextButton.jsx'
import {withRouter, Link}	from 'react-router-dom'


const FooterBar = props =>
	<div 
		className="footer-bar" 
		style={props.backgroundColor !== undefined ? 
			{backgroundColor: props.backgroundColor()} :
			{backgroundColor: "black"}}>

		<div>
			{props.location.pathname === "/about" ? 
				<h2 className="footer-text-container">Want to reach out?</h2> : 
				<span className="footer-text-container">
					<p>Next Up:</p>
					<h2>{props.nextProject}</h2>
				</span>}

			<div className="footer-arrow-container">
				<Link to={props.linkTo}>
					<NextButton color="white"/>
				</Link>
			</div>

		</div>
	</div>

export default withRouter(FooterBar);