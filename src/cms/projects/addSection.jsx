import React from 'react';
import axios from 'axios'

export default class AddSection extends React.Component {
	static propTypes = {
		// name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {
			selectedOption: "title", 
			visible: false,
			projectData: {}
		}
	}

	componentDidMount = () => {
		this.setState({projectData: this.props.data})
	}

	onSelect = () => {
		const selectTagOptions = document.getElementById("typeSelect").options
		const selectedIndex = selectTagOptions.selectedIndex
		const selectedOption = selectTagOptions[selectedIndex].value
		this.setState({selectedOption: selectedOption})
	}

	showHide = () => {
		this.setState(prevState => ({visible: !prevState.visible}))
	}

	onSave = (e) => {
		e.preventDefault()
		const fullArr = this.state.projectData
		const projectID = this.state.projectData._id
		const submittedFormId = e.target.id
		const submittedForm = document.forms[submittedFormId]

		var arr = this.state.projectData.sections
		// add new data to array

		switch(submittedFormId) {
			case "titleForm":
				arr.push({
					type: "title",
				 	text: submittedForm.elements["title"].value
				}); break
			case "imageForm":
				arr.push({
					type: "image",
			 		title: submittedForm.elements["imageTitle"].value,
			 		src: submittedForm.elements["imageSrc"].value
				}); break
			case "textForm":
				arr.push({
					type: "text",
				 	text: submittedForm.elements["text"].value
				}); break
			default: null
		}

		fullArr.sections = arr
		this.props.update(fullArr)
		this.setState({visible: false})

	}

	render() {
		const self = this
		return (
			<div>
				<button className="fas fa-plus" onClick={this.showHide} ></button>
				<div style={this.state.visible === true ? {display: "block"} : {display: "none"}}>
					<button className="fas fa-times" onClick={this.showHide}></button>
					<select id="typeSelect" onChange={this.onSelect}>
						<option value="title">Title</option>
						<option value="image">Image</option>
						<option value="text">Text</option>
					</select>
					{(() => {
						switch(self.state.selectedOption) {
							case "title"	: return <TitleForm onSave={this.onSave.bind(this)}/>
							case "image"	: return <ImageForm onSave={this.onSave.bind(this)}/>
							case "text"		: return <TextForm onSave={this.onSave.bind(this)}/> 
						}
					})()}	
				</div>
			</div>
		);
	}
}


// form components
const TitleForm = (props) => {
	return (
		<form id="titleForm" onSubmit={(e) => props.onSave(e)}>
			<button type="submit" className="fas fa-check"></button>
			<dl>
				<dt>Title</dt>
				<dd><input name="title"/></dd>
			</dl>
		</form>
	)
}

const ImageForm = (props) => {
	return (
		<form id="imageForm" onSubmit={(e) => props.onSave(e)}>
			<button type="submit" className="fas fa-check"></button>
			<dl>
				<dt>Image Title</dt>
				<dd><input name="imageTitle"/></dd>
				<dt>Image source</dt>
				<dd><input name="imageSrc"/></dd>
			</dl>
		</form>
	)	
}

const TextForm = (props) => {
	return (
		<form id="textForm" onSubmit={(e) => props.onSave(e)}>
			<button type="submit" className="fas fa-check"></button>
			<dl>
				<dt>Text</dt>
				<dd><textarea name="text" /></dd>
			</dl>
		</form>
	)
	
}
