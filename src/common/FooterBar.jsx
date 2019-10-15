import React from "react"
import NextButton from "../common/nextButton.jsx"
import { withRouter, Link } from "react-router-dom"
import { formatTitle } from "../common/commonFunctions"

const FooterBar = props => (
	<div
		className='footer-bar'
		style={
			props.bkgColor !== undefined
				? { backgroundColor: props.bkgColor }
				: { backgroundColor: "black" }
		}>
		<div>
			{props.location.pathname === "/about" ? (
				<h2 className='footer-text-container'>Want to reach out?</h2>
			) : (
				<span className='footer-text-container'>
					<p>Next Up:</p>
					<h2>{formatTitle(props.nextProject)}</h2>
				</span>
			)}

			<div className='footer-arrow-container'>
				<Link to={props.linkTo}>
					<NextButton color='white' />
				</Link>
			</div>
		</div>
	</div>
)

export default withRouter(FooterBar)
