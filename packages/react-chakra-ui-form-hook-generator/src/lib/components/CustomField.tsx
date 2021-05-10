import { InputGroup, InputLeftAddon, InputRightAddon } from '@chakra-ui/react';
import { FieldValues, useController, useFormContext } from 'react-hook-form';
import { useStyles } from '../hooks/useStyles';
import { CustomFieldSchema, FieldProps } from '../types/form';
import { Control } from './Control';

export const CustomField = <T extends FieldValues>({
  name,
  field,
}: FieldProps<CustomFieldSchema<T>>) => {
  const {
    id,
    defaultValue,
    placeholder,
    inputLeftAddon,
    inputRightAddon,
    styles = {},
    rules,
    props,
    component: Component,
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
          <Component
            {...fieldStyles?.input}
            {...props}
            id={id}
            data-testid={id}
            aria-label={name}
            placeholder={placeholder}
            {...controlField}
          />
          {!!inputRightAddon && <InputRightAddon {...inputRightAddon} />}
        </InputGroup>
      ) : (
        <Component
          {...fieldStyles?.input}
          {...props}
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
