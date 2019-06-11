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
		console.log(this.props.src)
		return (
			<div id="header-image-container" className="col rhs">
				<ImageLoader 
					src={`/assets/${this.props.src}`}
					/>
			</div>
		);
	}
}


