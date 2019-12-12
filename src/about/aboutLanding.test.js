import React from 'react';
import AboutLanding from './aboutLanding'
import { shallow } from 'enzyme'

describe("<AboutLanding/>", () => {
    it("Renders without crashing", () => {
        shallow(<AboutLanding />)
    })
}) 