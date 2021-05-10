import { Box } from '@chakra-ui/layout';
import React, { PropsWithChildren } from 'react';
import { DatepickerProvider } from '../../context/DatepickerContext';
import { useDatepicker, UseDatepickerProps } from '../../hooks/useDatepicker';
import DatepickerCalendar from '../datepicker-calendar/datepicker-calendar';
import { DatepickerDebugger } from '../DatepickerDebugger';

export interface DatepickerProps extends UseDatepickerProps {
  showDebugger?: boolean;
}

export function Datepicker({
  children,
  showDebugger,
  ...props
}: PropsWithChildren<DatepickerProps>) {
  const ctx = useDatepicker(props);

  return (
    <DatepickerProvider value={ctx}>
      {showDebugger && <DatepickerDebugger />}

      <Box position="relative" ref={ctx.datepickerWrapperRef}>
        {children}
        <Box position="relative">
          <DatepickerCalendar />
        </Box>
      </Box>
    </DatepickerProvider>
  );
}

export default Datepicker;
