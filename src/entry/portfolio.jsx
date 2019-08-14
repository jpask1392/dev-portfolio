import React 			from 'react';
import Img 				from 'react-image';
import { Link } 		from "react-router-dom";
import ImageLoader 		from '../portfolio/imageLoader.jsx'
import { onScreen } 	from '../common/commonFunctions.js'
import Gallery 			from './Gallery.jsx'
import { withRouter } 	from 'react-router-dom';
import NextButton 		from '../common/nextButton.jsx'

// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";



class Portfolio extends React.Component {
	_isMounted = false;

	constructor(props) {
		super(props);

		this.state = {
			data: [],
			visible: false,
			visibleIndex: 0,
			firstElDistFromTop: 0,
			firstElHeight: 0,
			topOfCurrentEl: 0,
			clickedIndex: null
		}

	}

	componentDidMount() { 
		this._isMounted = true;

		if(this._isMounted && this.props.location.pathname === '/') {
			// SET UP DIFFERENT API END POINTS FOR COLLECTING DATA
			fetch('/api/recentprojects')
		      .then(response => response.json())
		      .then(data => this.setState({ data }));			
		
			window.addEventListener("scroll", this.handleScroll)

		// EACH PATH IS SLIGHTLY DIFFERENT
		// /PROJECTS PATH RENDERS ALL THE AVAILABLE PROJECTS
		} else if(this._isMounted && this.props.location.pathname === '/projects') {
			fetch('/api/projects')
		      .then(response => response.json())
		      .then(data => this.setState({ data }));				

		    this.setState({visible: true})
		    window.addEventListener("scroll", this.handleScroll)
		}
	} 

	// TRIGGER WHEN THE PORTFOLIO CONTAINER COMES INTO VIEW
	handleScroll = () => { 

		if(this._isMounted & this.props.visibleSection === "portfolio") {
			this.setState({visible: true})
		} else {
			this.setState({visible: false})
		}

	}

	// TRIGGER WHEN DOT CLICKED *I PASSED FROM MAP FUNCTION
	// HANDLES DOT NAVIGATION
	goToProject = (i) => {

		window.scrollTo({
			top: this.state.firstElDistFromTop + (this.state.firstElHeight * i),
			left: 0,
			behavior: 'smooth' 
		})
		
	}

	//
	Changing = (e, clickedIndex) => {

		if(this._isMounted) {
			// UPDATES TRANSLATE VALUE
			this.props.updateTranslateValue(
				e.currentTarget.getBoundingClientRect().top
			)

			this.setState({clickedIndex: clickedIndex})
			
		}
		
	}

	// FUNCTION PASSED TO GALLERY PROPS TO MAINTAIN STATE 
	// FUNCTION CHECKS THE FIRST IMAGE IN THE GALLERY LOCATION
	updateFirstImageContainer = (location, height) => {
		if(this._isMounted) {
			this.setState({firstElDistFromTop: location})
			this.setState({firstElHeight: height})
		}
	}

	// FUNCTION PASSED TO GALLERY PROPS TO MAINTAIN STATE 
	// FUNCTION CHECKS THE VISIBLE PROJECT ON SCREEN
	checkIndex(newIndex) {
		if(this._isMounted) {
			this.setState({visibleIndex: newIndex})
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
		window.removeEventListener("scroll", this.handleScroll)
	}


	render() {
		
		let data = this.state.data;
		let visibleIndex = 0;
		if(this.state.visibleIndex != null) {
			visibleIndex = this.state.visibleIndex
		}

		return (

			<div id="portfolio-container" ref={this.props.portfolioRefProp}>

			{/* TODO make this a new component */}
			
				<div className={
					this.state.visible ? 
					"title-info fixed fade-out" : 
					"title-info"
				}>
					<p>{this.props.location.pathname === '/' ? "RECENT WORK" : "ALL PROJECTS"}</p>
					<h2>
						{
							this.state.data.length !== 0 ? 
							this.state.data[visibleIndex]['projectName'] : 
							null
						}
					</h2>
					<p>Click to view the creation process of my current portfolio</p>

					<NextButton 
						linkTo={`/projects/`}
						backgroundColor="white"
					/>
				</div>

			{/* TODO make this a new component */}

				<div 
					className={this.state.visible ? 
						"scroll-dots fixed fade-out" : 
						"scroll-dots fade-out"}>
							{data.map((project, i) => 
								
								<span 
									key={project['_id']}
									className={i === this.state.visibleIndex ? "active-dot" : ""}
									onClick={() => this.goToProject(i)}>
									<p className="tool-tip ">
										{
											this.state.data.length !== 0 ? 
											this.state.data[i]['projectName'] : 
											null
										}
									</p>
								</span>
							
							)}

					{this.props.location.pathname === '/' ? <ViewAllButton/> : null}

				</div>
				

				<div id='gallery-container'>
					{data.slice(0, 4).map((project, i) => 
						
						<Gallery 
							key={project['_id']}
							index={i} 
							data={project} 
							updateIndex={this.checkIndex.bind(this)}
							updateFirstImageContainer={this.updateFirstImageContainer.bind(this)}
							goToProject={this.goToProject.bind(this)}
							Changing={this.Changing.bind(this)}
							className={"project-container"}
							imgInitLocation={this.props.imgInitLocation}
							clickedIndex={this.state.clickedIndex}
						/>
						
				 	)}
				</div>
			</div>
		 ) 

	} // end of render method
} // end of class

const ViewAllButton = () => {
	return (
		<div className="view-all-button">
			<Link to="/projects"><h3>View all</h3></Link>
		</div>
	)
} 

export default Portfolio
