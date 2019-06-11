import React from 'react';
import { Route, Link } from "react-router-dom";

export default class PageNotFound extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="message-sent-container">
		    	<div className="message-sent-inner">
			    	<b className="sub-heading">Error 404</b>
			    	<p>Oops! The page you are looking for was not found</p>
			    	<Link to='/'><b>Back to site</b></Link>
			    	<hr></hr>
		    	</div>
		    </div>
		);
	}
}
