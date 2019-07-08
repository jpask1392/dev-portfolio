import React from 'react';
import {onScreen} from '../common/commonFunctions.js' 

export default class ImageLoader extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			width: 0,
			height: 0
		} 

		this.imageRef = React.createRef()
	}

	componentDidMount() {
		// GENERATE RANDOM NUMBER FOR OFFSET
		
		
		// LOAD IMAGE 
		const TestImage = new Image()

		TestImage.src = `${this.props.src}`

		TestImage.onload = () => {
			this.setState({loaded:true})
		}
	}

	render() {

		if(this.state.loaded) {
			return (
				<img
					className={this.props.className}
					src={`${this.props.src}`}
					ref={this.imageRef}
				/>

			)
		} else {
			return (
			<span 
			style={{
				width: '100%',
				height: '100%',
				display:'inline-block',
				position: 'relative',
				minHeight: "400px",
				background: 'white'
			}}>
				<img 
					src='../../assets/loader.gif'
					style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)'
					}}
				/>
			</span>

			)
		}
	}
}
