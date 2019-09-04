import React from 'react';

const AboutMainSection = props =>
	<div ref={props.mainSectionRef} className="about-main-section-container"> 

		<figure id="about-me-image">
			<div className="about-image-container"></div>		
			<figcaption>San Fransico</figcaption>
		</figure>

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
				After graduating with a degree in Architectural Design and Technology, I began a 3 year career as an Architectural Technologist with EPT Partnership and Holder Mathias Architects. I spent a lot of time creating and deploying automation scripts in written myself in Python to improve efficiency. After realising these programming tasks made me feel the most satisfied, I decided to take it more seriously and pursue a career in that field.							
				</p>
			</div>
		</div>
	</div>

export default AboutMainSection;