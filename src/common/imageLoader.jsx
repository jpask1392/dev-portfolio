import React, { useState } from "react"
import { onScreen } from "./commonFunctions"
import LoadingIcon from "./loadingIcon.jsx"

const ImageLoader = props => {
	// can add the ability to change image size based on device being used

	const [loaded, setLoaded] = useState(false)

	// optimize image size based on screen size
	let imageSize = "-1x"
	if (window.innerWidth < 1100 && window.innerWidth > 800) {
		imageSize = "-2x"
	} else if (window.innerWidth <= 800) {
		imageSize = "-3x"
	}

	// only add image optimisation tag if not a gif
	let imagePath
	props.fileType === ".gif"
		? (imagePath = `${props.src}${props.fileType}`)
		: (imagePath = `${props.src}${imageSize}${props.fileType}`)

	const TestImage = new Image()
	TestImage.src = imagePath
	TestImage.onload = () => setLoaded(true)

	return loaded ? (
		<ImgFig src={imagePath} caption={props.caption} />
	) : (
		<span className='loading-icon-wrapper'>
			<LoadingIcon />
		</span>
	)
}

export default ImageLoader

const ImgFig = props => (
	<figure className=''>
		<img src={props.src} />
		<figcaption>{props.caption}</figcaption>
	</figure>
)
