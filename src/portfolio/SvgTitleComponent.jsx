import React, { Component } from 'react';

// PASS IN PROPS TO DISPLAY THE TEXT OUTLINE AND 
function SvgText(props) {

	return(
		<div className='svg-text-container'>
			<svg 
				xmlns="http://www.w3.org/2000/svg"
				width="100%"
				>
				<defs>

					<clipPath id="myClip">
						<text 
							stroke='black' 
							className="svg-text-mask"
							y="98%"
							x="50%"
							textAnchor="middle">
								{props.title}
						</text>
					</clipPath>

				</defs>
				<rect 
					width="100%" 
					height="100%" 
					y="50%"
					fill="none" 
					clipPath="url(#myClip)"	
				/>
				<text 
					stroke='black' 
					className="svg-text-mask"
					y="98%"
					x="50%"
					textAnchor="middle">
						{props.title}
				</text>
			</svg>
		</div>
	) 
};

export default SvgText;