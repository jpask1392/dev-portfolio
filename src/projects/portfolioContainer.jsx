import React from "react"
import Portfolio from "../entry/portfolio.jsx"
import { connect } from "react-redux"

class PortfolioContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
		}
	}

	componentDidMount = () => {
		document.title = `Projects | Jamie Pask`
		fetch("/api/projects")
			.then(response => response.json())
			.then(data => this.setState({ data }))
	}

	render() {
		let data = this.state.data

		return (
			<div id='portfolio-container'>
				{data.length !== 0 ? (
					<Portfolio
						isVisible={true}
						data={data}
						visibleProjectIndex={this.props.visibleProjectIndex}
						subText="ALL PROJECTS"
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
