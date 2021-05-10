import { Switch } from '@chakra-ui/react';
import { FieldValues, useController, useFormContext } from 'react-hook-form';
import { useStyles } from '../hooks/useStyles';
import { FieldProps, SwitchFieldSchema } from '../types/form';
import { Control } from './Control';

export const SwitchField = <T extends FieldValues>({
  name,
  field,
}: FieldProps<SwitchFieldSchema<T>>) => {
  const {
    id,
    rules,
    styles = {},
    defaultChecked,
    switchProps,
    defaultValue,
  } = field;

  const fieldStyles = useStyles('switchField', {}, styles);

  const { control } = useFormContext();
  const { field: fieldControl } = useController({
    name,
    defaultValue,
    control,
    rules,
  });

  return (
    <Control {...field} name={name} styles={fieldStyles}>
      <Switch
        {...fieldStyles?.switch}
        {...switchProps}
        id={id}
        data-testid={id}
        aria-label={name}
        defaultChecked={defaultChecked}
        {...fieldControl}
      />
    </Control>
  );
};
