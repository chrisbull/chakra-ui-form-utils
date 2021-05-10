import {
  BoxProps,
  ButtonProps,
  CheckboxGroupProps,
  FormLabelProps,
  InputGroupProps,
  InputProps,
  NumberInputFieldProps,
  NumberInputProps,
  RadioProps,
  SelectProps,
  SliderProps,
  StackProps,
  SwitchProps,
  TextareaProps,
} from '@chakra-ui/react';
import { DatepickerProps } from 'react-chakra-ui-datepicker';

export interface FormControllerStyles {
  label?: FormLabelProps;
  control?: BoxProps;
  helperText?: BoxProps;
  errorMessage?: BoxProps;
}

export interface ArrayFieldStyles
  extends CollapsableStyles,
    FormControllerStyles {
  arrayContainer?: StackProps;
  itemContainer?: BoxProps;
  buttonGroup?: BoxProps;
  addButton?: ButtonProps;
  deleteButton?: ButtonProps;
  clearButton?: ButtonProps;
  deleteItemContainer?: BoxProps;
  countText?: BoxProps;
  toolbar?: BoxProps;
}

export interface ObjectFieldStyles
  extends CollapsableStyles,
    FormControllerStyles {
  objectContainer?: StackProps;
  propertyContainer?: BoxProps;
}

export interface CollapsableStyles {
  toolbar?: BoxProps;
  collapseButton?: ButtonProps;
}

export interface SwitchFieldStyles extends FormControllerStyles {
  switch?: SwitchProps;
}

export interface CheckboxFieldStyles extends FormControllerStyles {
  checkboxGroup?: CheckboxGroupProps;
  checkboxStack?: StackProps;
  checkbox?: BoxProps;
}

export interface RadioFieldStyles extends FormControllerStyles {
  radioStack?: StackProps;
  radio?: RadioProps;
}

export interface NumberFieldStyles extends FormControllerStyles {
  numberInput?: NumberInputProps;
  numberInputField?: NumberInputFieldProps;
}

export interface SelectFieldStyles extends FormControllerStyles {
  select?: SelectProps;
}

export interface DateFieldStyles extends FormControllerStyles {
  input?: DatepickerProps;
  inputGroup?: InputGroupProps;
}

export interface FormContainerStyles {
  container?: BoxProps;
  title?: BoxProps;
  fieldsContainer?: BoxProps;
  fieldSpacing?: StackProps;
  buttonGroup?: BoxProps;
  submitButton?: ButtonProps;
  resetButton?: ButtonProps;
}

export interface TextFieldStyles extends FormControllerStyles {
  input?: InputProps;
  inputGroup?: InputGroupProps;
}

export interface TextAreaFieldStyles extends FormControllerStyles {
  input?: TextareaProps;
}

export interface SliderFieldStyles extends FormControllerStyles {
  slider?: SliderProps;
}

export interface FormStyles {
  formContainer?: FormContainerStyles;
  arrayField?: ArrayFieldStyles;
  checkboxField?: CheckboxFieldStyles;
  dateField?: DateFieldStyles;
  numberField?: NumberFieldStyles;
  objectField?: ObjectFieldStyles;
  radioField?: RadioFieldStyles;
  selectField?: SelectFieldStyles;
  sliderField?: SliderFieldStyles;
  switchField?: SwitchFieldStyles;
  textAreaField?: TextAreaFieldStyles;
  textField?: TextFieldStyles;
}

export type FieldSchemaStyles =
  | ArrayFieldStyles
  | CheckboxFieldStyles
  | DateFieldStyles
  | NumberFieldStyles
  | ObjectFieldStyles
  | RadioFieldStyles
  | SelectFieldStyles
  | SliderFieldStyles
  | SwitchFieldStyles
  | TextAreaFieldStyles
  | TextFieldStyles;
