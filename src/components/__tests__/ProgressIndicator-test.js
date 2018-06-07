
import React from 'react';
import { shallow } from 'enzyme';
import ProgressIndicator from '../ProgressIndicator'

describe('<ProgressIndicator />', () => {
  const mockOnFinished= jest.fn();

  it('should render properly', () => {
    expect(shallow(<ProgressIndicator handleOnProgressFinished={mockOnFinished} status="loading..." /> ).length).toEqual(1)
  })

})
