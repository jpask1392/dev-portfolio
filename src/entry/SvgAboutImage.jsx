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
	}


	componentDidMount() { 
		this._isMounted = true;

		if(this._isMounted) {
			window.addEventListener('scroll', this.handleScroll);	
		}
	}

	componentDidUpdate() {
		if (this.props.visible) {
			this.whiteLHS.current.classList.add("white-cover-lhs");
			this.whiteRHS.current.classList.add("white-cover-rhs");
		}
	}

	handleScroll = () => {
		if(this._isMounted) {
			if (this.props.visible) {
				this.whiteLHS.current.classList.add("white-cover-lhs");
				this.whiteRHS.current.classList.add("white-cover-rhs");
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

				<image className="image-1" xlinkHref="../../assets/IMG_3542.jpg" width="50%"  clipPath="url(#myClip)" />

				<image className="image-2" xlinkHref="../../assets/DSC_0465 2.jpg" width="50%" clipPath="url(#myClip)"  />

				<rect ref={this.whiteLHS} fill="white" width="50%" height="100%"/>

				<rect ref={this.whiteRHS} x="50%" fill="white" width="50%" height="100%"/>

			</svg>
		);
	}
}
