import React from "react"
import { Route, Link } from "react-router-dom"
import styled, { keyframes } from "styled-components"

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
		this.imageSizeCalculator()
		
	}

	// optimize image size depending on screen width
	imageSizeCalculator = () => {
		if (window.innerWidth < 1100 && window.innerWidth > 800) {
			this.imageSize = "-2x"
		} else if (window.innerWidth <= 800) {
			this.imageSize = "-3x"
		}
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
					className='dont-show'
					style={{
						backgroundImage:
							"url(/assets/" + 
							this.props.data.mainImage["src"] +
							this.imageSize +
							this.props.data.mainImage["fileType"]
					}}></div>
			</div>
		)
	}
}
