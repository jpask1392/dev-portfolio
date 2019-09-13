import React from "react"

const AboutLanding = props => (
	<div className='about-landing-container'>
		<div ref={props.Ref} className='about-landing-text'>
			<div className='waving-hand'>
				<i className='far fa-hand-paper'></i>
			</div>
			<h2>
				I’m a web developer looking for opportunities to progress -
				Here’s a little more about my background / skills / life. Enjoy!
			</h2>
		</div>
	</div>
)

export default AboutLanding
