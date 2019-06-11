import React from 'react';

export default class ImageLoader extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			width: 0,
			height: 0
		} 
	}

	componentDidMount() {
		const TestImage = new Image()

		TestImage.src = `${this.props.src}`

		// set width while keeping ratio

		TestImage.onload = () => {
			this.setState({loaded:true})
		}
	}

	render() {
		if(this.state.loaded) {
			return (
				<img
					src={`${this.props.src}`}
				/>
			)
		} else {
			return (
			<span style={{
				width: '400px',
				height: '100%',
				display:'inline-block',
				position: 'relative'
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
