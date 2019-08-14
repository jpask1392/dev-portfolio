import React from 'react';

export default class ScrollPin extends React.Component {

	constructor(props) {
		super(props) 

		this.scrollPinRef = React.createRef()
	}

	// if at bottom of page - go back to top
	componentDidMount() {
		window.addEventListener("scroll", this.handleScroll) 
	}
	// add onclick button to go back to top

	handleScroll = () => {
		// if window scroll is at bottom 

	}

	render() {
		  return (
		    <svg 
		    	id="scroll-pin" 
		    	className="fade-out" 
		    	xmlns="http://www.w3.org/2000/svg" 
		    	width="66" 
		    	height="205.513" 
		    	viewBox="0 0 66 205.513"
		    	ref={this.scrollPinRef}
		    >
			  <g id="Group_55" data-name="Group 55" transform="translate(-132 -1613)">

			     <circle 
			     	id="pin-head" 
			     	transform="translate(132 1675)" 
			     	fill="none" 
			     	stroke="#2699fb"
			     	strokeWidth="10"
			     	cx="33"
			     	cy="33"
			     	r="28" 
			     	fill="none"
			     />

			    <line 
			    	id="pin-stem" 
			    	x2="1" 
			    	y2="78" 
			    	transform="translate(164.5 1740.5)" 
			    	fill="none" 
			    	stroke={(this.props.pinColor == "light") ? "white" : "black" } 
			    	strokeWidth="2"
			    />
			    <text 
			    	id="pin-text" 
			    	transform="translate(160 1659) rotate(90)" 
			    	fontFamily="Arial, Helvetica, sans-serif" 
			    	fill={(this.props.pinColor == "light") ? "white" : "black" } 
			    >
			    	<tspan 
			    		x="-45.795" 
			    		y="0"
			    	>
			    		Scroll
			    	</tspan>
			    </text>
			  </g>
			</svg>
		  )
	}
}

