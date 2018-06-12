/* eslint "no-return-assign": 0 */

import React from 'react';
import {shallow} from 'enzyme';
import StatusMarker from '../StatusMarker'

describe('<StatusMarker /> Component ', () => {
  describe('when rendered', () => {
    it('then it should run without error', () =>{
      expect(shallow(<StatusMarker />).length).toEqual(1)
    })
  })

  describe('when rendered without props', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<StatusMarker />)
    })

    it('then it should have default status text of `none`', () =>{
      expect(wrapper.instance().props.status).toEqual('none')
    })

    it('and it should have default marker color of `#fff`', () =>{
      expect(wrapper.instance().props.color).toEqual('#fff')
    })

  })

  describe('when rendered with custom props', () => {
    it('then it should display custom status text', () => {
      const wrapper = shallow(<StatusMarker status="active" />)
      expect(wrapper.text()).toContain('active')
    });

    it('and it should have a custom marker color', () => {
      const wrapper = shallow(<StatusMarker color="#eee" />)
      expect(wrapper.find('#badge')).toHaveStyle('color', '#eee');
    });

  })

})
