import { Box } from '@chakra-ui/react';
import React from 'react';
import { useDatepickerContext } from '../../context/DatepickerContext';
import pick from '../../utils/pick';

export function DatepickerDebugger() {
  const ctx = useDatepickerContext();

  return (
    <Box as="pre" fontSize="xs">
      {JSON.stringify(
        pick(ctx, [
          'showDatepicker',
          'displayFormat',
          'endDate',
          'focusedInput',
          'maskPlaceholder',
          'monthLabelFormat',
          'overwriteDefaultStyles',
          'showCloseButton',
          'showResetDates',
          'showSelectedDates',
          'startDate',
          'weekdayLabelFormat',
          'showTodayButton',
        ]),
        null,
        2
      )}
    </Box>
  );
}

export default DatepickerDebugger;
