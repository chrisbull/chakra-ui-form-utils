import { Box, Button, ButtonGroup, Heading, Stack } from '@chakra-ui/react';
import { DevTool } from '@hookform/devtools';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormProps,
} from 'react-hook-form';
import { FormGeneratorProvider } from '../hooks/useFormGeneratorContext';
import { useStyles } from '../hooks/useStyles';
import { FieldProps, FieldSchemas, Schema } from '../types/form';
import { FormStyles } from '../types/styles';
import { CheckboxField } from './CheckboxField';
import { ArrayField, ObjectField } from './Containers';
import { CustomField } from './CustomField';
import { DateField } from './DateField';
import { MultiCheckboxField } from './MultiCheckboxField';
import { NumberField } from './NumberField';
import { RadioField } from './RadioField';
import { SelectField } from './SelectField';
import { SliderField } from './SliderField';
import { SwitchField } from './SwitchField';
import { TextAreaField } from './TextAreaField';
import { TextField } from './TextField';

export interface FormProps<T extends FieldValues> {
  title?: string;
  schema: Schema<T>;
  handleSubmit: SubmitHandler<T>;
  styles?: FormStyles;
  overwriteDefaultStyles?: boolean;
  formOptions?: UseFormProps<T>;
  buttons?: {
    reset?: {
      text?: string;
      hidden?: boolean;
    };
    submit?: {
      text?: string;
    };
  };
  showFormDebugger?: boolean;
}

const renderField = ({ name, field }: FieldProps<FieldSchemas>) => (
  <Box key={`${name}-container`}>
    {field.type === 'array' && <ArrayField name={name} field={field} />}
    {field.type === 'checkbox' && <CheckboxField name={name} field={field} />}
    {field.type === 'custom' && <CustomField name={name} field={field} />}
    {field.type === 'date' && <DateField name={name} field={field} />}
    {field.type === 'number' && <NumberField name={name} field={field} />}
    {field.type === 'object' && <ObjectField name={name} field={field} />}
    {field.type === 'radio' && <RadioField name={name} field={field} />}
    {field.type === 'select' && <SelectField name={name} field={field} />}
    {field.type === 'switch' && <SwitchField name={name} field={field} />}
    {field.type === 'text' && <TextField name={name} field={field} />}
    {field.type === 'textarea' && <TextAreaField name={name} field={field} />}
    {field.type === 'slider' && <SliderField name={name} field={field} />}
    {field.type === 'multicheckbox' && (
      <MultiCheckboxField name={name} field={field} />
    )}
  </Box>
);

export const Form = <T extends FieldValues>({
  title,
  schema,
  handleSubmit,
  formOptions,
  overwriteDefaultStyles,
  buttons,
  styles = {},
  showFormDebugger,
}: FormProps<T>) => {
  const methods = useForm(formOptions);

  const formStyles = useStyles('formContainer', {
    container: {
      padding: 4,
    },
    fieldSpacing: {
      spacing: 6,
    },
    title: {
      size: 'lg',
      marginBottom: 4,
    },
    buttonGroup: {
      marginTop: 4,
    },
    submitButton: {
      size: 'sm',
    },
    resetButton: {
      size: 'sm',
    },
  });

  const onSubmit: SubmitHandler<T> = (values) => {
    return handleSubmit(values);
  };

  return (
    <FormGeneratorProvider value={{ styles, overwriteDefaultStyles }}>
      <Box>{showFormDebugger && <DevTool control={methods.control} />}</Box>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit<T>(onSubmit)}>
          <Box {...formStyles?.container}>
            {!!title && <Heading {...formStyles?.title}>{title}</Heading>}
            <Stack {...formStyles?.fieldSpacing}>
              {Object.entries(schema).map(([name, field]) =>
                renderField({ name, field })
              )}
            </Stack>
            <ButtonGroup {...formStyles?.buttonGroup}>
              {buttons?.reset?.hidden ? null : (
                <Button type="reset" {...formStyles?.resetButton}>
                  {buttons?.reset?.text || 'Reset'}
                </Button>
              )}
              <Button type="submit" {...formStyles?.submitButton}>
                {buttons?.submit?.text || 'Submit'}
              </Button>
            </ButtonGroup>
          </Box>
        </form>
      </FormProvider>
    </FormGeneratorProvider>
  );
};
