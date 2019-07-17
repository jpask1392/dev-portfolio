import React from 'react';
import { onScreen } from '../common/commonFunctions.js'

export default class SvgText extends React.Component {
	_isMounted = false;

	constructor(props) {
		super(props);
		this.svgContainer = React.createRef();
		this.text = React.createRef();

		this.addClass = this.addClass.bind(this)
	}

	componentDidMount() {
		this._isMounted = true;
		window.addEventListener('scroll', this.addClass);	
	}


	addClass() {
		if(this._isMounted) {
			onScreen(this.svgContainer) ? 
			this.text.current.classList.add("svg-animate") :
			this.text.current.classList.remove("svg-animate")	
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}
	
	render() {
		return (
			<div className='svg-text-container' ref={this.svgContainer}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="100%"
				>
				<defs>
				{/*	<clipPath id="myClip">
						<text 
							className="svg-text-mask"
							y="98%"
							x="50%"
							textAnchor="middle">
								{this.props.title}
						</text>
					</clipPath>*/}

				</defs>
				<g clipPath="url(#myClip)"	>
			{/*	<rect
					ref={this.text}
					className="text-background"
				/>*/}
				<text 
					ref={this.text}
					className="svg-text-mask"
					y="98%"
					x="50%"
					fill="none"
					textAnchor="middle">
						{this.props.title}
				</text>
				</g>
			</svg>
		</div>
		);
	}
}
