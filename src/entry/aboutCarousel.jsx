import React from 'react';
import './aboutCarousel.scss';

export default class AboutCarousel extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {
			index: 0,
			translate: 0,
			slideData:
			[
				{
					title: "about me ",
					updated: "06/13/2019",
					text: 
						<p>Hey! I’m Jamie, a full stack developer and a passionate tinkerer of all things software. Born and raised in Cardiff, United Kingdom, but spent some time in Vancouver before eventually tying the knot and recently moving to Los Angeles, Brentwood area. After graduating from Cardiff Metropolitan University in 2015 with a bachelor of science degree in Architectural Design and Technology, I began a 3 year career as an Architectural Technologist at EPT Partnership and Holder Mathias Architects. I fell into the world of programming a few years back after trying to create a web portfolio to display my architectural projects. The problem solving part of the task seemed to scratch that itch. I moved onto creating simple Python scripts to automate a variety of tasks within the office, saving hundreds of work hours. The more I learned, the more I wanted to explore the possibility of a software development career. This fascination has led to the completion of the multiple projects.
							<u 	
								style={{cursor:"pointer", marginLeft:"10px"}} 
								onClick={() => this.setStateAndTranlsate(1, this.getSlideWidth())}>
								Read More
							</u> 
						</p>
				},
				{
					title: "Accomplishments ",
					updated: "06/15/2019",
					text: 
						<p>Over the past few years I have gained experience in building both web applications and software plugins, educated by reputable online learning sources. I have successfully completed  a variety of projects including a node web application for my current developer portfolio, a PHP and SQL architecture portfolio, Wordpress websites and Python scripting for task automation. Database technologies such as MongoDB and SQL used for data storage, git for management and ESlint for code linting. Looking to progress and learn further, I have begun a personal educational project of a booking system to further demonstrate an understanding of a more interactive user experience. I am looking to learn data cleansing techniques of client side interaction with the backend data via this project. 
							<u 	
								style={{cursor:"pointer", marginLeft:"10px"}} 
								onClick={() => this.setStateAndTranlsate(2, this.getSlideWidth()*2)}>
								Read More
							</u> 
						</p>
				},
				{
					title: "Goals ",
					updated: "06/13/2019",
					text: <p>Full stack development ticks all the boxes for me, from data collection to data driven design, and this is ultimately the route I want to follow. Machine learning is also of intrigue and I would hope that after some time, this will become a staple part of my daily workflow.</p>
				}
			] 
			
		}
	}

	getSlideWidth() {
		return document.querySelector('.slide-container').clientWidth
	}

	setStateAndTranlsate(indexValue, translateValue) {
		this.setState({
			index: indexValue,
			translate: translateValue
		})
	}

	render() {
		return (
			<div className="carousel-container">
				<div className="about-lhs">
					

					<div className="slide-container">

					<Slide translateValue={this.state.translate}>
						<span>
							<h2>{this.state.slideData[0].title}</h2>
							{this.state.slideData[0].text}
						</span>
					</Slide>
					<Slide translateValue={this.state.translate}>
						<span>
							<h2>{this.state.slideData[1].title}</h2>
							{this.state.slideData[1].text}
						</span>
					</Slide>
					<Slide translateValue={this.state.translate}>
						<span>
							<h2>{this.state.slideData[2].title}</h2>
							{this.state.slideData[2].text}
						</span>
					</Slide>
				</div>
				</div>

				

				<div className="dot-container">
					<div>
					<span className={`red-dot ${this.state.index == 0 ? 'active-red-button' : null}`} onClick={() => this.setStateAndTranlsate(0, 0)}></span>
					<span className={`red-dot ${this.state.index == 1 ? 'active-red-button' : null}`} onClick={() => this.setStateAndTranlsate(1, this.getSlideWidth())}></span>
					<span className={`red-dot ${this.state.index == 2 ? 'active-red-button' : null}`} onClick={() => this.setStateAndTranlsate(2, (this.getSlideWidth()*2))}></span>
			
					</div>
				</div>
			</div>
		);
	}
}

const Slide = (props) => {
  return (
    <span 
    	className="slide"
    	style={{transform: `translateX(-${props.translateValue}px)`}}
    >
    	{props.children}
    </span>
  )
}


