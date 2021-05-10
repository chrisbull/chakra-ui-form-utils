import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Box,
  CloseButton,
  Flex,
  HStack,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { END_DATE, MonthType, START_DATE } from '@datepicker-react/hooks';
import React, { useRef } from 'react';
import { useDatepickerContext } from '../../context/DatepickerContext';
import ActionButton from './calendar/ActionButton';
import Month from './calendar/Month';
import ResetDatesButton from './calendar/ResetDatesButton';
import SelectedDate from './calendar/SelectedDate';
import TodayButton from './calendar/TodayButton';

/* eslint-disable-next-line */
export interface DatepickerCalendarProps {
  showDatepicker?: boolean;
}

export const DatepickerCalendar = (props: DatepickerCalendarProps) => {
  const ctx = useDatepickerContext();
  const monthGridRef = useRef<HTMLDivElement>(null);

  const isMobile = useBreakpointValue({ base: true, md: false }) || false;
  const vertical = isMobile;

  function scrollTopToMonthGrid() {
    if (monthGridRef && monthGridRef.current && vertical) {
      monthGridRef.current.scrollTop = 0;
    }
  }

  function goToNextMonths() {
    ctx.goToNextMonths();
    scrollTopToMonthGrid();
  }

  function goToPreviousMonths() {
    ctx.goToPreviousMonths();
    scrollTopToMonthGrid();
  }

  return ctx.showDatepicker || props.showDatepicker ? (
    <Box position="absolute">
      <Box {...ctx.styles.datepickerContainer}>
        {ctx.showCloseButton && <CloseButton onClick={ctx.closeDatepicker} />}

        {ctx.showSelectedDates && (
          <Box mb={6}>
            <HStack data-testid="SelectedDatesGrid">
              <SelectedDate
                date={ctx.startDate}
                isFocused={ctx.focusedInput === START_DATE}
              />
              <Flex justifyContent="center" alignItems="center">
                <ArrowForwardIcon {...ctx.styles.arrowIcon} />
              </Flex>
              <SelectedDate
                isEndDate
                date={ctx.endDate}
                isFocused={ctx.focusedInput === END_DATE}
              />
            </HStack>
          </Box>
        )}
        <Box position="relative">
          <Stack
            overflow={vertical ? 'auto' : undefined}
            data-testid="MonthGrid"
            isInline={!vertical}
            ref={monthGridRef}
            padding={1}
            {...ctx.styles.monthsWrapper}
            onMouseLeave={() => {
              if (ctx.hoveredDate) {
                ctx.onDateHover(null);
              }
            }}
          >
            {ctx.activeMonths.map((month: MonthType, index) => (
              <Month
                key={`month-${month.year}-${month.month}-${index}`}
                year={month.year}
                month={month.month}
              />
            ))}
          </Stack>

          <Flex {...ctx.styles.datepickerFooter}>
            <HStack {...ctx.styles.buttonsWrapper}>
              <ActionButton
                direction={vertical ? 'up' : 'left'}
                onClick={goToPreviousMonths}
                aria-label="Previous month"
              />
              <ActionButton
                direction={vertical ? 'down' : 'right'}
                onClick={goToNextMonths}
                aria-label="Next month"
              />
            </HStack>
            <HStack {...ctx.styles.buttonsWrapper}>
              {ctx.showTodayButton && <TodayButton />}
              {ctx.showResetDates && <ResetDatesButton />}
            </HStack>
          </Flex>
        </Box>
      </Box>
    </Box>
  ) : null;
};

export default DatepickerCalendar;
