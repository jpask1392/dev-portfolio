import React 				from 'react';
import store 				from '../redux/store/index' 
import { withRouter, Link } from 'react-router-dom';

class DotNavigation extends React.Component {
	static propTypes = {
		// name: React.PropTypes.string,
	};

	constructor(props) {
		super(props);
	}

	goToProject = (i) => {
		var el = document.getElementsByClassName('project-container')[i]
		var location = window.scrollY + el.getBoundingClientRect().top + 1

		window.scrollTo({
			top: location,
			left: 0,
			behavior: 'smooth' 
		})
		
	}

	render() {
		let visibleIndex = store.getState().visibleProjectIndex
		let data = this.props.data

		return (
			<div 
				className={this.props.visible ? 
					"scroll-dots fixed fade-out" : 
					"scroll-dots fade-out"}>
						{data.map((project, i) => 
							<span 
								key={project['_id']}
								className={i === visibleIndex ? "active-dot" : ""}
								onClick={() => this.goToProject(i)}>
								<p className="tool-tip ">
									{
										data.length !== 0 ? 
										data[i]['projectName'] : 
										null
									}
								</p>
							</span>
						
						)}

				{this.props.location.pathname === '/' ? <ViewAllButton/> : null}

			</div>
		);
	}
}

export default withRouter(DotNavigation)

const ViewAllButton = () =>
	<div className="view-all-button">
		<Link to="/projects"><h3>View all</h3></Link>
	</div>
