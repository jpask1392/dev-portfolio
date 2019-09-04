import React 				from 'react';
import { Link, withRouter } from "react-router-dom";
import ImageLoader 			from '../portfolio/imageLoader.jsx'
import { onScreen } 		from '../common/commonFunctions.js'
import Gallery 				from './gallery.jsx'
import DotNavigation		from './dotNavigation.jsx'
import ProjectTitle			from './projectTitle.jsx'
import store				from '../redux/store/index'

class Portfolio extends React.Component {
	_isMounted = false;

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
		this._isMounted = true;
		const locationPathname = this.props.location.pathname

		// home path returns a capped amount of projects
		if(this._isMounted && locationPathname === '/') {
			fetch('/api/recentprojects')
		      .then(response => response.json())
		      .then(data => this.setState({ data }));			
		
			window.addEventListener("scroll", this.handleScroll)

		// projects path returns all the projects
		} else if(this._isMounted && locationPathname === '/projects') {
			fetch('/api/projects')
		      .then(response => response.json())
		      .then(data => this.setState({ data }));				

		    this.setState({visible: true})
		    window.addEventListener("scroll", this.handleScroll)
		}
	} 

	// TRIGGER WHEN THE PORTFOLIO CONTAINER COMES INTO VIEW
	handleScroll = () => { 

		if(this._isMounted && this.props.visibleSection === "portfolio") {
			this.setState({visible: true})
		} else {
			this.setState({visible: false})
		}

	}

	// triggered when project is clicked to create smooth transition to new page
	Changing = (e, clickedIndex) => {
		const elTopLocation = e.currentTarget.getBoundingClientRect().top
		if(this._isMounted) {
			this.props.updateTranslateValue(elTopLocation)
			this.setState({clickedIndex: clickedIndex})
		}
	}

	componentWillUnmount = () => {
		this._isMounted = false;
		window.removeEventListener("scroll", this.handleScroll)
	}

	render() {
		
		let data = this.state.data
		let visible = this.state.visible
		// get visible index from Redux
		let visibleIndex = store.getState().visibleProjectIndex

		if (data.length !== 0) {
			return (
				<div id="portfolio-container" ref={this.props.portfolioRefProp}>

					<ProjectTitle visible={visible} data={data}/>
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
				</div>
		 	)
		} else { return null }
	} 
} 

export default Portfolio
