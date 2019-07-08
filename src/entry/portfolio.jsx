import React, { Component } from 'react';
import './portfolio.scss';
import Img from 'react-image';
import { Link } from "react-router-dom";
import ImageLoader from '../portfolio/imageLoader.jsx'

export default class Portfolio extends Component {
	_isMounted = false;

	constructor(props) {
		super(props);

		this.state = {
			data: []
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
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {

		var data = this.state.data;

		return (
			<div id="portfolio-container" ref={this.props.portfolioRefProp}>
				<div id="portfolio-inner-container">
					<div className="container-max" style={{minHeight:"auto"}}>
						<h1>Case Studies</h1>
						<hr></hr>
					</div>

					{/*LIMIT RETURNED PROJECTS WITH SLICE WITHIN CONTAINER*/}
					<div id='gallery-container'>
						{data.slice(0, 4).map((project, i) => 
							<Gallery data={project} index={i} key={project['_id']} />
					 	)}
					</div>

				</div>
			</div>
		)
	}
}
 
function Gallery(props) {

    var project = props.data;
    var classNames = ["one", "two", "three", "one"];

    return (
    	<div className={`project-container-${classNames[props.index]}`}>
		<Link to={"projects/" + project['_id']}>
			<div 	
				className="background-img-container" 
				style={{
					backgroundImage: 'url(../../assets/' + project['mainImagePath'] + '.jpg)'
				}}
			>
			</div>
		</Link>
		</div>
	);

}