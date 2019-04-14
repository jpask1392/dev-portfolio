import React from 'react';
import Img from 'react-image';

export default class ProjectHeaderImageComponent extends React.Component {
	static propTypes = {
		// name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="header-image-container">
				<Img 	src="../../assets/projects/architecture-portfolio/archPortfolioIphone.png"
						className='image'
				 />
			</div>
		);
	}
}
