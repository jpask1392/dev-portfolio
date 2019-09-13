import React 				from 'react';
import { Link, withRouter } from "react-router-dom";
import { onScreen } 		from '../common/commonFunctions.js'
import Gallery 				from './gallery.jsx'
import DotNavigation		from './dotNavigation.jsx'
import ProjectTitle			from './projectTitle.jsx'
import store				from '../redux/store/index'

class Portfolio extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			data: [],
			visible: false,
			topOfCurrentEl: 0,
			clickedIndex: null
		}
	}

	componentDidMount = () => { 

		const locationPathname = this.props.location.pathname

		// home path returns a capped amount of projects
		if(locationPathname === '/') {
			fetch('/api/recentprojects')
		      .then(response => response.json())
		      .then(data => this.setState({ data }));			
	
		// projects path returns all the projects
		} else if(locationPathname === '/projects') {
			fetch('/api/projects')
		      .then(response => response.json())
		      .then(data => this.setState({ data }))				

		    this.setState({visible: true})
		}

		window.addEventListener("scroll", this.handleScroll)
	} 

	// TRIGGER WHEN THE PORTFOLIO CONTAINER COMES INTO VIEW
	handleScroll = () => { 
		this.setState(() => 
			(this.props.visibleSection === "portfolio") ? 
				{visible: true} : 
				{visible: false}
		)
	}

	// triggered when project is clicked to create smooth transition to new page
	Changing = (e, clickedIndex) => {
		const clickedEl = document.getElementsByClassName("project-container")[clickedIndex]
		const elTopLocation = clickedEl.getBoundingClientRect().top
		this.props.updateTranslateValue(elTopLocation)
		this.setState({clickedIndex: clickedIndex})
	}

	componentWillUnmount = () => {
		window.removeEventListener("scroll", this.handleScroll)
	}

	render() {
		
		let data = this.state.data
		let visible = this.state.visible
		// get visible index from Redux
		let visibleIndex = store.getState().visibleProjectIndex

		return (
			<div id="portfolio-container" ref={this.props.portfolioRefProp}>

				{ data.length !== 0 ?
					<React.Fragment>

						<ProjectTitle 
							visible={visible} 
							data={data}
							Changing={this.Changing.bind(this)}/>

						<DotNavigation data={data} visible={visible}/>

						<div id='gallery-container'>
							{data.map((project, i) => 
								<Gallery 
									key={project['_id']}
									index={i} 
									data={project} 
									Changing={this.Changing.bind(this)}
									imgInitLocation={this.props.imgInitLocation}
									clickedIndex={this.state.clickedIndex}/>
						 	)}
						</div>
					</React.Fragment> : null
					
				}

			</div>
	 	)
	} 
} 

export default withRouter(Portfolio)
