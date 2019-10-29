import React, { useState, useEffect } from "react"

const inputDisplay = props => {
	// const [value, setValue] = useState(props.defaultText)

	const onChange = e => {
		props.update(e.target.name, e.target.value, props.refToDB)
	}

	return (
		<div>
			<h4 className="input-subtext">{props.header}</h4>
			{props.textArea ? (
				<textarea
					name={props.inputID}
					defaultValue={props.defaultText()}
					onChange={e => onChange(e)}
				/>
			) : (
				<input
					name={props.inputID}
					defaultValue={props.defaultText()}
					onChange={e => onChange(e)}
				/>
			)}
		</div>
	)
}

export default inputDisplay
