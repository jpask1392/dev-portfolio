import React from "react"

const defaultTextDisplay = props => {
	
	return (
		<div onDoubleClick={props.edit}>
			<h4 className="input-subtext">{props.header}</h4>
            <p>{props.defaultText()}</p>
		</div>
	)
}

export default defaultTextDisplay
