import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useErrorMessage } from '../hooks/useErrorMessage';
import { FormController } from '../types/form';
import { FormControllerStyles } from '../types/styles';

export interface ControlProps
  extends FormController,
    Omit<FormControlProps, keyof FormController> {
  styles?: FormControllerStyles;
  name: string;
  hideLabel?: boolean;
}

export const Control: FC<ControlProps> = ({
  children,
  helperText,
  hideLabel,
  id,
  isRequired,
  label,
  name,
  placeholder,
  rules,
  shouldDisplay,
  styles,
  ...props
}) => {
  const { watch } = useFormContext();

  const values = watch(name);

  const errorMessage = useErrorMessage(name, label);

  const isVisible = useMemo(() => {
    return shouldDisplay ? shouldDisplay(values) : true;
  }, [values, shouldDisplay]);

  return isVisible ? (
    <FormControl
      key={`${name}-control`}
      id={id}
      isRequired={isRequired}
      isInvalid={!!errorMessage}
      {...styles?.control}
      {...props}
    >
      {!!label && !hideLabel && (
        <FormLabel htmlFor={name} {...styles?.label}>
          {label}
        </FormLabel>
      )}
      {children}
      {!!helperText && (
        <FormHelperText {...styles?.helperText}>{helperText}</FormHelperText>
      )}
      <FormErrorMessage {...styles?.errorMessage}>
        {errorMessage}
      </FormErrorMessage>
    </FormControl>
  ) : null;
};
