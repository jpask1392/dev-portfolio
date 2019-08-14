// Action Constants
import {
	UPDATE_VIS_PROJECT_INDEX,
	UPDATE_VIS_SECTION_INDEX
} from '../constants/action-types'

// Action Methods
import {
	updateVisProjectIndex,
	updateVisSectionIndex
} from '../actions/index'

const initialState = {
	visibleProjectIndex: 0,
	visibleSectionIndex: 0
}

export const rootReducer = (state = initialState, action) => {
	switch(action.type) {
		case UPDATE_VIS_PROJECT_INDEX: 
			return { ...state, visibleProjectIndex: action.payload }
		case UPDATE_VIS_SECTION_INDEX: 
			return { ...state, visibleSectionIndex: action.payload }
		default: 
			return state
	}
}