import React from 'react';
import { render } from '@testing-library/react';

import DatepickerCalendar from './datepicker-calendar';

describe('DatepickerCalendar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DatepickerCalendar />);
    expect(baseElement).toBeTruthy();
  });
});
