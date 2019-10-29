import React, { useState, useEffect } from "react"
import EditModeBtns from "./editModeBtns.jsx"
import ViewModeBtns from "./viewModeBtns.jsx"
import InputDisplay from "./inputDisplay.jsx"
import DefaultTextDisplay from "./defaultTextDisplay.jsx"

const DataDisplay = props => {
	const [mode, setMode] = useState("view")
	const [value, updateValue] = useState([
		{ clickedInput: "", newValue: "", refToDB: "" }
	])

	// copy original array
	let arrForEdits = { ...props.allProjectData }
	let sections = arrForEdits.sections

	const moveUp = () => {
		const a = props.index
		const b = props.index - 1
		if (a > 0) {
			// perform swap
			;[sections[a], sections[b]] = [sections[b], sections[a]]
			arrForEdits.sections = sections
			props.update(arrForEdits)
		}
	}
	const moveDown = () => {
		const a = props.index
		const b = props.index + 1
		if (a < sections.length - 1) {
			// perform swap
			;[sections[a], sections[b]] = [sections[b], sections[a]]
			arrForEdits.sections = sections
			props.update(arrForEdits)
		}
	}

	const deleteOne = () => {
		sections.splice(props.index, 1)
		arrForEdits.sections = sections
		props.update(arrForEdits)
	}

	const update = (clickedInput, newValue, refToDB) => {
		// if the clicked input isnt already in the state, add another object
		for (var i = 0; i < value.length; i++) {
			// no object, add first object
			if (!value[0].clickedInput) {
				updateValue([
					{
						clickedInput: clickedInput,
						newValue: newValue,
						refToDB: refToDB
					}
				])
				break
			}
			// if the loop finds a match, update that object
			if (value[i].clickedInput === clickedInput) {
				let new1 = [...value]
				new1[i].newValue = newValue
				updateValue(new1)
				break
			}
			// if the loop reaches the end and finds no matches, add to object
			let new1 = [
				...value,
				{
					clickedInput: clickedInput,
					newValue: newValue,
					refToDB: refToDB
				}
			]
			updateValue(new1)
		}
	}

	const confirm = () => {
		value.map(value => {
			if (props.removable && props.inputs.length > 1) {
				sections[props.index][value.refToDB] = value.newValue
			} else if (props.removable && props.inputs.length === 1) {
				sections[props.index][value.refToDB] = value.newValue
			} else if (props.inputs.length > 1) {
				arrForEdits[props.refToDB][value.refToDB] = value.newValue
			} else {
				arrForEdits[props.refToDB] = value.newValue
			}
		})

		props.update(arrForEdits)
		setMode("view")
	}

	const edit = () => setMode("edit")

	const cancel = () => {
		// reset arrForEdits
		arrForEdits = props.allProjectData
		setMode("view")
	}

	return (
		<div className='content-section-container '>
			<h3>{props.sectionHeading}</h3>
			{mode === "view" ? (
				<ViewModeBtns
					moveUp={moveUp}
					moveDown={moveDown}
					deleteOne={deleteOne}
					edit={edit}
					removable={props.removable}
				/>
			) : (
				<EditModeBtns confirm={confirm} cancel={cancel} />
			)}

			{props.inputs.map((input, i) => {
				return mode === "view" ? (
					<DefaultTextDisplay
						key={i}
						header={input.title}
						edit={edit}
						defaultText={() => {
							if (props.inputs.length > 1 && !props.removable) {
								return props.data[props.refToDB][input.refToDB]
							}
							if (props.inputs.length === 1 && !props.removable) {
								return props.data[props.refToDB]
							}
							if (props.removable) {
								return props.data[input.refToDB]
							}
						}}
					/>
				) : (
					<InputDisplay
						key={i}
						header={input.title}
						textArea={input.textarea}
						defaultText={() => {
							if (props.inputs.length > 1 && !props.removable) {
								return props.data[props.refToDB][input.refToDB]
							}
							if (props.inputs.length === 1 && !props.removable) {
								return props.data[props.refToDB]
							}
							if (props.removable) {
								return props.data[input.refToDB]
							}
						}}
						inputID={input.inputID}
						refToDB={input.refToDB}
						update={update}
					/>
				)
			})}
		</div>
	)
}

export default DataDisplay
