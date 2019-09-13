import React from "react"

const LoadingIcon = props => {
	return (
		<div className='loading-icon-container'>
			<span style={{ backgroundColor: props.backgroundColor }}></span>
			<span style={{ backgroundColor: props.backgroundColor }}></span>
			<span style={{ backgroundColor: props.backgroundColor }}></span>
		</div>
	)
}

export default LoadingIcon
