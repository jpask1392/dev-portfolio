import React, { Component } from 'react';
import '../common/common.scss';
import Landing from './landing.jsx';
import About from './about.jsx';
import Portfolio from './portfolio.jsx';
import './about.scss';
import { CSSTransition } from 'react-transition-group';
import Contact from './contact.jsx';


// SET THIS UP AS A CLASS AND TRACK WHICH COMPONENTS ARE ON THE SCREEN

export default class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			aboutVisibility: false,
			portfolioVisibility: false,
			contactVisibility: false,
		}

		this.aboutRef = React.createRef();
		this.portfolioRef = React.createRef();
		this.contactRef = React.createRef();
	}

	render() {

		return (
			<div className="full-height"> 
				<Scroll />
				<Landing />
				<About refProp={this.aboutRef} />
				<Portfolio />
				<Contact />
			</div>
		)
	}
}


