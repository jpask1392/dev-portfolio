import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './project.scss';

export default class Project extends Component {
	_isMounted = false;

	constructor(props) {
		super(props);

		this.state = {
			data: [],
		}
	}

	componentDidMount() { 
		this._isMounted = true;

		if(this._isMounted) {
			// SET UP DIFFERENT API END POINTS FOR COLLECTING DATA
			fetch(`http://localhost:3000/api/projects/${this.props.projectId}`)
		      .then(response => response.json())
		      .then(data => this.setState({ data: data }))		
		}
	}


	render () {
		var data = this.state.data;

		return (
			<div id="landing-container" >
				<div id="intro-text-container">
					<h4>{data['title-intro']}</h4>
					<h1>{data['title-main']}</h1>
					<p>{data['summary']}</p>
				</div>
				<div>
				<SvgText text={data['title-main']} />
				</div>
			</div>
		)
	}
}