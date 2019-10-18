import React from "react"

const Header = props => {
	return (
		<div className='content-header'>
			<h3 style={{color: props.color}}>{props.children}</h3>
		</div>
	)
}

export default Header
