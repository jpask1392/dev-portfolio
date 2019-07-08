import React from 'react';

export default class SvgAboutImage extends React.Component {
	_isMounted = false;
	// static propTypes = {
	// 	name: React.PropTypes.string,
	// };

	constructor(props) {
		super(props);
		this.state = {visible: false}
		this.whiteLHS = React.createRef();
		this.whiteRHS = React.createRef();
		this.imageOne = React.createRef();
		this.imageTwo = React.createRef();
	}


	componentDidMount() { 
		this._isMounted = true;

		if(this._isMounted) {
			window.addEventListener('scroll', this.handleScroll);	
		}
	}

	handleScroll = () => {
		if(this._isMounted) {
			if (this.props.visible) {
				this.whiteLHS.current.classList.add("white-cover-lhs");
				this.whiteRHS.current.classList.add("white-cover-rhs");
			} else {
				this.whiteLHS.current.classList.remove("white-cover-lhs");
				this.whiteRHS.current.classList.remove("white-cover-rhs");
			}
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1279 395.7">
				<defs>

					<clipPath id="myClip">
						<path d="M1279,365c-254-47-454.81-51.57-643-13C353,410,114,406,0,365V0H1279Z"/>
					</clipPath>

				</defs>

				<g clipPath="url(#myClip)" fill="white">



				<image 
					ref={this.imageOne}
					className="image-1" 
					xlinkHref="../../assets/IMG_3542.jpg" 
					width="50%"
					height="150%"
					x="50%"
					y="-15%"
				/>

				<image 
					ref={this.imageTwo}
					className="image-2" 
					xlinkHref="../../assets/DSC_0465 2.jpg" 
					width="50%" 
					height="250%"
					y="-50%"  
				/>

				<rect 
					ref={this.whiteLHS} 
					width="50%" 
					height="100%"
				/>

				<rect 
					ref={this.whiteRHS} 
					x="50%" 
					width="50%" 
					height="100%"
				/>

				</g>

			</svg>
		);
	}
}
