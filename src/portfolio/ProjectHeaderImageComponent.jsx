import React from 'react';
import Img from 'react-image';
import ImageLoader from './imageLoader.jsx'

export default class ProjectHeaderImageComponent extends React.Component {
	static propTypes = {
		// name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
	
		return (
			<div id="header-image-container" className="col rhs">
				<h1 style={{
					fontSize:"150px",
					position:"absolute",
					transform:"rotate(-90deg) translateX(-110px)",
					transformOrigin:"left top",
					whiteSpace:"nowrap",
					bottom:"0",
					lineHeight:"100px",
					color:this.props.textColor()

				}}>{this.props.title}</h1>

				<ImageLoader 
					src={`/assets/${this.props.src}`}
					/>
			</div>
		);
	}
}

