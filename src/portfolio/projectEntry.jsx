import React from "react"
import { Route, Link } from "react-router-dom"
import styled, { keyframes } from "styled-components"
import ImageLoader from '../common/imageLoader.jsx'
 
export default class projectEntry extends React.Component {
	constructor(props) {
		super(props)
		this.imageSize = "-1x"
	}

	componentDidMount() {
		document.body.classList.add("no-scroll")

		setTimeout(() => {
			document.body.classList.remove("no-scroll")
		}, 1000)
	}

	render() {
		return (
			<div
				className='project-cont'
				style={{
					height: "100%",
					position: "relative",
					background: this.props.bkgColor
				}}>
				<div
					id='project-landing-container'
					className='dont-show'>
						<ImageLoader 
							src={this.props.data.mainImage["src"]}
							fileType={this.props.data.mainImage["fileType"]}
							w="100%"
						/> 
					</div>
			</div>
		)
	}
}
