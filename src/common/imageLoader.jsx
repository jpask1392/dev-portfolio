import React, { useState } from "react"
import { onScreen } from "./commonFunctions"
import LoadingIcon from "./loadingIcon.jsx"

const ImageLoader = props => {
	// can add the ability to change image size based on device being used

	const [loaded, setLoaded] = useState(false)
	const TestImage = new Image()
	TestImage.src = props.src
	TestImage.onload = () => setLoaded(true)

	return loaded ? (
		<ImgFig src={props.src} caption={props.caption} />
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
