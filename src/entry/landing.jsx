import React, { Component } from 'react';
import './landing.scss';
import { CSSTransition } from 'react-transition-group';
import ReactSVG from 'react-svg';

export default class Landing extends Component {

	render() {
	
		return (
			<div className="container-max" id="landing-container">

				<div id='landing-inner-container'>
					<div className="col rhs" >
						<div id='header-text-container'>
							ADD SVG
						</div>
					</div>
					<div className="col lhs" id='intro-text-container'>
						<b>Living in LA</b>
						<hr></hr>
					</div>
				</div>
			</div>
		)
	}

}
