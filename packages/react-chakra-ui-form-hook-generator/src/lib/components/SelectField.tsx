import { Select } from '@chakra-ui/react';
import { FieldValues, useController, useFormContext } from 'react-hook-form';
import { useStyles } from '../hooks/useStyles';
import { FieldProps, SelectFieldSchema } from '../types/form';
import { Control } from './Control';

export const SelectField = <T extends FieldValues>({
  name,
  field,
}: FieldProps<SelectFieldSchema<T>>) => {
  const {
    id,
    defaultValue,
    options = [],
    styles = {},
    selectProps,
    rules,
    placeholder,
  } = field;

  const fieldStyles = useStyles('selectField', {}, styles);

  const { control } = useFormContext();

  const { field: fieldControl } = useController({
    name,
    defaultValue,
    control,
    rules,
  });

  return (
    <Control {...field} name={name} styles={fieldStyles}>
      <Select
        {...fieldStyles?.select}
        {...selectProps}
        id={id}
        data-testid={id}
        aria-label={name}
        placeholder={placeholder}
        {...fieldControl}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            aria-label={option.label || option.value}
          >
            {option.label || option.value}
          </option>
        ))}
      </Select>
    </Control>
  );
};
