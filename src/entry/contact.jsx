import React from "react"
import Form from "./form.jsx"

const Contact = props => (
	<React.Fragment>
		<div className='contact-text-container'>
			<div className='contact-inner-text-container'>
				<h2>Reach out :)</h2>
				<span>
					<h3
						style={{
							marginBottom: "30px",
							color: "lightGrey",
							display: "inline"
						}}>
						Download PDF Resum&eacute; Here
					</h3>
					<a
						onClick={() =>
							ga("send", {
								hitType: "event",
								eventCategory: "downloads",
								eventAction: "Portfolio downloaded",
								eventLabel: "Portfolio downloaded"
							})
						}
						style={{ color: "black" }}
						href='/assets/resume.pdf'
						download>
						<i
							className='fas fa-file-download'
							style={{ marginLeft: "20px" }}></i>
					</a>
				</span>
				<p>
					Thanks for taking the time to check out what I have to
					offer. If you have any questions about me or my capabilities
					please reach out. I’d be happy to answer any questions you
					may have
				</p>

				<h3 className='sub-heading'>Or check out the socials</h3>
				<p>
					<a href='https://github.com/jpask1392' target='_blank'>
						<i className='fab fa-github-square'></i>
					</a>
					<a
						href='https://www.linkedin.com/in/jamie-pask/'
						target='_blank'>
						<i className='fab fa-linkedin'></i>
					</a>
					<a
						href='https://www.instagram.com/jpaskart/'
						target='_blank'>
						<i className='fab fa-instagram'></i>
					</a>
				</p>
			</div>
		</div>

		<div className={`start contact-page ${props.isVisible ? "end" : ""}`}>
			<Form />
		</div>
	</React.Fragment>
)

export default Contact
