import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

export default class Landing extends Component {

	render() {
	
		return (
			<div id="landing-container" ref={this.props.landingRefProp}>
				<div id="landing-inner-container">
					<h1 style={{color:"white"}}>Looking for an Engineer?
						<span className="smile"></span>
					</h1>
					<h2 style={{color:"#615E65", marginTop:"50px"}}>
						Proficient in <a>Javascript</a> with React, Node environment, MongoDB, testing frameworks, PHP & SQL, Python and more.
					</h2>

				</div>
			</div>
		)
	}
}
