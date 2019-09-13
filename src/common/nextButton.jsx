import React from "react"

const NextButton = props => (
	<div className='next-button-container'>
		<span style={{ backgroundColor: props.color }}></span>
		<span style={{ backgroundColor: props.color }}></span>
		<span style={{ backgroundColor: props.color }}></span>
		<h3 style={{ color: props.color }} className='next-btn-text'>
			{props.text}
		</h3>
	</div>
)

export default NextButton
