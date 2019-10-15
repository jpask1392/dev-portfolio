import {
	UPDATE_VIS_PROJECT_INDEX,
	UPDATE_VIS_SECTION_INDEX,
	UPDATE_HOME_VIS_SECTION
} from '../constants/action-types'

export const updateVisProjectIndex = index => ({ type: UPDATE_VIS_PROJECT_INDEX, payload: index })
export const updateVisSectionIndex = index => ({ type: UPDATE_VIS_SECTION_INDEX, payload: index })
export const updateHomeVisSection = sectionName => ({ type: UPDATE_HOME_VIS_SECTION, payload: sectionName })