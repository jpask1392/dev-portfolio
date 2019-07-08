import React from 'react';


export default class FullPageNav extends React.Component {

	constructor(props) {
		super(props);
	}

	HandleScroll = async (e, location) => {

		e.preventDefault();

		switch(location) {
			case "about":
				window.scrollTo({	
					left: 0, 
					top: this.props.aboutRefProp.current.offsetTop, 
					behavior: 'smooth'
				})
				break;
			case "portfolio":
				window.scrollTo({
					left: 0, 
					top: this.props.portfolioRefProp.current.offsetTop,
					behavior: 'smooth'
				});
				break;
			case "contact":
				window.scrollTo({
					left: 0, 
					top: this.props.contactRefProp.current.offsetTop,
					behavior: 'smooth'
				});
				break;
		}

		this.props.active()
	}

	render() {
		return (
			<div className="full-page-nav">
				<div id="nav-list">
					<nav>
						<ul>
							<li><a href="#" onClick={() => this.props.active()}><h1>Home</h1></a></li>
							<li><h1 className="slash"></h1></li>
							<li><a href="#" onClick={(e) => this.HandleScroll(e, "about")}><h1>About</h1></a></li>
							<li><h1 className="slash"></h1></li>
							<li><a href="#" onClick={(e) => this.HandleScroll(e, "portfolio")}><h1>Projects</h1></a></li>
							<li><h1 className="slash"></h1></li>
							<li><a href="#" onClick={(e) => this.HandleScroll(e, "contact")}><h1>Contact</h1></a></li>
						</ul>
					</nav>
				</div>
			</div>
		);
	}
}



