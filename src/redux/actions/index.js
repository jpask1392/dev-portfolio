import {
	UPDATE_VIS_PROJECT_INDEX,
	UPDATE_VIS_SECTION_INDEX
} from '../constants/action-types'

export const updateVisProjectIndex = index => ({ type: UPDATE_VIS_PROJECT_INDEX, payload: index })
export const updateVisSectionIndex = index => ({ type: UPDATE_VIS_SECTION_INDEX, payload: index })