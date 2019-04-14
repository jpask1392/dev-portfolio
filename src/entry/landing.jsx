import React, { Component } from 'react';
import './landing.scss';
import { CSSTransition } from 'react-transition-group';
import ReactSVG from 'react-svg';

export default class Landing extends Component {

	render() {
		var words = ["Full stack", "developer,", "problem", "solver and", "digital", "design", "enthusist"];


		return (
			<div id="landing-container">
			<div id='landing-inner-container'>
				<ReactSVG 	src="../../assets/circle-icon.svg" 
							svgClassName="circle-icon-svg" />
				<div id='intro-text-container'>


					<b>Living in LA</b>
					<p>Jamie Pask. Interest in web development started back in 2015, learning to build simple static HTML and CSS sites. This fascination quickly grew into various projects. From task automation with python scripts to building websites from front to back.
					</p>
				</div>
				<div id='header-text-container'>
					{ 
						words.map(function(word) {
							return (
								<span className="header-mask" key={word}>
								<CSSTransition 	in={true} 
												timeout={0}
												appear={true}
												classNames="header-words">
									<h1>{word}</h1>
								</CSSTransition>
								</span>
							)
						}) 
					}
				</div>
			</div>
			</div>
		)
	}

}
