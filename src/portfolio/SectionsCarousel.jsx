import React from 'react';
import Img from 'react-image';
import ImageLoader from './imageLoader.jsx'

export default class Carousel extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			currentindex: 0,
			translateValue: 0,
			verticalValue: 0,
			images: this.props.images,
			test: 0
		}

		// this.getCurrentImageWidth = this.getCurrentImageWidth.bind(this);
		this.goToNextImage = this.goToNextImage.bind(this);
		// this.getCurrentImageWidth = this.getCurrentImageWidth.bind(this);

		// REF TO IMAGE CONTAINER
		this.imageContainerRef = React.createRef();
		this.scrollingContainerRef = React.createRef();

	}

	componentDidMount() {
		this.scrollingContainerRef.current.addEventListener('scroll', this.handleScroll);
	}

	goToNextImage = () => {

		// var allImages = this.state.images.length;
		var firstImg = this.imageContainerRef.current.childNodes[0];
		var nextImg = this.imageContainerRef.current.childNodes[this.state.currentindex + 1];
		var scrollTo = Math.abs(firstImg.getBoundingClientRect().left) + (nextImg.getBoundingClientRect().left);

		if (this.state.currentindex < (this.state.images.length - 1))  {
			this.setState({ currentindex: this.state.currentindex + 1 });
			this.scrollingContainerRef.current.scroll({left:scrollTo ,behavior: 'smooth'}) ;

		} 
	}

	goToPreviousImage = () => {

		if (this.state.currentindex > 0)  {

			// var allImages = this.state.images.length;
			var firstImg = this.imageContainerRef.current.childNodes[0];
			var prevImg = this.imageContainerRef.current.childNodes[this.state.currentindex - 1];
			var scrollTo = Math.abs(firstImg.getBoundingClientRect().left) + (prevImg.getBoundingClientRect().left);

			this.setState({ currentindex: this.state.currentindex - 1 });
			this.scrollingContainerRef.current.scroll({left:scrollTo ,behavior: 'smooth'}) ;
		}
	}

	handleScroll = () => {
		var currentimg = this.imageContainerRef.current.childNodes[this.state.currentindex];
		if (currentimg.getBoundingClientRect().right < 0) {
			this.setState({currentindex : this.state.currentindex + 1});
		} else if (currentimg.getBoundingClientRect().left > 0) {
			this.setState({currentindex : this.state.currentindex - 1 });
		}
	}

	render() {

		return (
			<div className="carousel-mask">
				<div className="carousel-button-back" onClick={this.goToPreviousImage}></div>
				<div className="carousel-button-forward" onClick={this.goToNextImage}></div>
				<div className="carousel-scrollable" ref={this.scrollingContainerRef}>
					<div 
						className="image-container" 
						ref={this.imageContainerRef}>
							{this.state.images.map((image, i) =>
								<ImageLoader
									key={i}
									src={`/assets/${image}`}
								/>
							)} 
					</div>
				</div>
			</div>
		);
	}
}

// TODO SET UP ANIMATION FOR LOADING IMAGES 
function LoaderImage() {
	return  (
		<div 
			style={{
				width:'50%', 
				height:'100%', 
				background:'grey',
				marginRight:'20px',
				display:'inline-block'
			}}>Loading</div>
	)
}

// <Img 
//	key={i}
//	src={`/assets/${image}.jpg`}
//	loader={<LoaderImage image={image}/>}
//	unloader={<LoaderImage />}
///>

//<img 
//	key={i} 
//	src={`/assets/${image}.jpg`}
//	onLoad={() => <LoaderImage/>}
///>	









