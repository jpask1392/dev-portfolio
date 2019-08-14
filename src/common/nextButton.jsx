import React 		from 'react';
import { Link } 	from "react-router-dom";

const NextButton = (props) => {
  return (
    <Link 
    	to={props.linkTo} 
    	className="next-button-container">
    	<span style={{backgroundColor:props.backgroundColor}}></span>
    	<span style={{backgroundColor:props.backgroundColor}}></span>
    	<span style={{backgroundColor:props.backgroundColor}}></span>
    </Link>
  )
}

export default NextButton;