import React from 'react';
import SkillTile from './skill-tile.jsx'
import { shallow } from 'enzyme'


describe("<SkillTile />", () => {
	
	it("Renders without crashing", () => {
		shallow(<SkillTile />)
	})

	it("Toggles 'flipped' state from false to true, true to false", () => {

		const card = shallow(<SkillTile />)

		card.find('.skill-card').last().simulate('click')
		expect(card.state().flipped).toEqual(true)

		card.find('.skill-card').simulate('click')
		expect(card.state().flipped).toEqual(false)
	})

	it("adds className 'flip' when state is true", () => {

		const card = shallow(<SkillTile />)
		console.log(card.state())
		
	})


})
