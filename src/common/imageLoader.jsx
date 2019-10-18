import React, { useState, useEffect } from "react"
import LoadingIcon from "./loadingIcon.jsx"

const ImageLoader = props => {
	const [loaded, setLoaded] = useState(false)
	// optimize image size based on screen size
	let imageSize = "-1x"
	if (window.innerWidth < 900 && window.innerWidth > 768) {
		imageSize = "-2x"
	}
	if (window.innerWidth < 768) {
		imageSize = "-3x"
	}

	// only add image optimisation tag if not a gif
	let imagePath
	props.fileType === ".gif"
		? (imagePath = `/assets/${props.src}${props.fileType}`)
		: (imagePath = `/assets/${props.src}${imageSize}${props.fileType}`)

	const TestImage = new Image()
	TestImage.src = imagePath
	TestImage.onload = () => {
		setLoaded(true)
	}

	return loaded ? (
		<figure>
			<img
				alt={props.caption || "No alt text supplied"}
				style={{ width: props.w, height: props.h }}
				src={`/assets/${props.src}-1x${props.fileType}`}
				srcSet={
					props.fileType !== ".gif"
						? `
							/assets/${props.src}-3x${props.fileType} 800w,
							/assets/${props.src}-2x${props.fileType} 1800w,
							/assets/${props.src}-1x${props.fileType} 4000w
						`
						: `
							/assets/${props.src}${props.fileType},
							/assets/${props.src}${props.fileType},
							/assets/${props.src}${props.fileType}
						`
				}
				sizes='
				(max-width: 768px) 100vw
				(max-width: 900px) 100vw,
				100vw
				'
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
