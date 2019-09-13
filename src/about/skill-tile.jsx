import React from "react"

export default class SkillTile extends React.Component {
	constructor(props) {
		super(props)
		this.state = { flipped: false }
	}

	flipCard = () => {
		this.setState({ flipped: !this.state.flipped })
	}

	// Used to allow HTML markup in the JSON data storage file
	createMarkup = () => {
		return { __html: this.props.skillBack }
	}

	render() {
		return (
			<div className='skill-card' onClick={() => this.flipCard()}>
				<div
					className={
						this.state.flipped
							? "tile-container-inner flip"
							: "tile-container-inner"
					}
					ref={this.tileRef}>
					<div className='front'>
						<h3 className='sub-heading'>{this.props.skillName}</h3>
						<div>
							<img src={this.props.skillImage} />
						</div>
						<p>{this.props.skillSummary}</p>
					</div>

					<div className='back'>
						<h3>{this.props.skillName}</h3>

						<p dangerouslySetInnerHTML={this.createMarkup()}></p>
					</div>
				</div>
			</div>
		)
	}
}
