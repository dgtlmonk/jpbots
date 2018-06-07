/* eslint "no-return-assign": 0 */

import React from 'react';
import {shallow} from 'enzyme';
import StatusMarker from '../StatusMarker'

describe('<StatusMarker />', () => {
  it('should render properly', () =>{
      expect(shallow(<StatusMarker />).length).toEqual(1)
  })

  describe('should have ', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<StatusMarker />)
    })

    it('default status of `none`', () =>{
      expect(wrapper.instance().props.status).toEqual('none')
    })

    it('default color of `#fff`', () =>{
      expect(wrapper.instance().props.color).toEqual('#fff')
    })

  })

  describe('should render ', () => {
    it('`active` when `status` props equals `active`', () => {
      const wrapper = shallow(<StatusMarker status="active" />)
      expect(wrapper.text()).toContain('active')
    });

    it('custom color based on `color` props', () => {
      const wrapper = shallow(<StatusMarker color="#eee" />)
      expect(wrapper.find('#badge')).toHaveStyle('color', '#eee');
    });

    it('custom color based on `color` props', () => {
      const wrapper = shallow(<StatusMarker color="#eee" />)
      expect(wrapper.find('#badge')).toHaveStyle('color', '#eee');
    });
  })

})
