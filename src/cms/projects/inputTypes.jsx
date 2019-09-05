import React from 'react';

export const Title = (props) => 
	props.mode === "edit" ?
	<div className="edit-container"> 
		<input 
			id="SecTitleInput"
			defaultValue={props.default.text}
			onChange={(e) => props.onChange(e)}/>
	</div> : 
	<p onDoubleClick={() => props.onClick()}>{props.default.text}</p>


export const Text = (props) => 
	props.mode === "edit" ?
	<div className="edit-container"> 
		<textarea 
			id="SecTextInput"
			defaultValue={props.default.text}
			onChange={(e) => props.onChange(e)}/>
	</div> : 
	<p onDoubleClick={() => props.onClick()}>{props.default.text}</p>


export const Image = (props) => 
	props.mode === "edit" ?
	<div className="edit-container"> 
		<input 
			id="SecImgInput"
			defaultValue={props.default.src}
			onChange={(e) => props.onChange(e)}/>
	</div> : 
	<p onDoubleClick={() => props.onClick()}>{props.default.src}</p>


export const Code = (props) => 
	props.mode === "edit" ?
	<div className="edit-container"> 
		<input 
			id="SecGistInput"
			defaultValue={props.default.gist}
			onChange={(e) => props.onChange(e)}/>
		<input 
			id="SecGistFileInput"
			defaultValue={props.default.file}
			onChange={(e) => props.onChange(e)}/>
	</div> : 
	<React.Fragment>
		<p onDoubleClick={() => props.onClick()}>{props.default.gist}</p>
		<p onDoubleClick={() => props.onClick()}>{props.default.file}</p>
	</React.Fragment>


export const DefaultType = (props) => 
	props.mode === "edit" ?
	<div className="edit-container"> 
		<input 
			defaultValue={props.default}
			onChange={(e) => props.onChange(e)}/>
	</div> : 
	<p onDoubleClick={() => props.onClick()}>{props.default}</p>



