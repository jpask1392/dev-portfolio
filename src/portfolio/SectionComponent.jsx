import React from 'react';
import './project.scss';
import SectionText from './sectionTextComponent.jsx';
import SvgText from './SvgTitleComponent.jsx';
import Carousel from './SectionsCarousel.jsx';



export default class Section extends React.Component {
	static propTypes = {
		// text: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="section-container">
				<div className="section-content-container">
					<SvgText title={this.props.title}/>
					<SectionText text={this.props.text} />
				</div>
				<div className="full-width-container">
					<Carousel />
				</div>
			</div>
		);
	}
}
