/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { InputProps } from '@chakra-ui/react';
import { END_DATE, FocusedInput, START_DATE } from '@datepicker-react/hooks';
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { InputValue, UseDatepickerControl } from '../../hooks/useDatepicker';
import { getStateStyle } from '../../styles';

export type DatepickerInputProps = {
  inputType?: FocusedInput;
  onChange?: (value: InputValue) => void;
  value?: InputValue;
  name: InputProps['name'];
  onBlur?: InputProps['onBlur'];
  onFocus?: InputProps['onFocus'];
  onClick?: InputProps['onClick'];
}; // & Omit<InputProps, 'onChange' | 'value'>;

export const useDatepickerInput = (
  control: UseDatepickerControl,
  { inputType = START_DATE, ...props }: DatepickerInputProps,
  ref: React.Ref<HTMLInputElement>
) => {
  const isEndDate = inputType === END_DATE;

  const {
    convertToDate,
    onDateSelect,
    endDate,
    startDate,
    convertToString,
    styles,
    focusedInput,
    inputSetFocused,
    endDateRef,
    startDateRef,
    setEndDate,
    setStartDate,
    exactMinBookingDays,
  } = control;

  const internalRef = isEndDate ? endDateRef : startDateRef;

  const { name, value } = props;

  const [inputValue, setInputValue] = useState(value);

  useImperativeHandle(internalRef, () => ({
    onResetDates() {
      setInputValue('');
    },
  }));

  const handleOnChange = useCallback(
    (value: string | undefined) => {
      setInputValue(value);

      const date = convertToDate(value);
      const dateString = convertToString(date);

      if (date) {
        if (exactMinBookingDays) {
          setStartDate(date);
          setEndDate(date);
        } else {
          isEndDate ? setEndDate(date) : setStartDate(date);
        }

        props.onChange?.(dateString);
      } else {
        if (exactMinBookingDays) {
          setStartDate(null);
          setEndDate(null);
        } else {
          isEndDate ? setEndDate(null) : setStartDate(null);
        }
      }
    },
    [
      convertToDate,
      convertToString,
      exactMinBookingDays,
      isEndDate,
      props,
      setEndDate,
      setStartDate,
    ]
  );

  const handleOnBlur = useCallback(() => {
    const date = convertToDate(inputValue);
    if (!date) setInputValue('');
  }, [convertToDate, inputValue]);

  // DatePicker changed the date
  useEffect(() => {
    const ctxDate = isEndDate ? endDate : startDate;

    const dateString = convertToString(ctxDate);

    if (ctxDate !== null) {
      setInputValue(dateString);
    }

    props.onChange?.(dateString || '');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  const controlProps = {
    ...props,
    value: inputValue,
    name: name || (isEndDate ? END_DATE : START_DATE),
    tabIndex: isEndDate && !startDate ? -1 : 0,
    style: getStateStyle(
      styles.inputComponentInput,
      inputType === focusedInput
    ),
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      handleOnChange(e.currentTarget.value);
    },
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
      props.onFocus?.(e);
      inputSetFocused(inputType);
    },
    onClick: (e: React.MouseEvent<HTMLInputElement>) => {
      props.onClick?.(e);
      inputSetFocused(inputType);
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
      props.onBlur?.(e);
      handleOnBlur();
    },
  };

  return {
    inputRef: ref,
    controlProps,
  };
};
