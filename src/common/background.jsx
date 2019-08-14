import React from 'react';
import {onScreen} from './commonFunctions.js'

export default class Background extends React.Component {
	// static propTypes = {
	// 	colors: React.PropTypes.Object,
	// };

	constructor(props) {
		super(props);
		this.state = {backgroundColor: ""}
		// console.log()
	}

	componentDidMount() {
		window.addEventListener("scroll", this.handleScroll)

		// console.log(this)
		
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll)
	}

	handleScroll = () => {

		const self = this
		const darkBackground = "#161517"
		const lightBackground = "white"

		if (this.props.colors !== undefined) {
			this.props.colors.lightBackRefs.forEach(function(ref) {

				if(onScreen(ref)) {
					self.setState({backgroundColor: lightBackground})
				}

			}) 

			this.props.colors.darkBackRefs.forEach(function(ref) {

				if(onScreen(ref)) {
					self.setState({backgroundColor: darkBackground})
				}

			}) 
		} else {
			this.setState({backgroundColor: darkBackground})
		}

	}


	render() {
		return (
			<div 
				className="background-color" 
				style={{background: this.state.backgroundColor}}>
			</div>
		);
	}
}
