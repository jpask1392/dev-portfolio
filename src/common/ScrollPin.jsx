import React from 'react';

export default class ScrollPin extends React.Component {

	constructor(props) {
		super(props) 
		this.scrollPinRef = React.createRef()
		this.state = { atBottom: false } 
	}

	componentDidMount = () => window.addEventListener("scroll", this.handleScroll) 

	handleScroll = () => {
		// if window scroll is at bottom 
		let atBase = (window.scrollY + window.innerHeight === document.body.scrollHeight)
		this.setState(() => atBase ? { atBottom: true } : { atBottom: false })
	}

	componentWillUnmount = () => window.removeEventListener("scroll", this.handleScroll)

	render() {
		return (
			<div id="scroll-pin-wrapper">
				{this.state.atBottom === true ? 
				<BackToTop pinColor={this.props.pinColor}/> : 
				<Scroll pinColor={this.props.pinColor}/>}
				<svg 
					id="scroll-pin" 
					className="fade-out" 
					xmlns="http://www.w3.org/2000/svg" 
					width="66" 
					height="138.49" 
					viewBox="0 0 66 138.49">

					<g id="Group_55" data-name="Group 55" transform="translate(-132 -1670.023)">

					<circle 
						id="pin-head" 
						transform="translate(132 1675)" 
						fill="none" 
						stroke="#2699fb"
						strokeWidth="10"
						cx="33"
						cy="33"
						r="28"/>

					<line 
						id="pin-stem" 
						x2="1" 
						y2="78" 
						transform="translate(164.5 1740.5)" 
						fill="none" 
						stroke={this.props.pinColor === "light" ? "white" : "black" } 
						strokeWidth="2"/>

					</g>
				</svg>
			</div>
		)
	}
}

const BackToTop = (props) => 
	<span 
		onClick={() => window.scrollTo({top:0, left:0, behavior:"smooth"})} 
		style={{cursor:"pointer"}}>
		<h3 style={props.pinColor === "light" ? {color:"white"} : {color:"black"}}>
			Back to Top</h3>
	</span>

const Scroll = (props) => 
	<span>
		<h3 style={props.pinColor === "light" ? {color:"white"} : {color:"black"}}>Scroll</h3>
	</span>

