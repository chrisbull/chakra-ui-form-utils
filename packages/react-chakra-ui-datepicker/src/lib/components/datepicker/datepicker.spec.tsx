import { render } from '@testing-library/react';
import React from 'react';
import '../../test/utils/jsdom-fixes';
import Datepicker from './datepicker';

describe('Datepicker', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Datepicker />);
    expect(baseElement).toBeTruthy();
  });
});
