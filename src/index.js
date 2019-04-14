import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Navigation from './common/navigation.jsx';
import './common/common.scss';
import Home from './entry/home.jsx';
import Project from './portfolio/index.jsx';

import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
	render () {
		return (
		<Router>
			<div className='full-height'>
				<Navigation />
				<div id='page-container'>
						<Route path="/" exact component={Home} />
						<Route path="/:_id" exact render={(props) => {
							let projectId = props.location.pathname.replace('/', '');
							return (
								<Project projectId={projectId} /> 
							)
						}} />
				</div>
			</div>
		</Router>
		)
	}
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


