import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { FieldValues, useController, useFormContext } from 'react-hook-form';
import { useStyles } from '../hooks/useStyles';
import { FieldProps, RadioFieldSchema } from '../types/form';
import { Control } from './Control';

export const RadioField = <T extends FieldValues>({
  name,
  field,
}: FieldProps<RadioFieldSchema<T>>) => {
  const {
    id,
    radioGroupProps,
    styles = {},
    options = [],
    rules,
    defaultValue,
  } = field;

  const fieldStyles = useStyles('radioField', {}, styles);

  const { control } = useFormContext();

  const { field: fieldControl } = useController({
    name,
    defaultValue,
    control,
    rules,
  });

  return (
    <Control {...field} name={name} styles={fieldStyles}>
      <RadioGroup
        {...radioGroupProps}
        id={id}
        data-testid={id}
        aria-label={name}
        {...fieldControl}
      >
        <Stack {...fieldStyles?.radioStack}>
          {options.map(({ value, defaultChecked, label, radioProps }, i) => (
            <Radio
              {...fieldStyles?.radio}
              {...radioProps}
              key={`${name}-${i}`}
              id={`${name}-${i}`}
              data-testid={`${name}-${i}`}
              value={value}
              defaultChecked={defaultChecked}
            >
              {label}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>
    </Control>
  );
};
