import React from 'react';
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
			<div 
				className="section-container"
				style={this.props.index%2 == 0 ? {backgroundColor:"", paddingBottom:"25px"} : {background:"white"}}
			>
				<div className="section-content-container container-max">
					<span style={{float:"left", width:"30%"}}>
						<h1>{this.props.title}</h1>
						<hr></hr>
					</span>
					<SectionText text={this.props.text} />
				</div>
				<div className="full-width-container">
					<Carousel images={this.props.images}/>
				</div>
			</div>
		);
	}
}
