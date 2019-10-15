// Action Constants
import {
	UPDATE_VIS_PROJECT_INDEX,
	UPDATE_VIS_SECTION_INDEX,
	UPDATE_HOME_VIS_SECTION
} from "../constants/action-types"

const initialState = {
	visibleProjectIndex: 0,
	visibleSectionIndex: 0
}

export const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_VIS_PROJECT_INDEX:
			return { ...state, visibleProjectIndex: action.payload }
		case UPDATE_VIS_SECTION_INDEX:
			return { ...state, visibleSectionIndex: action.payload }
		case UPDATE_HOME_VIS_SECTION:
			return { ...state, HomeVisSection: action.payload }
		default:
			return state
	}
}
