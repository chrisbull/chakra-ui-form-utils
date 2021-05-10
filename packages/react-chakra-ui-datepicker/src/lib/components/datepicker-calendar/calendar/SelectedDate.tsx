import { Stack, Text } from '@chakra-ui/react';
import { getInputValue } from '@datepicker-react/hooks';
import React from 'react';
import { useDatepickerContext } from '../../../context/DatepickerContext';
import { getStateStyle } from '../../../styles';

export interface SelectedDateProps {
  isFocused: boolean;
  isEndDate?: boolean;
  date: Date | null;
}

export const SelectedDate = ({
  isFocused,
  date,
  isEndDate,
}: SelectedDateProps) => {
  const { phrases, displayFormat, styles } = useDatepickerContext();

  return (
    <Stack {...getStateStyle(styles.selectDateContainer, isFocused)}>
      <Text {...getStateStyle(styles.selectDateText, isFocused)}>
        {isEndDate ? phrases.endDateLabel : phrases.startDateLabel}
      </Text>
      <Text {...getStateStyle(styles.selectDateDateText, isFocused)}>
        {getInputValue(
          date,
          displayFormat,
          isEndDate ? phrases.endDatePlaceholder : phrases.startDatePlaceholder
        )}
      </Text>
    </Stack>
  );
};

export default SelectedDate;
