import React from "react"

const style = {
	width: "30px",
	height: "5px",
	background: "black",
	display: "block"
}

const ExpandButton = props => {
	return (
		<div
			style={{
				display: "inline-block"
			}}>
			<span style={style}></span>
			<span></span>
		</div>
	)
}

export default ExpandButton
