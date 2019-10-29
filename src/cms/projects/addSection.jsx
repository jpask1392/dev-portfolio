import React from "react"
import {
	TitleInput,
	TextInput,
	ImageInput,
	GistInput,
	SwaggerApiInput
} from "./inputTypes.jsx"

export default class AddSection extends React.Component {
	static propTypes = {
		// name: React.PropTypes.string,
	}

	constructor(props) {
		super(props)
		this.state = {
			selectedOption: "title",
			visible: false,
			projectData: {}
		}
		this.onSave = this.onSave.bind(this)
	}

	componentDidMount = () => {
		console.log(this.props)
		this.setState({ projectData: this.props.data })
	}

	onSelect = () => {
		const selectTagOptions = document.getElementById("typeSelect").options
		const selectedIndex = selectTagOptions.selectedIndex
		const selectedOption = selectTagOptions[selectedIndex].value
		this.setState({ selectedOption: selectedOption })
	}

	showHide = () =>
		this.setState(prevState => ({ visible: !prevState.visible }))

	onSave = e => {
		e.preventDefault()

		const fullArr = this.state.projectData
		const arr = this.state.projectData.sections
		const form = document.forms["newSectionForm"]

		switch (this.state.selectedOption) {
			case "title":
				arr.push({
					type: "title",
					text: form["title"].value
				})
				break
			case "image":
				arr.push({
					type: "image",
					src: form["imgSrc"].value,
					caption: form["imgCaption"].value
				})
				break
			case "text":
				arr.push({
					type: "text",
					text: form["text"].value
				})
				break
			case "gistCode":
				arr.push({
					type: "gistCode",
					gist: form["gistId"].value,
					gistFile: form["gistFile"].value
				})
				break
			case "swaggerAPI":
				arr.push({
					type: "swaggerAPI",
					swagOwner: form["SwagOwner"].value,
					swagAPI: form["SwagAPI"].value,
					swagVersion: form["SwagVersion"].value
				})
				break
			default:
				null
		}

		fullArr.sections = arr
		this.props.update(fullArr)
		this.setState({ visible: false })
	}

	render() {
		return (
			<div>
				<button
					className='fas fa-plus'
					onClick={this.showHide}></button>
				<div
					style={
						this.state.visible === true
							? { display: "block" }
							: { display: "none" }
					}>
					<button
						className='fas fa-times'
						onClick={this.showHide}></button>
					<select id='typeSelect' onChange={this.onSelect}>
						<option value='title'>Title</option>
						<option value='image'>Image</option>
						<option value='text'>Text</option>
						<option value='gistCode'>Code</option>
						<option value='swaggerAPI'>SwaggerAPI</option>
					</select>

					<form id='newSectionForm' onSubmit={e => this.onSave(e)}>
						<button type='submit' className='fas fa-check'></button>
						{(() => {
							switch (this.state.selectedOption) {
								case "title":
									return <TitleInput />
								case "image":
									return <ImageInput />
								case "text":
									return <TextInput />
								case "gistCode":
									return <GistInput />
								case "swaggerAPI":
									return <SwaggerApiInput />
							}
						}).bind(this)()}
					</form>
				</div>
			</div>
		)
	}
}
