import { AddIcon, DeleteIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  ButtonGroup,
  Collapse,
  Flex,
  FormLabel,
  IconButton,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import {
  ArrayPath,
  FieldValues,
  UnpackNestedValue,
  useFieldArray,
  useFormContext,
} from 'react-hook-form';
import { useStyles } from '../hooks/useStyles';
import {
  ArrayFieldProps,
  ArrayFieldSchema,
  FieldProps,
  FieldSchemas,
  ObjectFieldSchema,
} from '../types/form';
import { CheckboxField } from './CheckboxField';
import { Control } from './Control';
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

export const ArrayField = <T extends FieldValues>({
  name,
  field,
}: ArrayFieldProps<ArrayFieldSchema<T>>) => {
  const { label, isCollapsable, itemField, styles = {} } = field;

  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name,
    control,
  });

  const { isOpen, onOpen, onToggle } = useDisclosure({
    defaultIsOpen: fields.length > 0,
  });

  const fieldStyles = useStyles(
    'arrayField',
    {
      arrayContainer: {
        spacing: 4,
        marginTop: 2,
      },
      label: {
        padding: 0,
        display: 'flex',
      },
      countText: {
        fontWeight: 400,
        marginLeft: 1,
      },
      toolbar: {
        alignItems: 'center',
      },
      buttonGroup: {
        marginLeft: 'auto',
      },
      addButton: {
        size: 'xs',
      },
      deleteButton: {
        size: 'xs',
        margin: 'auto',
      },
      clearButton: {
        size: 'xs',
      },
      collapseButton: {
        size: 'xs',
      },
      itemContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 2.5rem',
        paddingLeft: 2,
        paddingBottom: 2,
        paddingTop: 1,
        borderWidth: 1,
        borderRadius: 4,
      },
      deleteItemContainer: {
        display: 'flex',
      },
    },
    styles
  );

  const addItem = () => {
    append({});
    onOpen();
  };

  return (
    <Control {...field} name={name} styles={fieldStyles} hideLabel>
      <Flex {...fieldStyles?.toolbar}>
        {!!label && (
          <FormLabel {...fieldStyles?.label} htmlFor={name}>
            {label} <Box {...fieldStyles?.countText}>({fields.length})</Box>
          </FormLabel>
        )}
        <ButtonGroup {...fieldStyles?.buttonGroup}>
          <IconButton
            {...fieldStyles?.addButton}
            icon={<AddIcon />}
            aria-label="Add item"
            onClick={addItem}
          />
          <IconButton
            {...fieldStyles?.clearButton}
            icon={<DeleteIcon />}
            aria-label="Clear items"
            onClick={() => remove()}
          />
          {isCollapsable && (
            <IconButton
              {...fieldStyles?.collapseButton}
              icon={isOpen ? <ViewOffIcon /> : <ViewIcon />}
              aria-label={isOpen ? 'Hide items' : 'Show items'}
              onClick={onToggle}
            />
          )}
        </ButtonGroup>
      </Flex>
      <Collapse in={isOpen}>
        <Stack {...fieldStyles?.arrayContainer}>
          {fields.map((item, i) => (
            <Box
              {...fieldStyles?.itemContainer}
              key={item?.id || `${name}[${i}]`}
            >
              {renderField({
                field: { ...itemField, id: item?.id },
                name: `${name}[${i}]` as ArrayPath<UnpackNestedValue<T>>,
              })}

              <Box {...fieldStyles?.deleteItemContainer}>
                <IconButton
                  {...fieldStyles?.deleteButton}
                  icon={<DeleteIcon />}
                  aria-label="Delete item"
                  onClick={() => remove(i)}
                />
              </Box>
            </Box>
          ))}
        </Stack>
      </Collapse>
    </Control>
  );
};

export const ObjectField = <T extends FieldValues>({
  name,
  field,
}: FieldProps<ObjectFieldSchema<T>>) => {
  const { label, isCollapsable, styles = {}, properties } = field;

  const { isOpen, onToggle } = useDisclosure();

  const fieldStyles = useStyles(
    'objectField',
    {
      objectContainer: {
        spacing: 4,
        borderWidth: 1,
        padding: 2,
        borderRadius: 4,
        marginTop: 2,
      },
      label: {
        padding: 0,
      },
      toolbar: {
        alignItems: 'center',
      },
      collapseButton: {
        size: 'xs',
        marginLeft: 'auto',
      },
    },
    styles
  );

  return (
    <Control {...field} name={name} styles={fieldStyles} hideLabel>
      <Flex {...fieldStyles?.toolbar}>
        {!!label && (
          <FormLabel htmlFor={name} {...fieldStyles?.label}>
            {label}
          </FormLabel>
        )}
        {isCollapsable && (
          <IconButton
            {...fieldStyles?.collapseButton}
            icon={isOpen ? <ViewOffIcon /> : <ViewIcon />}
            aria-label={isOpen ? 'Hide items' : 'Show items'}
            onClick={onToggle}
          />
        )}
      </Flex>
      <Stack {...fieldStyles?.objectContainer}>
        {Object.entries(properties).map(([fieldName, objectField], i) => (
          <Box key={i} {...fieldStyles?.propertyContainer}>
            {renderField({
              field: { ...objectField },
              name: `${name}.${fieldName}` as const,
            })}
          </Box>
        ))}
      </Stack>
    </Control>
  );
};
