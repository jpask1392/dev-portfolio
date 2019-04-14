import React from 'react';
import Img from 'react-image';

export default class Carousel extends React.Component {
	// static propTy
	// 	name: React.PropTypes.string,
	// };

	constructor(props) {
		super(props);

		this.state = {
			currentindex: 0,
			translateValue: 0,
			verticalValue: 0,
			images: [
				"../../assets/image-one.jpg",
				"../../assets/image-one.jpg",
				"../../assets/image-one.jpg",
				"../../assets/projects/architecture-portfolio/archPortfolioIphone.png",
				"../../assets/projects/architecture-portfolio/archPortfolioIphone.png",
				"../../assets/projects/architecture-portfolio/archPortfolioIphone.png",
				"../../assets/projects/architecture-portfolio/archPortfolioIphone.png"
			]
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

		var allImages = this.state.images.length;
		var firstImg = this.imageContainerRef.current.childNodes[0];
		var nextImg = this.imageContainerRef.current.childNodes[this.state.currentindex + 1];
		var scrollTo = Math.abs(firstImg.getBoundingClientRect().left) + (nextImg.getBoundingClientRect().left);

		if (this.state.currentindex < allImages - 1)  {
			this.setState({ currentindex: this.state.currentindex + 1 });
			// this.scrollingContainerRef.current.scrollIntoView({behavior: 'smooth'});
			this.scrollingContainerRef.current.scroll({left:scrollTo ,behavior: 'smooth'}) ;

		} 
	}

	goToPreviousImage = () => {

		if (this.state.currentindex > 0)  {

			var allImages = this.state.images.length;
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

	// TODO REPLACE THIS WITH DATABASE TABLE DATA
	var images = [
		
	];

		return (
			<div className="carousel-mask">
				<div className="carousel-button-back" onClick={this.goToPreviousImage}></div>
				<div className="carousel-button-forward" onClick={this.goToNextImage}></div>
				<div className="carousel-scrollable" ref={this.scrollingContainerRef}>
					<div 
						className="image-container" 
						ref={this.imageContainerRef}>
							{this.state.images.map((image, i) =>
		 						<Img 
		 							key={i}
		 							src={image}
		 							loader={<LoaderImage />}
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
		<p>Loading</p>
	)
}









