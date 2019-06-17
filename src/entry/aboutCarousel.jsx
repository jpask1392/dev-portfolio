import React from 'react';

export default class AboutCarousel extends React.Component {
	
	constructor(props) {
		super(props);

		this.state = {index: 0} 
	}

	render() {
		return (
			<div>
				<h2></h2>
				<b>Date here </b>
				<hr></hr>
				
				<Slide>
				</Slide>
			</div>
		);
	}
}



const Slide = (props) => {
  return (
    <div>
    	{this.props.children}
    </div>
  )
}


