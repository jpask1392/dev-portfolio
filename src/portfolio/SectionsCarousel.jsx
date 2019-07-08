import React from 'react';
import ImageLoader from './imageLoader.jsx'
import {onScreen} from '../common/commonFunctions.js' 


export default class Carousel extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			currentindex: 0,
			images: this.props.images
		}

		// REF TO IMAGE CONTAINER
		this.imageContainerRef = React.createRef();

	}

	render() {

		return (
		
				<div className="carousel-scrollable" ref={this.scrollingContainerRef}>
					<div 
						className="image-container" 
						ref={this.imageContainerRef}>
							{this.state.images.map((image, i) =>
								<SectionImageWrapper
									index={i}
									key={i}
									src={`/assets/${image.filePath}`}
									description={image.description}
								>
									<ImageLoader
										src={`/assets/${image.filePath}`}
									/>
								</SectionImageWrapper>
							)} 
					</div>
				</div>
	
		);
	}
}


// WRAPPER TO AVOID CONFLICTION WITH OTHER LOADING IMAGES
class SectionImageWrapper extends React.Component {
	_isMounted = false;

	constructor(props){
		super(props);

		this.sectionImageRef = React.createRef()
		this.handleScroll = this.handleScroll.bind(this)
	}

	componentDidMount() {
		this._isMounted = true;

		if(this._isMounted) {
			window.addEventListener('scroll', this.handleScroll);
		}
	}

	handleScroll () {
		if(this._isMounted) {

			// LIFT AND FADE WHEN 'TOP' OF ELEMENT APPEARS ON SCREEN
			onScreen(this.sectionImageRef, {
				elOffset:"top",
				screenOffset:"top"
			}) ? 
				this.sectionImageRef.current.classList.add("lift-fade") :
				this.sectionImageRef.current.classList.remove("lift-fade")

			// SCALE UP WHEN ELEMENT REACHES MIDDLE OF SCREEN
			onScreen(this.sectionImageRef, {
				elOffset:"middle",
				screenOffset:"middle"
			}) ? 
				this.sectionImageRef.current.classList.add("scale-up") :
				this.sectionImageRef.current.classList.remove("scale-up")
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		const randWidth = Math.floor(Math.random() * (60 - 45)) + 45

		// RANDOM PERCENTAGE OFFSET BETWEEN 5 AND 15
		const randLeft = Math.floor(Math.random() * (15 - 5)) + 5

		// RANDOM PERCENTAGE OFFSET BETWEEN ( 100 - randWidth - 15) AND ( 100 - randWidth - 5)
		const randRight = Math.floor(Math.random() * (( 100 - randWidth - 15) - ( 100 - randWidth - 5))) + ( 100 - randWidth - 5)

		return (
			<div 
				onClick={() => window.open(`${this.props.src}`,'scrollbars=yes,width=421,height=422%')}
				ref={this.sectionImageRef}
				className="section-image-wrapper"
				style={
					this.props.index%2 == 0 ? 
					{left:`${randLeft}%`, width:`${randWidth}%`} : 
					{left:`${randRight}%`, width:`${randWidth}%`}
				}
			>
				{this.props.children}
				<div className="hover-description">{this.props.description}</div>
			</div>
		)
	}
}