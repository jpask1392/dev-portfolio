import React 			from 'react';
import Background 		from '../common/background.jsx'
import SkillTile 		from './skill-tile.jsx'
import tileData 		from './skillsData.json'
import AboutSelfImage 	from './aboutSelfImage.jsx'
import ScrollPin 		from '../common/scrollPin.jsx'
import FooterBar 		from '../common/footerBar.jsx'
import { onScreen }		from '../common/commonFunctions'
import AboutLanding		from './aboutLanding.jsx'
import AboutMainSection from './aboutMainSection.jsx'
import ReferenceQuote 	from './referenceQuote.jsx'

export default class About extends React.Component {
	constructor(props) {
		super(props);

		this.landingRef = React.createRef();
		this.mainSectionRef = React.createRef();
		this.skillsRef = React.createRef();

		this.state = { 
			skills: tileData,
			pinLocation: "83.3333%",
			pinColor: "light",
			pinVisible: true
		}
	}

	componentDidMount = () => {
		document.title = "About | Jamie Pask"
		window.addEventListener("scroll", () => this.handleScroll())
	}

	handleScroll = () => {
		let condition = onScreen(this.landingRef, {elOffset: "top"})
		this.setState(() => condition ? { pinVisible: true } : { pinVisible: false })
	}

	componentWillUnmount = () => window.removeEventListener("scroll", this.handleScroll)

	render() {
		const bkgColors = {
			lightBackRefs: [this.mainSectionRef, this.skillsRef], 
			darkBackRefs: [this.landingRef]
		}

		let pinColor = this.state.pinColor
		let pinVisible = this.state.pinVisible
		let pinLoc = this.state.pinLocation
	
		return (
			<div style={{height:"100vh"}}>

				<Background colors={bkgColors}/> 

				{pinVisible ? <PinWrapper pinLocation={pinLoc} pinColor={pinColor}/> : null} 
				
				<AboutLanding Ref={this.landingRef}/>
				<div className="about-buffer"></div>

				<AboutMainSection mainSectionRef={this.mainSectionRef}/>

				<ReferenceQuote />

				<div className="skills-list-container" ref={this.skillsRef}>
					<h2>The skills</h2>
					<div className="skill-card-container">
						{this.state.skills.map((skill) => 
							<SkillTile 
								key={skill.skillName}
								skillName={skill.skillName}
								skillImage={skill.skillImage}
								skillSummary={skill.skillSummary}
								skillBack={skill.skillBack}/>
						)}
					</div>
				</div>

				<FooterBar linkTo="/contact"/>

			</div>
		);
	}
}

const PinWrapper = (props) => 
	<div id="pin-container" style={{left: props.pinLocation}}>
		<ScrollPin pinColor={props.pinColor}/>
	</div>
	
