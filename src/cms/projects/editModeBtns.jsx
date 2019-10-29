import React from "react"

const EditModeBtns = props => (
	<span className='save-cancel-container'>
		<button
			type='button'
			onClick={props.confirm}
			className='fas fa-check'></button>
		<button
			type='button'
			onClick={props.cancel}
			className='fas fa-times'></button>
	</span>
	
)

export default EditModeBtns
