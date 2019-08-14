import React from 'react'
import ProjectHeaderImage from './ProjectHeaderImageComponent.jsx'
import { Route, Link } from "react-router-dom";
import NumberNavigation from './NumberNavigation.jsx'
import styled, {keyframes} from 'styled-components';

export default class projectEntry extends React.Component {

	constructor(props) {
		super(props);
	}


	componentDidMount() {
		document.body.classList.add("no-scroll")
		
		setTimeout(() => {
			document.body.classList.remove("no-scroll")
		}, 1000) 
	}

	render() {

		return (
		<div className="project-cont" style={{
			height:"100%", 
			position:"relative",
			background: this.props.backgroundColor()
		}}>
			
				<div
					id="project-landing-container"
					className="dont-show"
					style={{
						backgroundImage: 'url(/assets/' + this.props.data['mainImagePath'] + '.png)'
					}}>

				</div>
			

		</div>
		);
	}
}


