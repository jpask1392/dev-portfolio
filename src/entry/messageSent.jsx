import React from 'react';
import './contact.scss';
import { Route, Link } from "react-router-dom";

const MessageSent = (props) => {
  return (
    <div className="message-sent-container">
    	<div className="message-sent-inner">
	    	<b className="sub-heading">Thank you!</b>
	    	<p>Thanks for reaching out. Your message has been received and I will respond as soon as possible</p>
	    	<Link to='/'><b>Back to site</b></Link>
	    	<hr></hr>
    	</div>
    </div>
  )
}

export default MessageSent;