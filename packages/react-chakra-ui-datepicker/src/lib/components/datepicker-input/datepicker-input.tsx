import { Input, InputProps } from '@chakra-ui/react';
import { FocusedInput } from '@datepicker-react/hooks';
import React, { forwardRef, Ref } from 'react';
import ReactInputMask from 'react-input-mask';
import { useDatepickerContext } from '../../context/DatepickerContext';
import { InputValue } from '../../hooks/useDatepicker';
import { useDatepickerInput } from './useDatepickerInput';

export type DatepickerInputProps = {
  inputType?: FocusedInput;
  onChange?: (value: InputValue) => void;
  value?: InputValue;
  name: InputProps['name'];
  onBlur?: InputProps['onBlur'];
  onFocus?: InputProps['onFocus'];
  placeholder?: string;
}; // & Omit<InputProps, 'onChange' | 'value'>;

export const DatepickerInput = forwardRef(
  (props: DatepickerInputProps, ref: Ref<HTMLInputElement>) => {
    const { control, ...ctx } = useDatepickerContext();
    const { controlProps, inputRef } = useDatepickerInput(control, props, ref);

    return (
      <Input
        ref={inputRef}
        as={ReactInputMask}
        mask={ctx.displayFormat.replace(/([yMd])/g, '9')}
        maskPlaceholder={ctx.maskPlaceholder}
        autoComplete="off"
        autoCorrect="off"
        {...controlProps}
      />
    );
  }
);

export default DatepickerInput;
