import React from "react"
import PropTypes from "prop-types"

export default class GistDisplay extends React.Component {
	static propTypes = {
		gist: PropTypes.string.isRequired,
		file: PropTypes.string
	}

	constructor(props) {
		super(props)
		this.stylesheetAdded = false
		this.gist = props.gist
		this.file = props.file
		this.state = {
			loading: true,
			src: ""
		}
	}

	// JSONP = JSON with padding
	// makes a call with a script tag instead of using a HTTP request
	// this avoids a CORS issue
	componentDidMount = () => {
		var gistCallback = GistDisplay.nextGistCallback()
		// callback triggered once script tag callback recieved
		window[gistCallback] = gist => {
			this.setState({
				loading: false,
				src: gist.div
			})
			this.addStyleSheet(gist.stylesheet)
		}

		const domain = "https://gist.github.com/jpask1392/"
		let url = domain + this.gist + ".json?callback=" + gistCallback
		if (this.props.file) {
			url += `&file=${this.file}`
		}

		// add a script tag to the html head
		const script = document.createElement("script")
		script.type = "text/javascript"
		script.src = url
		document.head.appendChild(script)
	}

	// the gist callback also returns a stylesheet
	addStyleSheet = href => {
		if (!this.stylesheetAdded) {
			this.stylesheetAdded = true
			const link = document.createElement("link")
			link.type = "text/css"
			link.rel = "stylesheet"
			link.href = href
			document.head.appendChild(link)
		}
	}

	render() {
		return this.state.loading === true ? (
			<div></div>
		) : (
			<div
				style={{ tabSize: 4 }}
				dangerouslySetInnerHTML={{ __html: this.state.src }}
			/>
		)
	}
}

var gistCallbackId = 0
GistDisplay.nextGistCallback = () => "embed_gist_callback_" + gistCallbackId++
