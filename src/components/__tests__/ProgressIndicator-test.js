
/* eslint "no-template-curly-in-string":0 */
import React from 'react';
import { shallow, mount } from 'enzyme';
import ProgressIndicator from '../ProgressIndicator'

describe('<ProgressIndicator />', () => {
  const mockOnFinished = jest.fn(() => console.log('Progress finished handler'))
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ProgressIndicator handleOnProgressFinished={mockOnFinished} status="loading..." />)
  })

  it('renders without error', () => {
    expect(wrapper.length).toEqual(1)
  })

  describe('behavior ', () =>{
    it('sets status text based on state `status` value', () => {
      const status = "Extinguishing fire ...";

      wrapper.setState({ status });
      expect(wrapper.find('p')).toHaveText(status)
    })

    it('updates progress percent based on state `progress` value', () =>{
      wrapper.setState({ progress: 21 });
      expect(wrapper.find('Progress')).toHaveProp('percent', 21)
    })
  });


})
