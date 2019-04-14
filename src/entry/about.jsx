import React, { Component } from 'react';
import './about.scss';
import ReactSVG from 'react-svg';
import SvgAboutImage from './SvgAboutImage.jsx';

export default class About extends Component {
	_isMounted = false;

	constructor(props) {
		super(props);
		this.state = {
				bottomOffset: 0, 
				visible: false, 
				aboutImg: 0
			};

		this.handleScroll = this.handleScroll.bind(this);
		this.myRef = React.createRef();
	}

	// COLLECT COMPONENT TOP POSTION
	componentDidMount() { 

		this._isMounted = true;

		if(this._isMounted) {

			this.setState({ aboutImg: this.myRef.current.offsetTop }) ;

			const tolerance = 200;

			if(this.state.aboutImg >= ( this.state.bottomOffset + tolerance )) {

				// CHANGE VISIBILITY STATE TO TRUE
				this.setState({ visible: true });

			} 

			window.addEventListener('scroll', this.handleScroll);	
		}

		// WINDOW RESIZE EVENT LISTENER HERE
	}

	// FUNCTION TO HANDLE LOCATION OF COMPONENT ON SCREEN
	handleScroll() {

		if(this._isMounted) {

			this.setState({bottomOffset: ( window.innerHeight - window.scrollY ) });
			this.setState({ aboutImg: this.myRef.current.offsetTop });

			// TOLERANCE FOR ACTIVATING ANIMATION ON SCROLL VARIABLE
			const tolerance = 200;

			if(this.state.aboutImg >= ( this.state.bottomOffset + tolerance )) {

				// CHANGE VISIBILITY STATE TO TRUE
				this.setState({ visible: true });

			} 
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		return (
			<div>

				<div id='about-img-container' ref={this.myRef}>

					<SvgAboutImage visible={this.state.visible} />					

				</div>


				<div id='about-text-container'>

					<div className="col lhs question-container"> 
						<h1>
							<span id="question-mark">Who <br/> am I </span> 
						</h1>
					</div>

					<div className="col rhs feature-text">

						 <br/>

						I am Jamie Pask. Born and raised in Cardiff, United Kingdom.<br/> 

						<br/>

						started back in 2015, learning to build simple static HTML and CSS sites. This fascination quickly grew into various projects. From writing python scripts to automate tasks to building websites from front to back.<br/>

						<br/>

						Jamie Pask. Interest in web development started back in 2015, learning to build simple static HTML and CSS sites. This fascination quickly grew into various projects. From writing python scripts to automate tasks to building websites from front to back.
					</div>
       
				</div>

			</div>
		)
	}
}















