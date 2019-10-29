import React from "react"

const ViewModeBtns = props => (
	<span className='view-mode-buttons'>
		<i onClick={props.edit} className='fas fa-pen'></i>
		{props.removable ? (
			<React.Fragment>
				<i onClick={props.deleteOne} className='fas fa-times'></i>
				<i
					onClick={props.moveUp}
					className='fas fa-chevron-up'></i>
				<i
					onClick={props.moveDown}
					className='fas fa-chevron-down'></i>
			</React.Fragment>
		) : null}
	</span>
)

export default ViewModeBtns
