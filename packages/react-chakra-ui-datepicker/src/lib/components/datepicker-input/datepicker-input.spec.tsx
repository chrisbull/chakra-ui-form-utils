import React from 'react';
import { render } from '@testing-library/react';

import DatepickerInput from './datepicker-input';

describe('DatepickerInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DatepickerInput />);
    expect(baseElement).toBeTruthy();
  });
});
