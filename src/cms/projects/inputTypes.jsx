import React from "react"

// Title components
export const Title = props =>
	props.mode === "edit" ? (
		<div className='edit-container'>
			<input
				id='SecTitleInput'
				defaultValue={props.default.text}
				onChange={e => props.onChange(e)}
			/>
		</div>
	) : (
		<p onDoubleClick={() => props.onClick()}>{props.default.text}</p>
	)

// used when creating a new project
export const TitleInput = props => (
	<dl>
		<dt>Title</dt>
		<dd>
			<input id='SecTitleInput' name='title'></input>
		</dd>
	</dl>
)

// Text components
export const Text = props =>
	props.mode === "edit" ? (
		<div className='edit-container'>
			<textarea
				id='SecTextInput'
				defaultValue={props.default.text}
				onChange={e => props.onChange(e)}
			/>
		</div>
	) : (
		<p onDoubleClick={() => props.onClick()}>{props.default.text}</p>
	)

export const TextInput = props => (
	<dl>
		<dt>Text</dt>
		<dd>
			<textarea id='SecTextInput' name='text'></textarea>
		</dd>
	</dl>
)

export const Image = props =>
	props.mode === "edit" ? (
		<div className='edit-container'>
			<input
				id='SecImgInput'
				defaultValue={props.default.src}
				onChange={e => props.onChange(e)}
			/>
			<input
				id='SecImgCapInput'
				defaultValue={props.default.caption}
				onChange={e => props.onChange(e)}
			/>
			<input
				id='SecImgFileTypeInput'
				defaultValue={props.default.fileType}
				onChange={e => props.onChange(e)}
			/>
		</div>
	) : (
		<div>
			<b>Image Path</b>
			<p onDoubleClick={() => props.onClick()}>{props.default.src}</p>
			<b>File Extension</b>
			<p onDoubleClick={() => props.onClick()}>
				{props.default.fileType}
			</p>
			<b>Caption</b>
			<p onDoubleClick={() => props.onClick()}>{props.default.caption}</p>
		</div>
	)

export const ImageInput = props => (
	<dl>
		<dt>Source path</dt>
		<dd>
			<input id='SecImgInput' name='imgSrc'></input>
		</dd>
		<dt>File extension</dt>
		<dd>
			<input id='SecImgFileTypeInput' name='imgFileType'></input>
		</dd>
		<dt>Caption (Optional)</dt>
		<dd>
			<input id='SecImgCapInput' name='imgCaption'></input>
		</dd>
	</dl>
)

export const HeaderImage = props =>
	props.mode === "edit" ? (
		<div className='edit-container'>
			<dt>Image src</dt>
			<input
				id='HeaderImgPathInput'
				defaultValue={props.default.src}
				onChange={e => props.onChange(e)}
			/>
			<dt>File type</dt>
			<input
				id='HeaderImgFileTypeInput'
				defaultValue={props.default.fileType}
				onChange={e => props.onChange(e)}
			/>
			<dt>Caption</dt>
			<input
				id='HeaderImgCapInput'
				defaultValue={props.default.caption}
				onChange={e => props.onChange(e)}
			/>
		</div>
	) : (
		<div>
			<b>Image Path</b>
			<p onDoubleClick={() => props.onClick()}>
				{props.default.src}
			</p>
			<b>File Extension</b>
			<p onDoubleClick={() => props.onClick()}>
				{props.default.fileType}
			</p>
			<b>Caption</b>
			<p onDoubleClick={() => props.onClick()}>{props.default.caption}</p>
		</div>
	)

export const HeaderImageInput = props => (
	<dl>
		<dt>Source path</dt>
		<dd>
			<input id='SecImgInput' name='imgSrc'></input>
		</dd>
		<dt>File extension</dt>
		<dd>
			<input id='SecImgFileTypeInput' name='imgFileType'></input>
		</dd>
		<dt>Caption (Optional)</dt>
		<dd>
			<input id='SecImgCapInput' name='imgCaption'></input>
		</dd>
	</dl>
)

export const Code = props =>
	props.mode === "edit" ? (
		<div className='edit-container'>
			<input
				id='SecGistInput'
				defaultValue={props.default.gist}
				onChange={e => props.onChange(e)}
			/>
			<input
				id='SecGistFileInput'
				defaultValue={props.default.file}
				onChange={e => props.onChange(e)}
			/>
		</div>
	) : (
		<React.Fragment>
			<p onDoubleClick={() => props.onClick()}>{props.default.gist}</p>
			<p onDoubleClick={() => props.onClick()}>{props.default.file}</p>
		</React.Fragment>
	)

export const GistInput = props => (
	<dl>
		<dt>Gist Id</dt>
		<dd>
			<input id='SecGistInput' name='gistId'></input>
		</dd>
		<dt>File (Optional)</dt>
		<dd>
			<input id='SecGistFileInput' name='gistFile'></input>
		</dd>
	</dl>
)
export const SwaggerAPI = props =>
	props.mode === "edit" ? (
		<div className='edit-container'>
			<input
				id='SecSwagOwnerInput'
				defaultValue={props.default.swagOwner}
				onChange={e => props.onChange(e)}
			/>
			<input
				id='SecSwagAPIInput'
				defaultValue={props.default.swagAPI}
				onChange={e => props.onChange(e)}
			/>
			<input
				id='SecSwagVersionInput'
				defaultValue={props.default.swagVersion}
				onChange={e => props.onChange(e)}
			/>
		</div>
	) : (
		<React.Fragment>
			<p onDoubleClick={() => props.onClick()}>
				{props.default.swagOwner}
			</p>
			<p onDoubleClick={() => props.onClick()}>{props.default.swagAPI}</p>
			<p onDoubleClick={() => props.onClick()}>
				{props.default.swagVersion}
			</p>
		</React.Fragment>
	)

export const SwaggerApiInput = props => (
	<dl>
		<dt>Owner</dt>
		<dd>
			<input id='SecSwagOwnerInput' name='SwagOwner'></input>
		</dd>
		<dt>API</dt>
		<dd>
			<input id='SecSwagAPIInput' name='SwagAPI'></input>
		</dd>
		<dt>Version</dt>
		<dd>
			<input id='SecSwagVersionInput' name='SwagVersion'></input>
		</dd>
	</dl>
)

export const DefaultType = props =>
	props.mode === "edit" ? (
		<div className='edit-container'>
			<input
				defaultValue={props.default}
				onChange={e => props.onChange(e)}
			/>
		</div>
	) : (
		<p onDoubleClick={() => props.onClick()}>{props.default}</p>
	)
