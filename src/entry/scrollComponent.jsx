import React from 'react';
import { CSSTransition } from 'react-transition-group';

export default class Scroll extends React.Component {
	_isMounted = false;

	constructor(props) {
		super(props);
		this.state = {scrolling: false, bottomOfPage: false}
		this.handleScroll = this.handleScroll.bind(this);
		this.scroll = 0;
	}

	// TRIGGER ON MOUNT
	componentDidMount() {
		this._isMounted = true;
		if(this._isMounted) {
			window.addEventListener('scroll', this.handleScroll);
		} 
	}

	// CONSTANTLY CHECK THE SCROLL LOCATION AND CHANGE THE STATE 
	checkLocation() {
		if((window.innerHeight + window.scrollY) >= document.body.scrollHeight){
			!this.state.bottomOfPage ?
			this.setState({bottomOfPage: true}):
			null
		} else {
			this.state.bottomOfPage ?
			this.setState({bottomOfPage: false}):
			null
		}
	}

	// HANDLE SCROLLING METHOD
	handleScroll() {
		if(this._isMounted) {
			this.setState({scrolling: true})
			// CLEAR TIMEOUT AFTER EVERY SCROLL
			window.clearTimeout(this.isScrolling) 
			// CREATE A TIMEOUT FOR RENMOVING SCROLL ARROW
			this.isScrolling = setTimeout(function(){
				this.setState({scrolling: false})
			}.bind(this), 500)
			this.checkLocation()
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
		window.clearTimeout(this.isScrolling)
	}

	render() {
		return(
		<ScrollDown 
			bottomOfPage={this.state.bottomOfPage} 
			scrolling={this.state.scrolling}
		/>
		)
	}
}


class ScrollDown extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
			<CSSTransition
				in={(!this.props.bottomOfPage & !this.props.scrolling) ? true : false}
				timeout={300}
				classNames="fade"
				enter={true}
				unmountOnExit
			>
				<div className="scroll-container">
						<i className="fas fa-long-arrow-alt-down"></i>
						<b>Scroll</b>
						<i className="fas fa-long-arrow-alt-down"></i>
				</div>
		    </CSSTransition>

			<CSSTransition
				in={this.props.bottomOfPage}
				timeout={300}
				classNames="alert"
				unmountOnExit
			>
				<div className="scroll-container">
					<i className="fas fa-long-arrow-alt-up"></i>
					<b>Scroll</b>
					<i className="fas fa-long-arrow-alt-up"></i>
				</div>
			</CSSTransition>
			</div>
		);
	}
}

