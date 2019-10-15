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
		? (imagePath = `/assets/${props.src}${props.fileType}`)
		: (imagePath = `/assets/${props.src}${imageSize}${props.fileType}`)

	const TestImage = new Image()
	TestImage.src = imagePath
	TestImage.onload = () => setLoaded(true)

	return loaded ? (
		<figure>
			<img
				style={{ width: "100%" }}
				srcSet={
					props.fileType !== ".gif"
						? `
							/assets/${props.src}-1x${props.fileType} 900w,
							/assets/${props.src}-2x${props.fileType} 600w,
							/assets/${props.src}-3x${props.fileType} 320w
						`
						: `
							/assets/${props.src}${props.fileType} 900w,
							/assets/${props.src}${props.fileType} 600w,
							/assets/${props.src}${props.fileType} 320w
						`
				}
			/>
			<figcaption>{props.caption}</figcaption>
		</figure>
	) : (
		<span className='loading-icon-wrapper'>
			<LoadingIcon />
		</span>
	)
}

export default ImageLoader
