import React from 'react';
import Background from '../common/background.jsx'
import SkillTile from './skill-tile.jsx'
import tileData from './skillsData.json'
import AboutSelfImage from './aboutSelfImage.jsx'
import ScrollPin from '../common/scrollPin.jsx'
import FooterBar from '../common/footerBar.jsx'

export default class About extends React.Component {

	constructor(props) {
		super(props);

		this.newRef = React.createRef();
		this.newRef2 = React.createRef();
		this.newRef3 = React.createRef();

		this.state = { 
			skills: tileData,
			pinLocation: "83.3333%",
			pinColor: "light"
		}

	}

	render() {
	var object = {
		lightBackRefs: [this.newRef, this.newRef3], 
		darkBackRefs: [this.newRef2]
	}
	
		return (
			<div style={{height:"100%"}}>

				<Background colors={object} /> 

				<div
					style={{left:this.state.pinLocation}}
					id="pin-container">

					<ScrollPin pinColor={this.state.pinColor}/>
				</div>
			
			{/* -------------------- make a new component here -------------------- */}

				<div className="about-landing-container">
					<div ref={this.newRef2}
					style={{
						position:"absolute",
						top:"50%",
						left: "16.666%",
						width: "40%",
						transform: "translatey(-50%)"
					}}>
						<div className="waving-hand">
							<i className="far fa-hand-paper"></i>
						 </div>
						<h2 style={{
							color: "grey",
							position:"relative",
							marginTop:"50px"
						}}>
							I’m a web developer looking for opportunities to progress - Here’s a little more about my background / skills / life. Enjoy! 
						</h2>
					</div>
				</div>

				<div className="about-buffer"></div>

			{/* -------------------- make a new component here -------------------- */}

				<div ref={this.newRef} className="temp-delete"> 

					<div className="about-image-container">
						<AboutSelfImage/>
					</div>

					<div className="about-text-container">
						<h2>Get to know me a little more</h2>
						<hr></hr>
						<div className="about-paragraphs top">
							<h3 className="sub-heading">Background</h3>
							<p>
							Hi! I am Jamie Pask. Born and raised in Cardiff, United Kingdom but spent some time traveling through America and Canada.  Visiting the US often eventually led to tying the knot and recently moving to Los Angeles, Brentwood area.  My background in programming began after a wanting to build my own web portfolio for an Architectural Technician position. These very simple web pages rapidly gained complexity and I am now able to comprehend many programming techniques.
							</p>
						</div>
						<div className=" about-paragraphs left">
							<h3 className="sub-heading">Education</h3>
							<p>
							Formally educated in Architectural Design and Technology, graduating in 2014 with a Bachelor of Science (Honors) from Cardiff Metropolitan University. Through the extension of credible online tutorials, I was able to build a strong foundation of programming knowledge, which led to the ability to undertake and understand a variety of problems in my projects. I am consistently learning and improving 
							</p>
						</div>
						<div className=" about-paragraphs right">
							<h3 className="sub-heading">Employment</h3>
							<p>
							After graduating with a degree in Architectural Design and Technology, I began a 3 year career as an Architectural Technologist with EPT Partnership and Holder Mathias Architects. I spent a lot of time creating and deploying automation scripts in written myself in Python to improve efficiency. After realising these programming tasks made me feel the most satisfied, I decided to take it more seriously and pursue a career in that field.							</p>
						</div>
					</div>

				</div>

			{/* -------------------- make a new component here -------------------- */}

				<div className="reference-quote-container">
					<h2 className="quote"> “He was punctual, enthusiastic and highly committed during his time with us and we would have no hesitation in recommending him for employment elsewhere. “</h2>
					<h3 className="quote-author">Mike Pritchett - Director at EPT Partnership </h3>
					
				</div>

			{/* -------------------- make a new component here -------------------- */}

				<div className="skills-list-container" ref={this.newRef3}>

					<h2>The skills</h2>
					<div className="skill-card-container">
						{this.state.skills.map((skill) => {
						
							return (
								<SkillTile 
									key={skill.skillName}
									skillName={skill.skillName}
									skillImage={skill.skillImage}
									skillSummary={skill.skillSummary}
									skillBack={skill.skillBack} 
								/>
							)
						}) }

					</div>
				</div>

			{/* -------------------- make a new component here -------------------- */}

				<FooterBar 
					location={this.props.location}
				/>

			</div>
		);
	}
}
