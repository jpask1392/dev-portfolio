import React from "react"
import PropTypes from "prop-types"
import AddSection from "./addSection.jsx"
import axios from "axios"
import { isEqual } from "underscore"
import DataDisplay from "./dataDisplay.jsx"
import { generalDataArray, sectionDataDisplay } from "./adminProjectData"
import { formatTitle } from "../../common/commonFunctions"

export default class ShowProject extends React.Component {
	static propTypes = {
		id: PropTypes.string
	}

	constructor(props) {
		super(props)
		this.state = {
			projectData: [],
			visibleRPD: false,
			originalData: []
		}
		this.updateProjectData = this.updateProjectData.bind(this)
		this.generalDataDisplay = generalDataArray
		this.sectionDataDisplay = sectionDataDisplay
	}

	componentDidMount = () => {
		fetch(`/api/projects/${this.props.id}`)
			.then(res => res.json())
			.then(data => this.setState({ projectData: data }))
			.then(() => {
				// This copying method allows for deep level copying
				const dataCopy = JSON.parse(
					JSON.stringify(this.state.projectData)
				)
				this.setState({ originalData: dataCopy })
			})
	}

	setRPD = () => {
		this.setState(prevState => ({
			visibleRPD: !prevState.visibleRPD
		}))
	}

	updateProjectData = newData => {
		this.setState({ projectData: newData })
	}

	undoChanges = () => {
		this.setState({ projectData: this.state.originalData })
	}

	// build a new project object on save and make a post request
	onSave = () => {
		// pass ID to select project to edit
		const newData = this.state.projectData
		// create object to pass new data to database
		const body = {
			_id: newData._id,
			projectName: newData.projectName,
			mainImage: newData.mainImage,
			sections: newData.sections,
			position: newData.position,
			summary: newData.summary,
			githubLink: newData.githubLink,
			bkgColor: newData.bkgColor
		}

		// post request to 'edit' endpoint with formData object as params
		axios.put("/api/projects", body).then(res => {
			if (res.status === 200) {
				alert("saved")
				// when the post is made call new data and update page
				fetch(`/api/projects/${this.props.id}`)
					.then(res => res.json())
					.then(data => this.setState({ projectData: data }))
					.then(() => {
						// This copying method allows for deep level copying
						const dataCopy = JSON.parse(
							JSON.stringify(this.state.projectData)
						)
						this.setState({ originalData: dataCopy })
					})
			}
		})
	}

	render() {
		const data = this.state.projectData

		if (data.length !== 0) {
			return (
				<div id='projectDataForm'>
					<h2>{formatTitle(data.projectName)}</h2>
					{!isEqual(data, this.state.originalData) ? (
						<div>
							<button type='button' onClick={this.onSave}>
								Save
							</button>
							<button type='button' onClick={this.undoChanges}>
								Cancel
							</button>
						</div>
					) : null}
					{this.generalDataDisplay.map((section, i) => (
						<DataDisplay
							key={i}
							sectionHeading={section.sectionHeading}
							inputs={section.inputs}
							data={this.state.projectData}
							refToDB={section.refToDB}
							allProjectData={data}
							update={this.updateProjectData}
						/>
					))}

					<h2>Sections</h2>
					<AddSection data={data}/>

					{data.sections.map((section, i) => {
						const sectionPrefix = this.sectionDataDisplay
						switch (section.type) {
							case "title":
								return (
									<DataDisplay
										key={i}
										sectionHeading={
											sectionPrefix.title.title
										}
										inputs={sectionPrefix.title.inputs}
										data={section}
										refToDB={sectionPrefix.title.refToDB}
										removable={true}
										allProjectData={data}
										update={this.updateProjectData}
										index={i}
									/>
								)
							case "text":
								return (
									<DataDisplay
										key={i}
										sectionHeading={
											sectionPrefix.text.title
										}
										inputs={sectionPrefix.text.inputs}
										data={section}
										refToDB={sectionPrefix.text.refToDB}
										removable={true}
										allProjectData={data}
										update={this.updateProjectData}
										index={i}
									/>
								)
							case "image":
								return (
									<DataDisplay
										key={i}
										sectionHeading={
											sectionPrefix.image.title
										}
										inputs={sectionPrefix.image.inputs}
										data={section}
										refToDB={sectionPrefix.image.inputs}
										removable={true}
										allProjectData={data}
										update={this.updateProjectData}
										index={i}
									/>
								)
							case "gistCode":
								return (
									<DataDisplay
										key={i}
										sectionHeading={
											sectionPrefix.gistCode.title
										}
										inputs={sectionPrefix.gistCode.inputs}
										data={section}
										refToDB={sectionPrefix.gistCode.inputs}
										removable={true}
										allProjectData={data}
										update={this.updateProjectData}
										index={i}
									/>
								)
							case "swaggerAPI":
								return (
									<DataDisplay
										key={i}
										sectionHeading={
											sectionPrefix.swaggerAPI.title
										}
										inputs={sectionPrefix.swaggerAPI.inputs}
										data={section}
										refToDB={sectionPrefix.swaggerAPI.inputs}
										removable={true}
										allProjectData={data}
										update={this.updateProjectData}
										index={i}
									/>
								)
							default:
								null
						}
					})}

					<hr></hr>
					<div style={{ marginTop: "40px", whiteSpace: "pre-wrap" }}>
						<h2
							style={{ display: "inline", cursor: "pointer" }}
							onClick={() => this.setRPD()}>
							Raw project data
						</h2>

						<div
							style={
								this.state.visibleRPD === true
									? { display: "block", marginTop: "20px" }
									: { display: "none", marginTop: "20px" }
							}>
							{JSON.stringify(this.state.projectData, null, 2)}
						</div>
					</div>
				</div>
			)
		} else {
			return null
		}
	}
}
