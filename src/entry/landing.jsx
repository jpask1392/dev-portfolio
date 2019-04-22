import React, { Component } from 'react';
import './landing.scss';
import { CSSTransition } from 'react-transition-group';
import ReactSVG from 'react-svg';

export default class Landing extends Component {

	render() {
		var words = ["Full stack ", "developer, ", "problem ", "solver and ", "digital ", "design ", "enthusist"];


		return (
			<div className="container-max" id="landing-container">

				<div id='landing-inner-container'>
					<ReactSVG 	src="../../assets/circle-icon.svg" 
									svgClassName="circle-icon-svg"
									 />
					<div className="col rhs" >
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
					<div className="col lhs" id='intro-text-container'>
						<b>Living in LA</b>
						<p>Hey! I’m Jamie, a full stack developer and a passionate tinkerer of all things software. Still learning and still growing but please take a look around. Any feedback is welcome! 
						</p>
					</div>
				</div>
			</div>
		)
	}

}
