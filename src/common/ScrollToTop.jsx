import React from "react"
import { withRouter } from "react-router"

class ScrollToTop extends React.Component {
	componentDidUpdate(prevProps) {
		if (this.props.location.pathname !== prevProps.location.pathname) {
			window.scrollTo({ top: 0, left: 0, behavior: "auto" })
		}
	}

	render() {
		return this.props.children
	}
}

export default withRouter(ScrollToTop)
