import React from "react"
import PropTypes from "prop-types"
import {
	Title,
	Text,
	Image,
	Code,
	SwaggerAPI,
	HeaderImage,
	DefaultType
} from "./inputTypes.jsx"
import EditModeButtons from "../common/editModeBtns.jsx"
import ViewModeButtons from "../common/viewModeBtns.jsx"

export default class Input extends React.Component {
	static propTypes = {
		projectData: PropTypes.object,
		header: PropTypes.string,
		defaultText: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		index: PropTypes.number,
		removable: PropTypes.bool,
		update: PropTypes.func,
		inputType: PropTypes.string
	}

	static defaultProps = {
		inputType: "text",
		removable: false
	}

	// this file should be for editing the local copy of the data only
	// the save button at the top can push the updated data to the database
	constructor(props) {
		super(props)
		this.state = {
			mode: "view",
			value: this.props.defaultText,
			projectData: {},
			targetID: null
		}
		this.onClick = this.onClick.bind(this)
		this.onConfirmEdit = this.onConfirmEdit.bind(this)
		this.moveUp = this.moveUp.bind(this)
		this.onChange = this.onChange.bind(this)
	}

	componentDidMount = () => {
		this.setState({ projectData: this.props.data })
	}

	// disable edit mode if user is not authorized
	onClick = () => {
		this.state.mode === "view"
			? this.setState({ mode: "edit" })
			: this.setState({ mode: "view" })
	}

	onChange = e => {
		this.setState({ value: e.target.value, targetID: e.target.id })
	}

	onConfirmEdit = () => {
		// update array
		// get current array
		let arr = this.props.data

		let prefix
		arr.sections === undefined ? (prefix = arr) : (prefix = arr.sections)
		// get the value of entered data
		let newValue = this.state.value
		// get the index of value if sections
		let index = this.props.index
		// update the array based on title passed through props
		// switch (this.props.header) {
		// 	case "Project Name":
		// 		arr.projectName = newValue
		// 		break
		// 	case "Position":
		// 		arr.position = newValue
		// 		break
		// 	case "Summary":
		// 		arr.summary = newValue
		// 		break
		// 	case "Github Link":
		// 		arr.githubLink = newValue
		// 		break
		// 	case "Background Color":
		// 		arr.bkgColor = newValue
		// 		break
		// 	default:
		// 		null
		// }

		// switch case based on inputID
		// switch (this.state.targetID) {
		// 	case "HeaderImgPathInput":
		// 		arr.mainImage.src = newValue
		// 		break
		// 	case "HeaderImgCapInput":
		// 		arr.mainImage.caption = newValue
		// 		break
		// 	case "HeaderImgFileTypeInput":
		// 		arr.mainImage.fileType = newValue
		// 		break
		// 	case "SecTitleInput":
		// 		prefix[index].text = newValue
		// 		break
		// 	case "SecTextInput":
		// 		prefix[index].text = newValue
		// 		break
		// 	case "SecImgInput":
		// 		prefix[index].src = newValue
		// 		break
		// 	case "SecImgFileTypeInput":
		// 		prefix[index].fileType = newValue
		// 		break
		// 	case "SecImgCapInput":
		// 		prefix[index].caption = newValue
		// 		break
		// 	case "SecGistInput":
		// 		prefix[index].gist = newValue
		// 		break
		// 	case "SecGistFileInput":
		// 		prefix[index].file = newValue
		// 		break
		// 	case "SecSwagOwnerInput":
		// 		prefix[index].swagOwner = newValue
		// 		break
		// 	case "SecSwagAPIInput":
		// 		prefix[index].swagAPI = newValue
		// 		break
		// 	case "SecSwagVersionInput":
		// 		prefix[index].swagVersion = newValue
		// 		break
		// 	default:
		// 		null
		// }
		// send the new array back to show component
		this.props.update(arr)
		// set the mode back to view
		this.setState({ mode: "view" })
	}

	onDelete = () => {
		const fullArr = this.props.data
		const index = this.props.index
		let arr
		if (this.props.data.sections === undefined) {
			arr = this.props.data
			arr.splice(index, 1)
			this.props.update(arr)
		} else {
			arr = this.props.data.sections
			arr.splice(index, 1)
			fullArr.sections = arr
			this.props.update(fullArr)
		}
	}

	moveUp = () => {
		// swap items with es6
		// [a, b] = [b, a]
		let fullArr = this.state.projectData
		let arr
		this.state.projectData.sections === undefined
			? (arr = this.props.data)
			: (arr = this.props.data.sections)

		const a = this.props.index
		const b = this.props.index - 1
		if (a > 0) {
			// perform swap
			;[arr[a], arr[b]] = [arr[b], arr[a]]
			this.state.projectData.sections === undefined
				? (fullArr = arr)
				: (fullArr.sections = arr)
			this.props.update(fullArr)
		}
	}

	moveDown = () => {
		let fullArr = this.state.projectData
		let arr
		this.state.projectData.sections === undefined
			? (arr = this.props.data)
			: (arr = this.props.data.sections)

		const a = this.props.index
		const b = this.props.index + 1
		if (a < arr.length - 1) {
			// perform swap
			;[arr[a], arr[b]] = [arr[b], arr[a]]
			this.props.data.sections === undefined
				? (fullArr = arr)
				: (fullArr.sections = arr)
			this.props.update(fullArr)
		}
	}

	render() {
		return (
            // 1. Render buttons
            // 2. Check amount of inputs required
            // 3. Render inputs
			<div>
				
				<EditModeButtons />
				<ViewModeButtons />

			</div>


		)
	}
}
