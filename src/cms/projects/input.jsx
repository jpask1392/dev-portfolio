import React 		from 'react';
import PropTypes 	from 'prop-types'
import axios 		from 'axios';

export default class Input extends React.Component {
	static propTypes = {
		defaultText: PropTypes.string,
		header: PropTypes.string
	};

	// this file should be for editing the local copy of the data only 
	// the save button at the top can push the updated data to the database
	constructor(props) {
		super(props);
		this.state = {
			mode: "view", 
			value: this.props.defaultText,
			projectData: {}
		}
		this.onClick = this.onClick.bind(this)
		this.onConfirmEdit = this.onConfirmEdit.bind(this)
		this.moveUp = this.moveUp.bind(this)
	}

	componentDidMount = () => {
		// copy the data 
		var arr = this.props.data
		var arrCopy = {...arr}
		this.setState({projectData: arrCopy})

	}

	// disable edit mode if user is not authorized 
	onClick = () => {
		this.state.mode === "view" ? 
			this.setState({mode:"edit"}): 
			this.setState({mode:"view"})
	}

	onChange = (e) => {this.setState({value: e.target.value})}

	onConfirmEdit = () => {
		// update array
		// get current array 
		let arr = this.state.projectData
		// get the value of entered data
		let newValue = this.state.value
		// get the index of value if sections
		let index = this.props.index
		// update the array based on title passed through props
		switch(this.props.header) {
			case "Project Name" 	: arr.projectName = newValue; 			break
			case "Header Image" 	: arr.mainImagePath = newValue; 		break
			case "Position" 		: arr.position = newValue; 				break
			case "Section Title" 	: arr.sections[index].text = newValue; 	break
			case "Section Text" 	: arr.sections[index].text = newValue; 	break
			case "Section Image" 	: arr.sections[index].src = newValue; 	break
			default: null
		}
		// send the new array back to show component
		this.props.update(arr)
		// set the mode back to view
		this.setState({mode:"view"})
	}

	onDelete = () => {
		const fullArr = this.state.projectData
		const index = this.props.index
		const arr = this.state.projectData.sections
		arr.splice(index, 1)
		fullArr.sections = arr
		this.props.update(fullArr)
	}

	moveUp = () => {
		// swap items with es6
		// [a, b] = [b, a]
		const fullArr = this.state.projectData
		const arr = this.state.projectData.sections
		const a = this.props.index;
		const b = this.props.index - 1;
		if (a > 0) {
			// perform swap
			[arr[a], arr[b]] = [arr[b], arr[a]]
			fullArr.sections = arr
			this.props.update(fullArr)
		}
	}

	moveDown = () => {
		const fullArr = this.state.projectData
		const arr = this.state.projectData.sections
		const a = this.props.index;
		const b = this.props.index + 1;
		if (a < arr.length - 1) {
			// perform swap
			[arr[a], arr[b]] = [arr[b], arr[a]]
			fullArr.sections = arr
			this.props.update(fullArr)
		}
	}

	render() {
		return (
			<div className="content-section-container">

				<h3>{this.props.header}</h3>

				{this.state.mode === "view" ? 

					<ViewModeButtons 
						click={this.onClick} 
						removable={this.props.removable}
						delete={this.onDelete}
						moveUp={this.moveUp}
						moveDown={this.moveDown}/> : 

					<EditModeButtons 
						click={this.onClick} 
						save={this.onSave}
						edit={this.onConfirmEdit}/>}

				{this.state.mode === "view" ? 
					<p onDoubleClick={() => this.onClick()}>{this.props.defaultText}</p> : null}

				{this.state.mode === "edit" && this.props.inputType === "text" ? 
					<div className="edit-container"> 
						<input 
							id="type1" 
							type={this.props.inputType} 
							defaultValue={this.props.defaultText}
							onChange={(e) => this.onChange(e)}/>
					</div> : null}

				{this.state.mode === "edit" && this.props.inputType === "textarea" ? 
					<div className="edit-container"> 
						<textarea 
							type={this.props.inputType} 
							defaultValue={this.props.defaultText}
							onChange={(e) => this.onChange(e)}>
						</textarea> 
					</div> : null}

			</div>
		)
	}
}

// set default props
Input.defaultProps = {
	inputType: "text",
	removable: false,
}

// buttons for rendering
// here to clear up Input component render method
const ViewModeButtons = (props) => 
	<span className="view-mode-buttons">
		<i onClick={() => props.click()} className="fas fa-pen"></i>
		{props.removable ? 
			<React.Fragment>
				<i onClick={() => props.delete()} className="fas fa-times"></i>
				<i onClick={() => props.moveUp()} className="fas fa-chevron-up"></i>
				<i onClick={() => props.moveDown()} className="fas fa-chevron-down"></i>
			</React.Fragment>
			: null}
	</span>
	
const EditModeButtons = (props) => 
	<span className="save-cancel-container">
		<button onClick={() => props.edit()} className="fas fa-check"></button>
		<button onClick={() => props.click()} className="fas fa-times"></button>
	</span>

