import React 		from 'react';
import PropTypes 	from 'prop-types'
import Input 		from './input.jsx'

export default class ShowProject extends React.Component {
	static propTypes = {
		id: PropTypes.string,
	};

	constructor(props) {
		super(props);

		this.state = {projectData: []} 
	}

	componentDidMount = () => {
		// console.log("hi")
		fetch(`/api/projects/${this.props.id}`)
			.then(res => res.json())
			.then(data => this.setState({projectData: data}))
	}

	// edit button next to each element which appears on hover
	// the edit button should convert the text into an input block 

	render() {
		const data = this.state.projectData
		return (
			<div style={{whiteSpace:"pre-wrap"}}>
				<Input/>
				<h2>{data.projectName}</h2>
				<br></br>
				<h3><b>Title Introduction: </b>{data.titleIntro}</h3>
				<h3><b>Title Main: </b>{data.titleMain}</h3>
				<h3><b>Summary: </b></h3><p>{data.summary}</p>

				<br></br>
				<br></br>
				<h3>Raw project data</h3>
				{JSON.stringify(this.state.projectData, null, 2)}
				
			</div>
		);
	}
}

/*
	DATABASE SCHEMA
	// an array of section
	sections: [
		// each section will be its own object
		{
			"Title" : "",
			// create an array for the structure which hold objects
			"structure" : [
				// check the type front end and render the approriate component
				{ "type":"image", "src":"../", "position": 1 },
				{ "type":"text", "text":"Lorem Ipsum", "position":3 },
				{ "type":"title", "text":"Lorem Ipsum", "position":2 }
			]
		}
	]

	RENDERING LOGIC
	// mapping through 
	sections.map((section, i) => {
		<h3>{section.Title}</h3>
		section.structure.map((element, i) => {
			switch(element.type) {
				case "image": 
					return <Image src={element.src}/>
				case "text":
					return <Text text={element.text}/>
				case "title":
					return <Title text={element.text}/>
				default: 
					return null
			}
		})	
	})
*/
