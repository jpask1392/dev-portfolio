import React, { useState } 	from 'react';
import Input 				from './input.jsx'
import axios 				from 'axios'
import {
	TitleInput,
	ImageInput,
	TextInput,
	GistInput
} from './inputTypes.jsx'

const AddNewProject = (props) => {

	// state control with React state hook
	const [mode, setMode] = useState("view")
	const [sectionsArr, setSectionsArr] = useState([])
	const [sectionOptions, setSectionOptions] = useState(false)
	const [sectionType, setSectionType] = useState("title")

	// cancel function reset arr state
	const cancel = () => {
		setSectionsArr([])
		setMode("view")
	}

	// build newProject object and send a post request 
	const updateProjectArr = () => {

		const form = document.forms['newProjectForm']
		const projectName = form['projectName'].value
		const mainImagePath = form['mainImagePath'].value
		const position = form['position'].value

		const newProject = {
			projectName: projectName,
			mainImagePath: mainImagePath,
			position: position,
			sections: sectionsArr
		}

		axios.post('/api/addNewProject', { newProject })
			.then(res => {
				if(res.status !== 200) {
					console.log(res)	
				} else {
					props.updateArray(res.data)
				}
				// if successful return the new array 
				// if not successful display error message
			}).catch((err) => {console.log(err.message)})

			.then(setMode("view"))
	}

	// build section array object and save it to state
	const updateSections = () => {

		const form = document.forms['newProjectForm']

		switch(sectionType) {
			case "title": 
				sectionsArr.push({
					header: "Section Title", 
					type: "title",
					text: form['title'].value
				}); break
			case "image":
				sectionsArr.push({
					header: "Section Image", 
					type: "image",
					src: form['imgSrc'].value,
					caption: form['imgCaption'].value
				}); break
			case "text":
				sectionsArr.push({
					header: "Section Text", 
					type: "text",
					text: form['text'].value
				}); break
			case "code": 
				sectionsArr.push({
					header: "Section Code", 
					type: "gistCode",
					gist: form['gistId'].value,
					gistFile: form['gistFile'].value
				}); break
			default: null
		} 

		setSectionsArr([...sectionsArr])
		setSectionOptions(false)
	}

	// used to update section array from other components
	const updateSectionArr = newArr => setSectionsArr([...newArr])

	// change selected option and store in state
	const onSelect = () => {
		const sectionTypeOptions = document.getElementById("sectionTypeSel").options
		const selectedIndex = sectionTypeOptions.selectedIndex
		const selectedOption = sectionTypeOptions[selectedIndex].value
		// set the state
		setSectionType(selectedOption)
	}

	return mode === "view" ?
		<span className="add-project-btn">
			<button onClick={() => setMode("edit")}>
				<i className="fas fa-plus"></i>
			</button>
		</span> : 
		<div className="new-project-form-container">
			<button onClick={() => cancel()}>Cancel</button>
			<button onClick={() => updateProjectArr()}>Save</button>
			<form id="newProjectForm" method='POST'>
				<dl>
					<dt>Project Name</dt>
					<dd><input name='projectName'></input></dd>
					<dt>Main Image Path</dt>
					<dd><input name='mainImagePath'></input></dd>
					<dt>Postition</dt>
					<dd><input name='position'></input></dd>

					<dt>Sections</dt>

					{sectionOptions ? 
						<button
							type="button"
							onClick={() => updateSections()}>OK</button> : 
						<button
							type="button"
							onClick={() => setSectionOptions(true)}>
							Add new Section</button>
					}

					{sectionOptions ? 
						<AddNewSection 
							selected={sectionType} 
							onSelect={onSelect}/> : null}

					{sectionOptions ? (() => {
						switch(sectionType) {
							case "title"	: return <TitleInput/>
							case "image"	: return <ImageInput/>
							case "text"		: return <TextInput />
							case "code"		: return <GistInput/> 
						} 
					})() : null}
					
					{sectionsArr.map((section, i) =>
						<Input 
							key={i}
							header={section.header} 
							defaultText={section}
							removable={true}
							data={sectionsArr}
							index={i}
							update={updateSectionArr}/>
					)}

				</dl>
			</form>
		</div>

}

export default AddNewProject;

const AddNewSection = (props) => 
	<select value={props.selected} id="sectionTypeSel" onChange={props.onSelect}>
		<option value="title">Title</option>
		<option value="image">Image</option>
		<option value="text">Text</option>
		<option value="code">Code</option>
	</select> 

