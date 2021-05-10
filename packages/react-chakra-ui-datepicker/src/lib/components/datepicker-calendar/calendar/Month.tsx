import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { CalendarDay, useMonth } from '@datepicker-react/hooks';
import React from 'react';
import { useDatepickerContext } from '../../../context/DatepickerContext';
import { Day } from './Day';

export interface MonthProps {
  year: number;
  month: number;
}

export const Month = ({ year, month }: MonthProps) => {
  const {
    dayLabelFormat,
    monthLabelFormat,
    weekdayLabelFormat,
    firstDayOfWeek,
    styles,
  } = useDatepickerContext();

  const { days, weekdayLabels, monthLabel } = useMonth({
    year,
    month,
    dayLabelFormat,
    monthLabelFormat,
    weekdayLabelFormat,
    firstDayOfWeek,
  });

  return (
    <Box {...styles.monthContainer}>
      <Flex {...styles.monthMonthLabel}>
        <Text>{monthLabel}</Text>
      </Flex>
      <SimpleGrid columns={7}>
        {weekdayLabels.map((weekdayLabel: string) => (
          <Flex key={weekdayLabel} {...styles.monthWeekdayLabel}>
            <Text>{weekdayLabel}</Text>
          </Flex>
        ))}
      </SimpleGrid>
      <SimpleGrid {...styles.monthDayGrid} columns={7}>
        {days.map((day: CalendarDay, index) => {
          return typeof day === 'object' ? (
            <Day
              key={`${day.dayLabel}-${index}`}
              date={day.date}
              day={day.dayLabel}
            />
          ) : (
            <div key={index} />
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default Month;
