import { Box, Button } from '@chakra-ui/react';
import { isEndDate, isStartDate, useDay } from '@datepicker-react/hooks';
import React, { useMemo, useRef } from 'react';
import { useDatepickerContext } from '../../../context/DatepickerContext';
import { DayState } from '../../../styles';

export interface OnDayRenderType {
  isFirst: boolean;
  isLast: boolean;
  isSelected: boolean;
  isWithinHoverRange: boolean;
  isSelectedStartOrEnd: boolean;
  disabledDate: boolean;
}

function getColor<T>(
  { isSelected, isWithinHoverRange, isFirst, isLast }: OnDayRenderType,
  { base, normal, rangeHover, selected, firstOrLast, first, last }: DayState<T>
) {
  let style = base;
  if (!isSelected && !isWithinHoverRange) style = { ...style, ...normal };
  if (isSelected) style = { ...style, ...selected };
  if (isWithinHoverRange) style = { ...style, ...rangeHover };
  if (isFirst || isLast) style = { ...style, ...firstOrLast };
  if (isFirst) style = { ...style, ...first };
  if (isLast) style = { ...style, ...last };
  return style;
}

interface DayProps {
  day: string;
  date: Date;
}

export function Day({ day, date }: DayProps) {
  const dayRef = useRef<any>(null);

  const {
    focusedDate,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateSelect,
    onDateFocus,
    onDateHover,
    startDate,
    endDate,
    styles,
  } = useDatepickerContext();

  const {
    onClick,
    onKeyDown,
    onMouseEnter,
    tabIndex,
    isSelectedStartOrEnd,
    isSelected,
    isWithinHoverRange,
    disabledDate,
  } = useDay({
    date,
    focusedDate,
    isDateFocused,
    isDateSelected,
    isDateHovered,
    isDateBlocked,
    isFirstOrLastSelectedDate,
    onDateFocus,
    onDateSelect,
    onDateHover,
    dayRef,
  });

  const isFirst = isStartDate(date, startDate);
  const isLast = isEndDate(date, endDate);

  const containerStyle = useMemo(
    () =>
      getColor(
        {
          isFirst,
          isLast,
          isSelected,
          isWithinHoverRange,
          isSelectedStartOrEnd,
          disabledDate,
        },
        styles.dayContainer
      ),
    [
      isFirst,
      isLast,
      isSelected,
      isWithinHoverRange,
      isSelectedStartOrEnd,
      disabledDate,
      styles,
    ]
  );

  const buttonStyle = useMemo(
    () =>
      getColor(
        {
          isFirst,
          isLast,
          isSelected,
          isWithinHoverRange,
          isSelectedStartOrEnd,
          disabledDate,
        },
        styles.day
      ),
    [
      isFirst,
      isLast,
      isSelected,
      isWithinHoverRange,
      isSelectedStartOrEnd,
      disabledDate,
      styles,
    ]
  );

  return (
    <Box {...containerStyle}>
      <Button
        {...buttonStyle}
        variant="unstyled"
        onClick={onClick}
        onKeyDown={onKeyDown}
        onMouseEnter={onMouseEnter}
        tabIndex={tabIndex}
        ref={dayRef}
        disabled={disabledDate}
        data-testid="Day"
        aria-label={`Day-${date.toDateString()}`}
        type="button"
      >
        {day}
      </Button>
    </Box>
  );
}
