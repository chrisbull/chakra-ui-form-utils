/* eslint-disable @typescript-eslint/no-empty-function */
import { useEventListener } from '@chakra-ui/react';
import {
  FirstDayOfWeek,
  FocusedInput,
  getInputValue,
  OnDatesChangeProps,
  parseDate,
  START_DATE,
  useDatepicker as useDatepickerHook,
} from '@datepicker-react/hooks';
import { useCallback, useRef, useState } from 'react';
import { DatepickerStyles, useStyles } from '../styles';
import {
  dayLabelFormatFn,
  defaultDisplayFormat,
  monthLabelFormatFn,
  weekdayLabelFormatFn,
} from '../utils/formatters';
import { DatepickerPhrases, datepickerPhrases } from '../utils/phrases';

export type InputValue = string | undefined;

interface UseDatepickerHooksProps {
  onDatesChange?(data: OnDatesChangeProps): void;
  minBookingDate?: Date;
  maxBookingDate?: Date;
  numberOfMonths?: number;
  minBookingDays?: number;
  exactMinBookingDays?: boolean;
  firstDayOfWeek?: FirstDayOfWeek;
  initialVisibleMonth?: Date;
  isDateBlocked?(date: Date): boolean;
  unavailableDates?: Date[];
  changeActiveMonthOnSelect?: boolean;

  // don't include these as they are managed in the state
  // startDate?: Date | null;
  // endDate?: Date | null;
  // focusedInput?: FocusedInput;
}

export interface UseDatepickerProps extends UseDatepickerHooksProps {
  overwriteDefaultStyles?: boolean;
  displayFormat?: string;
  phrases?: DatepickerPhrases;
  styles?: Partial<DatepickerStyles>;
  showCloseButton?: boolean;
  showSelectedDates?: boolean;
  showResetDates?: boolean;
  showTodayButton?: boolean;
  monthLabelFormat?: typeof monthLabelFormatFn;
  weekdayLabelFormat?: typeof weekdayLabelFormatFn;
  dayLabelFormat?: typeof dayLabelFormatFn;
  maskPlaceholder?: string;
  inputFormat?: string;
}

export interface DatepickerRefAttributes {
  onResetDates: () => void;
}

export const useDatepicker = (props: UseDatepickerProps) => {
  const {
    changeActiveMonthOnSelect,
    dayLabelFormat = dayLabelFormatFn,
    displayFormat = defaultDisplayFormat,
    exactMinBookingDays,
    firstDayOfWeek: firstDayOfWeekProp,
    initialVisibleMonth,
    isDateBlocked: isDateBlockedProp,
    maskPlaceholder = 'YYYY-MM-DD',
    maxBookingDate,
    minBookingDate,
    minBookingDays,
    monthLabelFormat = monthLabelFormatFn,
    numberOfMonths: numberOfMonthsProp = 1,
    onDatesChange: onDatesChangeProp = () => {},
    overwriteDefaultStyles = false,
    phrases = datepickerPhrases,
    showCloseButton = true,
    showResetDates = true,
    showSelectedDates = true,
    showTodayButton = true,
    styles: overrideStyles = {},
    unavailableDates,
    weekdayLabelFormat = weekdayLabelFormatFn,
  } = props;

  const styles = useStyles(overwriteDefaultStyles, overrideStyles);

  const datepickerRef = useRef<HTMLDivElement>();
  const datepickerWrapperRef = useRef<HTMLDivElement>();

  const [focusedInput, setFocusedInput] = useState<FocusedInput>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const startDateRef = useRef<DatepickerRefAttributes>();
  const endDateRef = useRef<DatepickerRefAttributes>();

  const closeDatepicker = useCallback(() => {
    setFocusedInput(null);
  }, []);

  useEventListener('click', (event) => {
    if (
      focusedInput !== null &&
      datepickerWrapperRef &&
      datepickerWrapperRef.current &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      !datepickerWrapperRef.current.contains(event.target as any)
    ) {
      closeDatepicker();
    }
  });

  function onDatesChange(data: OnDatesChangeProps) {
    setStartDate(data.startDate);
    setEndDate(data.endDate);
    setFocusedInput(data.focusedInput);

    // callback
    onDatesChangeProp(data);
  }

  const inputSetFocused = useCallback(
    (inputType: FocusedInput) => {
      const newFocusedInput = !startDate ? START_DATE : inputType;
      setFocusedInput(newFocusedInput);
    },
    [startDate]
  );

  const datepicker = useDatepickerHook({
    focusedInput,
    minBookingDate,
    maxBookingDate,
    startDate,
    endDate,
    minBookingDays,
    exactMinBookingDays,
    unavailableDates,
    changeActiveMonthOnSelect,
    initialVisibleMonth,
    onDatesChange: onDatesChange,
    firstDayOfWeek: firstDayOfWeekProp,
    numberOfMonths: numberOfMonthsProp,
    isDateBlocked: isDateBlockedProp,
  });

  const convertToDate = useCallback(
    (dateString: InputValue, formatter = displayFormat) => {
      if (!dateString) return null;
      const parsedDate = parseDate(dateString, formatter, new Date());
      return !Number.isNaN(parsedDate.getDate()) ? parsedDate : null;
    },
    [displayFormat]
  );

  const convertToString = useCallback(
    (date: Date | null, formatter = displayFormat) => {
      const dateString = getInputValue(date, formatter, '');
      return dateString.length > 0
        ? getInputValue(date, formatter, '')
        : undefined;
    },
    [displayFormat]
  );

  const onResetDates = useCallback(() => {
    datepicker.onResetDates();
    startDateRef.current?.onResetDates();
    endDateRef.current?.onResetDates();
  }, [datepicker]);

  const control = {
    onResetDates,
    changeActiveMonthOnSelect,
    dayLabelFormat,
    displayFormat,
    exactMinBookingDays,
    initialVisibleMonth,
    maskPlaceholder,
    maxBookingDate,
    minBookingDate,
    minBookingDays,
    monthLabelFormat,
    weekdayLabelFormat,
    overwriteDefaultStyles,
    phrases,
    showCloseButton,
    showResetDates,
    showSelectedDates,
    showTodayButton,
    styles,

    // created states
    closeDatepicker,
    convertToDate,
    convertToString,
    datepickerRef,
    datepickerWrapperRef,
    endDate,
    endDateRef,
    focusedInput,
    inputSetFocused,
    setEndDate,
    setStartDate,
    showDatepicker: !!focusedInput,
    startDate,
    startDateRef,

    onDateSelect: datepicker.onDateSelect,
  };

  return {
    datepicker,
    ...datepicker,
    control,
    ...control,
  };
};

export type UseDatepickerReturnType = ReturnType<typeof useDatepicker>;
export type UseDatepickerControl = UseDatepickerReturnType['control'];
