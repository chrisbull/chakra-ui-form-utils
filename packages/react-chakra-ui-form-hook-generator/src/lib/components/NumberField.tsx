import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { FieldValues, useController, useFormContext } from 'react-hook-form';
import { useStyles } from '../hooks/useStyles';
import { FieldProps, NumberFieldSchema } from '../types/form';
import { Control } from './Control';

export const NumberField = <T extends FieldValues>({
  name,
  field,
}: FieldProps<NumberFieldSchema<T>>) => {
  const {
    id,
    defaultValue,
    placeholder,
    styles,
    max,
    min,
    numberProps,
    rules,
  } = field;

  const fieldStyles = useStyles('numberField', {}, styles);

  const { control } = useFormContext();

  const { field: controlField } = useController({
    name,
    rules,
    defaultValue,
    control,
  });

  const { onChange } = controlField;

  return (
    <Control {...field} name={name} styles={fieldStyles}>
      <NumberInput
        {...fieldStyles?.numberInput}
        {...numberProps}
        id={id}
        data-testid={id}
        aria-label={name}
        placeholder={placeholder}
        min={min}
        max={max}
        {...controlField}
        onChange={(_, valueAsNumber) => {
          onChange(valueAsNumber);
        }}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </Control>
  );
};
