import React from 'react';

// Title components
export const Title = (props) => 
	props.mode === "edit" ?
	<div className="edit-container"> 
		<input 
			id="SecTitleInput"
			defaultValue={props.default.text}
			onChange={(e) => props.onChange(e)}/>
	</div> : 
	<p onDoubleClick={() => props.onClick()}>{props.default.text}</p>

// used when creating a new project
export const TitleInput = (props) => 
	<dl>
		<dt>Title</dt>
		<dd><input id="SecTitleInput" name="title"></input></dd>
	</dl>


// Text components
export const Text = (props) => 
	props.mode === "edit" ?
	<div className="edit-container"> 
		<textarea 
			id="SecTextInput"
			defaultValue={props.default.text}
			onChange={(e) => props.onChange(e)}/>
	</div> : 
	<p onDoubleClick={() => props.onClick()}>{props.default.text}</p>

export const TextInput = (props) =>
	<dl>
		<dt>Text</dt>
		<dd><textarea id="SecTextInput" name="text"></textarea></dd>
	</dl>


export const Image = (props) => 
	props.mode === "edit" ?
	<div className="edit-container"> 
		<input 
			id="SecImgInput"
			defaultValue={props.default.src}
			onChange={(e) => props.onChange(e)}/>
		<input 
			id="SecImgCapInput"
			defaultValue={props.default.caption}
			onChange={(e) => props.onChange(e)}/>
	</div> : 
	<React.Fragment>
	<p onDoubleClick={() => props.onClick()}>{props.default.src}</p>
	<p onDoubleClick={() => props.onClick()}>{props.default.caption}</p>
	</React.Fragment>

export const ImageInput = (props) =>
	<dl>
		<dt>Source path</dt>
		<dd><input id="SecImgInput" name="imgSrc"></input></dd>
		<dt>Caption (Optional)</dt>
		<dd><input id="SecImgCapInput" name="imgCaption"></input></dd>
	</dl>


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


export const GistInput = (props) =>
	<dl>
		<dt>Gist Id</dt>
		<dd><input id="SecGistInput" name="gistId"></input></dd>
		<dt>File (Optional)</dt>
		<dd><input id="SecGistFileInput" name="gistFile"></input></dd>
	</dl>


export const DefaultType = (props) => 
	props.mode === "edit" ?
	<div className="edit-container"> 
		<input 
			defaultValue={props.default}
			onChange={(e) => props.onChange(e)}/>
	</div> : 
	<p onDoubleClick={() => props.onClick()}>{props.default}</p>


