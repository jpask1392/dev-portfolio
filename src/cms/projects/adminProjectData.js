export const generalDataArray = [
	{
		sectionHeading: "Project Name",
		refToDB: "projectName",
		inputs: [
			{
				textarea: false,
				inputID: "projectNameInput",
				title: "",
				refToDB: "projectName"
			}
		]
	},
	{
		sectionHeading: "Background Color",
		refToDB: "bkgColor",
		inputs: [
			{
				textarea: false,
				inputID: "bkgColorInput",
				title: "",
				refToDB: "bkgColor"
			}
		]
	},
	{
		sectionHeading: "Main Image",
		refToDB: "mainImage",
		inputs: [
			{
				textarea: false,
				inputID: "mainImageSrcInput",
				title: "Main Image Source",
				refToDB: "src"
			},
			{
				textarea: false,
				inputID: "mainImageFileTypeInput",
				title: "Main Image FileType",
				refToDB: "fileType"
			},
			{
				textarea: false,
				inputID: "mainImageCaptionInput",
				title: "Main Image Caption",
				refToDB: "caption"
			}
		]
	}
]

export const sectionDataDisplay = {
	title: {
		title: "Title",
		inputs: [
			{
				textarea: false,
				inputID: "mainImageSrcInput",
				title: "",
				refToDB: "text"
			}
		]
	},
	text: {
		title: "Text",
		inputs: [
			{
				inputID: "textInput",
				title: "",
				refToDB: "text",
				textarea: true
			}
		]
	},
	image: {
		title: "Image",
		inputs: [
			{
				inputID: "imageSrcInput",
				title: "Source",
				refToDB: "src",
				textarea: false
			},
			{
				inputID: "sdsd",
				title: "File Type",
				refToDB: "fileType",
				textarea: false
			},
			{
				inputID: "dsd",
				title: "Caption",
				refToDB: "caption",
				textarea: false
			}
		]
	},
	gistCode: {
		title: "Gist Code",
		inputs: [
			{
				inputID: "gistCodeInput",
				title: "Source",
				refToDB: "gist",
				textarea: false
			},
			{
				inputID: "fileNameInput",
				title: "File Type",
				refToDB: "file",
				textarea: false
			}
		]
	},
	swaggerAPI: {
		title: "Swagger API",
		inputs: [
			{
				inputID: "swagOwnerInput",
				title: "Owner",
				refToDB: "swagOwner",
				textarea: false
			},
			{
				inputID: "swagAPIInput",
				title: "API",
				refToDB: "swagAPI",
				textarea: false
			},
			{
				inputID: "swagVersionInput",
				title: "Version",
				refToDB: "swagVersion",
				textarea: false
			}
		]
	}
}