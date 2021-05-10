import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from '@chakra-ui/react';
import { FieldValues, useController, useFormContext } from 'react-hook-form';
import { useStyles } from '../hooks/useStyles';
import { FieldProps, TextFieldSchema } from '../types/form';
import { Control } from './Control';

export const TextField = <T extends FieldValues>({
  name,
  field,
}: FieldProps<TextFieldSchema<T>>) => {
  const {
    id,
    defaultValue,
    placeholder,
    htmlInputType,
    inputLeftAddon,
    inputRightAddon,
    styles = {},
    rules,
    inputProps,
  } = field;

  const fieldStyles = useStyles('textField', {}, styles);

  const { control } = useFormContext();
  const { field: controlField } = useController({
    name,
    rules,
    defaultValue,
    control,
  });

  return (
    <Control {...field} name={name} styles={fieldStyles}>
      {!!inputLeftAddon || inputRightAddon ? (
        <InputGroup {...fieldStyles?.inputGroup} {...controlField}>
          {!!inputLeftAddon && <InputLeftAddon {...inputLeftAddon} />}
          <Input
            {...fieldStyles?.input}
            {...inputProps}
            type={htmlInputType || 'text'}
            id={id}
            data-testid={id}
            aria-label={name}
            placeholder={placeholder}
            {...controlField}
          />
          {!!inputRightAddon && <InputRightAddon {...inputRightAddon} />}
        </InputGroup>
      ) : (
        <Input
          {...fieldStyles?.input}
          {...inputProps}
          type={htmlInputType || 'text'}
          id={id}
          data-testid={id}
          aria-label={name}
          placeholder={placeholder}
          {...controlField}
        />
      )}
    </Control>
  );
};
