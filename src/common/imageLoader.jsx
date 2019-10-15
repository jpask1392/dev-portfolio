import React, { useState, useEffect } from "react"
import { onScreen } from "./commonFunctions"
import LoadingIcon from "./loadingIcon.jsx"

const ImageLoader = props => {
	const [loaded, setLoaded] = useState(false)

	// optimize image size based on screen size
	let imageSize = "-1x"
	window.innerWidth < 1100 && window.innerWidth > 800
		? (imageSize = "-2x")
		: (imageSize = "-3x")

	// only add image optimisation tag if not a gif
	let imagePath
	props.fileType === ".gif"
		? (imagePath = `${props.src}${props.fileType}`)
		: (imagePath = `${props.src}${imageSize}${props.fileType}`)

	const TestImage = new Image()
	TestImage.src = imagePath
	TestImage.onload = () => setLoaded(true)

	// var src = props.src

	return loaded ? (
		<figure>
			<ImgFig
				src={props.src}
				fileType={props.fileType}
				caption={props.caption}
			/>
		</figure>
	) : (
		<span className='loading-icon-wrapper'>
			<LoadingIcon />
		</span>
	)
}

export default ImageLoader

const ImgFig = props => (
	<figure>
		<img
			src={props.src}
			srcSet={`
			${props.src}-1x${props.fileType} 900w,
			${props.src}-2x${props.fileType} 600w,
			${props.src}-3x${props.fileType} 320w
		`}
		/>
		<figcaption>{props.caption}</figcaption>
	</figure>
)
