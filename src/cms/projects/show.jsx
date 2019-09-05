import React 		from 'react';
import PropTypes 	from 'prop-types'
import Input 		from './input.jsx'
import AddSection 	from './addSection.jsx'
import axios 		from 'axios'
import underscore	from 'underscore'

export default class ShowProject extends React.Component {
	static propTypes = {
		id: PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {projectData: [], visibleRPD: false, originalData: []} 
		this.updateProjectData = this.updateProjectData.bind(this)
	}

	componentDidMount = () => {
		fetch(`/api/projects/${this.props.id}`)
			.then(res 	=> res.json())
			.then(data 	=> this.setState({projectData: data}))
			.then(() => {
				// This copying method allows for deep level copying
				const dataCopy = JSON.parse(JSON.stringify(this.state.projectData))
				this.setState({originalData: dataCopy });
			})
	}

	setRPD = () => {
		this.setState(prevState => ({
			visibleRPD: !prevState.visibleRPD
		}))	
	}

	updateProjectData = newData => { this.setState({projectData: newData}) }

	undoChanges = () => {this.setState({projectData: this.state.originalData})}

	onSave = (e) => {
		e.preventDefault()
		// pass ID to select project to edit
		const newData = this.state.projectData
		// create object to pass new data to database
		const body = {
			_id				: newData._id,
			projectName		: newData.projectName,
			mainImagePath	: newData.mainImagePath,
			sections 		: newData.sections,
			position 		: newData.position
		}

		// post request to 'edit' endpoint with formData object as params
		axios.post('/api/edit', body)
			.then(res => {
				if (res.status === 200) {
					alert("saved")
					// when the post is made call new data and update page
					fetch(`/api/projects/${this.props.id}`)
						.then(res => res.json())
						.then(data 	=> this.setState({projectData: data}))
						.then(() => {
							// This copying method allows for deep level copying
							const dataCopy = JSON.parse(JSON.stringify(this.state.projectData))
							this.setState({originalData: dataCopy });
						})
				}
			})

	}


	render() {
		const data = this.state.projectData

		// console.log(this.state.originalData)
		// console.log(underscore._.isEqual(this.state.projectData, this.state.originalData))
		if (data.length !== 0) {
			return (
				<div>
					<h2>{data.projectName}</h2>
					{!underscore._.isEqual(this.state.projectData, this.state.originalData) ? 
						<form id="save" action="" onSubmit={(e) => this.onSave(e)}>
							<button type="submit">Save Changes</button>
							<button type="reset" onClick={() => this.undoChanges()}>
							Undo Changes</button>
						</form> : null
					}
					
					<br></br>

					<Input 
						header="Project Name" 
						defaultText={data.projectName} 
						data={data} 
						update={this.updateProjectData}/>
					<Input 
						header="Header Image" 
						defaultText={data.mainImagePath} 
						data={data} 
						update={this.updateProjectData}/>
					<Input 
						header="Position" 
						defaultText={data.position} 
						data={data} 
						update={this.updateProjectData}/>
					
					<hr></hr>
					<h2>Sections</h2>

					<AddSection 
						update={this.updateProjectData}
						data={data}/>

					{data.sections.map((section, i) => {
						switch(section.type) {
								case "title":
									return (
										<Input  
											defaultText={section}
											header="Section Title"
											data={data}
											index={i}
											key={i}
											removable={true}
											update={this.updateProjectData}/> 
									)
										
								case "image":
									return (
										<Input 
											defaultText={section}
											header="Section Image"
											data={data}
											index={i}
											key={i}
											removable={true}
											update={this.updateProjectData}/> 
									)
								case "text":
									return (
										<Input 
											defaultText={section}
											header="Section Text"
											data={data}
											index={i}
											key={i}
											inputType="textarea"
											removable={true}
											update={this.updateProjectData}/> 
									)
								case "gistCode":
									return (
										<Input 
											key={i}
											defaultText={section}
											header="Section Code"
											data={data}
											index={i}
											removable={true}
											update={this.updateProjectData}/> 
									)
								default: 
									return null
							}
					})}

					<hr></hr>
					<div style={{marginTop:"40px", whiteSpace:"pre-wrap"}}>
						<h2 
							style={{display:"inline", cursor:"pointer"}}
							onClick={() => this.setRPD()}>Raw project data</h2>
						
						<div 
							style={this.state.visibleRPD === true ? 
								{display:"block", marginTop: "20px"} : 
								{display: "none", marginTop: "20px"}
							}>
							{JSON.stringify(this.state.projectData, null, 2)}
						</div>
					</div>
				</div>
			);	
		} else {
			return null
		}
		
	}
}

