import { Checkbox } from '@chakra-ui/react';
import { FieldValues, useController, useFormContext } from 'react-hook-form';
import { useStyles } from '../hooks/useStyles';
import { CheckboxFieldSchema, FieldProps } from '../types/form';
import { Control } from './Control';

export const CheckboxField = <T extends FieldValues>({
  name,
  field,
}: FieldProps<CheckboxFieldSchema<T>>) => {
  const {
    id,
    styles = {},
    checkboxProps,
    defaultChecked,
    defaultValue,
    label,
    rules,
  } = field;

  const fieldStyles = useStyles('checkboxField', {}, styles);

  const { control } = useFormContext();

  const { field: fieldControl } = useController({
    control,
    name,
    rules,
    defaultValue,
  });

  return (
    <Control {...field} name={name} styles={fieldStyles} hideLabel>
      <Checkbox
        {...checkboxProps}
        aria-label={label}
        id={id}
        data-testid={id}
        defaultChecked={defaultChecked}
        {...fieldControl}
      >
        {label || name}
      </Checkbox>
    </Control>
  );
};
