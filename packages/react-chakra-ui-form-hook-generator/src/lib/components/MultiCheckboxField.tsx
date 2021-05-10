import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react';
import { FieldValues, useController, useFormContext } from 'react-hook-form';
import { useStyles } from '../hooks/useStyles';
import { FieldProps, MultiCheckboxFieldSchema } from '../types/form';
import { Control } from './Control';

export const MultiCheckboxField = <T extends FieldValues>({
  name,
  field,
}: FieldProps<MultiCheckboxFieldSchema<T>>) => {
  const { styles = {}, checkboxes, rules, defaultValue } = field;

  const fieldStyles = useStyles(
    'checkboxField',
    {
      checkboxGroup: {},
      checkboxStack: {
        spacing: 4,
        isInline: true,
      },
      control: {},
      label: {},
      helperText: {},
      errorMessage: {},
    },
    styles
  );

  const { control } = useFormContext();

  const {
    field: { ref, ...fieldControl },
  } = useController({
    name,
    rules,
    defaultValue,
    control,
  });

  return (
    <Control {...field} name={name} styles={fieldStyles}>
      <CheckboxGroup {...fieldControl}>
        <Stack {...fieldStyles.checkboxStack}>
          {checkboxes.map(({ label, value, id, checkboxProps }, i) => (
            <Checkbox
              {...checkboxProps}
              key={`${name}-${i}`}
              id={id}
              aria-label={label}
              value={value}
            >
              {label || value}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>
    </Control>
  );
};
