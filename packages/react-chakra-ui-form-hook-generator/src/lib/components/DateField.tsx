import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from '@chakra-ui/react';
import { Datepicker, DatepickerInput } from 'react-chakra-ui-datepicker';
import { FieldValues, useController, useFormContext } from 'react-hook-form';
import { useStyles } from '../hooks/useStyles';
import { DateFieldSchema, FieldProps } from '../types/form';
import { Control } from './Control';

export const dateDefaultFormat = 'yyyy-MM-dd';

export const DateField = <T extends FieldValues>({
  name,
  field,
}: FieldProps<DateFieldSchema<T>>) => {
  const {
    defaultValue,
    placeholder,
    leftInputAddon,
    rightInputAddon,
    styles,
    rules,
    id,
    inputProps,
    datepickerProps,
  } = field;

  const fieldStyles = useStyles('dateField', {}, styles);

  const { control } = useFormContext();

  const { field: fieldControl } = useController({
    name,
    rules,
    defaultValue,
    control,
  });

  function renderInput() {
    return (
      <Input
        {...fieldStyles?.input}
        type="date"
        aria-label={name}
        placeholder={placeholder}
        data-testid={id}
        {...inputProps}
        {...fieldControl}
      />
    );
  }

  function renderDatepickerInput() {
    return (
      <Datepicker
        exactMinBookingDays
        minBookingDays={1}
        showSelectedDates={false}
        {...datepickerProps}
      >
        <DatepickerInput {...fieldControl} />
      </Datepicker>
    );
  }

  return (
    <Control {...field} name={name} styles={fieldStyles}>
      {!!leftInputAddon || rightInputAddon ? (
        <InputGroup {...fieldStyles?.inputGroup}>
          {!!leftInputAddon && <InputLeftAddon {...leftInputAddon} />}
          {renderInput()}
          {!!rightInputAddon && <InputRightAddon {...rightInputAddon} />}
        </InputGroup>
      ) : (
        renderDatepickerInput()
      )}
    </Control>
  );
};
