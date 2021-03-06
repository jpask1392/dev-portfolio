import React from "react"
import PropTypes from "prop-types"
import { NavLink } from "react-router-dom"
import axios from "axios"

// global variables to store dragged element and new array order
// might work with the data transfer object
var dragged
var newArray

export default class ProjectCoreDisplay extends React.Component {
	static propTypes = {
		updateArray: PropTypes.func,
		index: PropTypes.number,
		projectData: PropTypes.object,
		projectArray: PropTypes.array
	}

	constructor(props) {
		super(props)
		this.state = { newArray: [] }
	}

	// DRAGGABLE ELEMENT EVENTS

	// triggered when the item has started its drag
	onDragStart = e => {
		e.dataTransfer.dropEffect = "move"
		e.target.style.opacity = // remove the dragged element from the array
		(0.3)[dragged] = this.props.projectArray.splice(this.props.index, 1)
	}

	// triggers when the drag has stopped
	onDragEnd = e => {
		e.target.style.opacity = ""
		// update position numbers
		// not very efficient..
		newArray.map((value, i) => {
			if (value.position != i + 1) {
				value.position = i + 1
			}
		})
		this.props.updateArray(newArray)
	}

	// DROP ZONE EVENTS

	// triggered when the element enters a draggable zone
	onDragEnter = e => {
		e.preventDefault()
		// only trigger if e.target.className is the draggable element
		// Necessary as the dragover was triggering on child elements
		if (e.target.className === "project-core-container") {
			// if the dragged over element equals the dragged - do nothing
			if (dragged !== this.props.projectArray[e.target.id]) {
				// get the current index of e.target
				const index = parseInt(e.target.id)
				// element to be added to array
				const element = dragged
				// copy the project array
				const originalArray = this.props.projectArray
				newArray = [...originalArray]
				// add the dragged element to new index
				newArray.splice(index, 0, element)
			}
		}
	}

	// triggered when the item is dropped
	onDrop = e => e.preventDefault()
	onDragOver = e => e.preventDefault()
	onDragLeave = e => e.preventDefault()

	onDelete = () => {
		if (confirm("Are you sure you want to delete this project?")) {
			// delete from project array first and update state to rerender
			var newArray = this.props.projectArray
			newArray.splice(this.props.index, 1)
			this.props.updateArray(newArray)
			axios
				.delete(`/api/projects/${this.props.projectData._id}`)
				.then(this.props.updateArray(newArray))
		}
	}

	render() {
		return (
			<li
				id={this.props.index}
				className='project-core-container'
				draggable='true'
				onDrop={e => this.onDrop(e)}
				onDragStart={e => this.onDragStart(e)}
				onDragEnd={e => this.onDragEnd(e)}
				onDragEnter={e => this.onDragEnter(e)}
				onDragOver={e => this.onDragOver(e)}
				onDragLeave={e => this.onDragLeave(e)}>
				<span className='core-display-title-container'>
					<i className='fas fa-grip-vertical'></i>
					<h2>{this.props.projectData.projectName}</h2>
				</span>
				<div className='core-display-btns-container'>
					<button onClick={() => this.onDelete()}>
						<i className='fas fa-trash'></i>
					</button>
					<NavLink
						to={`/admin/view_project/${
							this.props.projectData["projectName"]
						}`}>
						<button>
							<i className='fas fa-eye'></i>
						</button>
					</NavLink>
				</div>
			</li>
		)
	}
}
