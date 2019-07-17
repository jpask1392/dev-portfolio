import React, { Component } from 'react';
import Img from 'react-image';
import { Link } from "react-router-dom";
import ImageLoader from '../portfolio/imageLoader.jsx'
import {onScreen} from '../common/commonFunctions.js'

export default class Portfolio extends Component {
	_isMounted = false;

	constructor(props) {
		super(props);

		this.state = {
			data: [{
				'_id': 0,
				'mainImagePath' : ''
			}],
			visible: false,
			visibleIndex: null
		}

	}

	componentDidMount() { 
		this._isMounted = true;

		if(this._isMounted) {
			// SET UP DIFFERENT API END POINTS FOR COLLECTING DATA
			fetch('/api/projects')
		      .then(response => response.json())
		      .then(data => this.setState({ data }));			
		}

		window.addEventListener("scroll", this.handleScroll)
	} 

	componentWillUnmount() {
		this._isMounted = false;
	}

	handleScroll = () => { 

		if(this.props.visibleSection === "portfolio") {
			this.setState({visible: true})
		} else {
			this.setState({visible: false})
		}
		
	}

	checkIndex(newIndex) {
		this.setState({visibleIndex: newIndex})
	}

	render() {
		let data = this.state.data;
		let visibleIndex = 0;
		if(this.state.visibleIndex != null) {
			visibleIndex = this.state.visibleIndex
		}

		return (
			<div id="portfolio-container" ref={this.props.portfolioRefProp}>
				<div className={this.state.visible ? "title-info fixed" : "title-info"}>
					<p>RECENT WORK</p>
					<h2 style={{color:"white"}}>{data[visibleIndex]['mainImagePath']}</h2>
					<p>Click to view the creation process of my current portfolio </p>
				</div>

				<div className={this.state.visible ? "scroll-dots fixed" : "scroll-dots"}>
					{data.map((project) => 
						<span key={project['_id']}></span>
					)}
				</div>

				<div id='gallery-container'>
					{data.slice(0, 4).map((project, i) => 
						{  
							return <Gallery 
								data={project} 
								index={i} 
								key={project['_id']}
								updateIndex={this.checkIndex.bind(this)}
							/>
						}
				 	)}
				</div>
			</div>
		)
	}
}
 
class Gallery extends Component {
	constructor(props) {
		super(props)
		this.state = { visible: false }
		
		this.handleScroll = this.handleScroll.bind(this)
		this.projectRef = React.createRef()
	}

	componentDidMount() {
		window.addEventListener("scroll", this.handleScroll)
	}

    handleScroll = () => {

    	if(onScreen(this.projectRef, {elOffset: "middle"})) {
    		this.setState({visible: true})
    	} else {
    		this.setState({visible: false})
    	}

    	if(onScreen(this.projectRef, {elOffset: "top", screenOffset:"middle"})) {
    		this.props.updateIndex(this.props.index)
    	}
    }

    componentDidUpdate() {

    }


    render() {
    	var project = this.props.data;
	    return (
	    	<div className="project-container">
			<Link to={"projects/" + project['_id']}>
				<div 	
					ref={this.projectRef}
					className={this.state.visible ? "individual-project rotate" : "individual-project"}
					style={{
						backgroundImage: 'url(/assets/' + project['mainImagePath'] + '.png)'
					}}
				>
				</div>
			</Link>
			</div>

		);
    }
}