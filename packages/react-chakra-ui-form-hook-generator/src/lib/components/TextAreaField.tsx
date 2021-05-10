import { Textarea } from '@chakra-ui/react';
import { FieldValues, useController, useFormContext } from 'react-hook-form';
import { useStyles } from '../hooks/useStyles';
import { FieldProps, TextAreaFieldSchema } from '../types/form';
import { Control } from './Control';

export const TextAreaField = <T extends FieldValues>({
  name,
  field,
}: FieldProps<TextAreaFieldSchema<T>>) => {
  const {
    id,
    defaultValue,
    placeholder,
    rules,
    styles = {},
    textAreaProps,
  } = field;

  const fieldStyles = useStyles('textAreaField', {}, styles);

  const { control } = useFormContext();
  const { field: fieldControl } = useController({
    name,
    control,
    defaultValue,
    rules,
  });

  return (
    <Control {...field} name={name} styles={fieldStyles}>
      <Textarea
        {...fieldStyles.input}
        {...textAreaProps}
        id={id}
        data-testid={id}
        aria-label={name}
        placeholder={placeholder}
        {...fieldControl}
      />
    </Control>
  );
};
