import React 		from 'react';
import {onScreen} 	from './commonFunctions.js'
import PropTypes 	from 'prop-types'

export default class Background extends React.Component {
	
	static propTypes = {
		colors: PropTypes.object,
	};

	static defaultProps = {
		colors: { lightBackRefs: [], darkBackRefs: [] }
	}

	constructor(props) {
		super(props);
		this.state = { backgroundColor: "" }
	}

	componentDidMount = () => window.addEventListener("scroll", this.handleScroll)		

	handleScroll = () => {

		const darkBackground = "#161517"
		const lightBackground = "white"
		const lightBackRefs = this.props.colors.lightBackRefs
		const darkBackRefs = this.props.colors.darkBackRefs


		lightBackRefs.map((ref) => {
			this.setState(() => onScreen(ref) ? {backgroundColor: lightBackground} : null)
		})

		darkBackRefs.map((ref) => {
			this.setState(() => onScreen(ref) ? {backgroundColor: darkBackground} : null)
		})
	}

	componentWillUnmount = () => window.removeEventListener("scroll", this.handleScroll)

	render() {
		return (
			<div 
				className="background-color" 
				style={{background: this.state.backgroundColor, zIndex: "-100"}}>
			</div>
		);
	}
}
