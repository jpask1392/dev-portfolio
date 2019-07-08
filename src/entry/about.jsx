import React, { Component } from 'react';
import './about.scss';
import ReactSVG from 'react-svg';
import SvgAboutImage from './SvgAboutImage.jsx';
import { onScreen } from '../common/commonFunctions.js'
import AboutCarousel from './aboutCarousel.jsx'

export default class About extends Component {
	_isMounted = false;

	constructor(props) {
		super(props);
		this.state = { 
				visible: false, 
			};

		this.handleScroll = this.handleScroll.bind(this);
		this.myRef = React.createRef();
	}

	// COLLECT COMPONENT TOP POSTION
	componentDidMount() { 

		this._isMounted = true;

		if(this._isMounted) {

			if(onScreen(this.myRef)) {
				this.setState({ visible: true });
			}

			window.addEventListener('scroll', this.handleScroll);	
		}

		// WINDOW RESIZE EVENT LISTENER HERE
	}

	// FUNCTION TO HANDLE LOCATION OF COMPONENT ON SCREEN
	handleScroll() {

		if(this._isMounted) {
			if(onScreen(this.myRef)) {
				this.setState({ visible: true });
			} else {
				this.setState({ visible: false })
			}
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		return (
			<div className="about-container " id='about-container' ref={this.props.aboutRefProp}>

				<div id='about-img-container' ref={this.myRef} >

					<SvgAboutImage visible={this.state.visible} />					

				</div>

				<div className="container-max" id='about-text-container'>

					<AboutCarousel/>
					<div>
						
						
					</div>
       
				</div>

			</div>
		)
	}
}















