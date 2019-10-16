import React from "react"
import Portfolio from "./portfolio.jsx"
import { connect } from "react-redux"
import { onScreen } from "../common/commonFunctions"

class PortfolioContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
		}
	}

	componentDidMount = () => {
		fetch("/api/projects?limit=3")
			.then(response => response.json())
			.then(data => this.setState({ data }))
	}

	render() {
		let data = this.state.data
		let visible = this.props.visibleSection === "portfolio" ? true : false
		console.log("re-render")
		return (
			<div id='portfolio-container' ref={this.props.portfolioRefProp}>
				{data.length !== 0 ? (
					<Portfolio
						isVisible={visible}
						data={data}
						visibleProjectIndex={this.props.visibleProjectIndex}
						subText="RECENT WORK"
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
