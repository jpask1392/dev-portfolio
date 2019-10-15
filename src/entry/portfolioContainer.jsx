import React from "react"
import Portfolio2 from "./portfolio2.jsx"
import { connect } from "react-redux"
import { onScreen } from "../common/commonFunctions"

class PortfolioContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
			isVisible: false
		}
	}

	componentDidMount = () => {
		fetch("/api/projects?limit=3")
			.then(response => response.json())
			.then(data => this.setState({ data }))
	}

	componentDidUpdate = prevProps => {
		if (prevProps.visibleSection !== this.props.visibleSection) {
			this.setState(state => {
				if (this.props.visibleSection === "portfolio") {
					return { isVisible: true }
				} else if (state.isVisible) {
					return { isVisible: false }
				}
			})
		}
	}

	render() {
		let data = this.state.data
		let visible = this.state.isVisible

		return (
			<div id='portfolio-container' ref={this.props.portfolioRefProp}>
				{data.length !== 0 ? (
					<Portfolio2
						isVisible={visible}
						data={data}
						visibleProjectIndex={this.props.visibleProjectIndex}
					/>
				) : null}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	visibleProjectIndex: state.visibleProjectIndex
})

export default connect(mapStateToProps)(PortfolioContainer)
