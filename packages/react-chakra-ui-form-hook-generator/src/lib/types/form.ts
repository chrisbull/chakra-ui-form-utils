/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import {
  CheckboxProps,
  InputAddonProps,
  InputProps,
  NumberInputProps,
  RadioGroupProps,
  RadioProps,
  SelectProps,
  SliderProps,
  SwitchProps,
  TextareaProps,
} from '@chakra-ui/react';
import { DatepickerProps } from 'react-chakra-ui-datepicker';
import {
  ArrayPath,
  FieldValue,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from 'react-hook-form';
import {
  ArrayFieldStyles,
  CheckboxFieldStyles,
  DateFieldStyles,
  NumberFieldStyles,
  ObjectFieldStyles,
  RadioFieldStyles,
  SelectFieldStyles,
  SliderFieldStyles,
  SwitchFieldStyles,
  TextAreaFieldStyles,
  TextFieldStyles,
} from '../types/styles';
type Unpacked<T> = T extends (infer U)[] ? U : T;

export type SelectFieldOption<T extends FieldValues> = {
  value: FieldValue<T>;
  label?: string;
};

export type DateFieldValues = {
  startDate?: Date | null;
  endDate?: Date | null;
};

export type KeyTypes =
  | 'array'
  | 'checkbox'
  | 'multicheckbox'
  | 'custom'
  | 'daterange'
  | 'date'
  | 'number'
  | 'object'
  | 'radio'
  | 'select'
  | 'slider'
  | 'switch'
  | 'text'
  | 'textarea';

export type Schema<T extends FieldValues> = {
  [Key in keyof T]:
    | ArrayFieldSchema<T[Key]>
    | CheckboxFieldSchema<T[Key]>
    | CustomFieldSchema<T[Key]>
    | DateFieldSchema<T[Key]>
    | MultiCheckboxFieldSchema<T[Key]>
    | NumberFieldSchema<T[Key]>
    | ObjectFieldSchema<T[Key]>
    | RadioFieldSchema<T[Key]>
    | SelectFieldSchema<T[Key]>
    | SliderFieldSchema<T[Key]>
    | SwitchFieldSchema<T[Key]>
    | TextAreaFieldSchema<T[Key]>
    | TextFieldSchema<T[Key]>;
};

export type FieldSchemas =
  | ArrayFieldSchema<FieldValues>
  | CheckboxFieldSchema<FieldValues>
  | CustomFieldSchema<FieldValues>
  | DateFieldSchema<FieldValues>
  | MultiCheckboxFieldSchema<FieldValues>
  | NumberFieldSchema<FieldValues>
  | ObjectFieldSchema<FieldValues>
  | RadioFieldSchema<FieldValues>
  | SelectFieldSchema<FieldValues>
  | SliderFieldSchema<FieldValues>
  | SwitchFieldSchema<FieldValues>
  | TextAreaFieldSchema<FieldValues>
  | TextFieldSchema<FieldValues>;

export interface FieldSchema {
  type: KeyTypes;
}

export interface FormController<
  T extends FieldValues = FieldValues,
  TName extends Path<T> = Path<T>
> {
  id?: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  shouldDisplay?: (value: PathValue<T, TName>) => boolean;
  isRequired?: boolean;
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
  defaultValue?: PathValue<T, Path<T> | ArrayPath<T>>;
}

export interface CustomFieldSchema<T extends FieldValues>
  extends FieldSchema,
    FormController<T> {
  type: 'custom';
  component: any;
  props?: object;
  inputLeftAddon?: InputAddonProps;
  inputRightAddon?: InputAddonProps;
  styles?: TextFieldStyles;
}

export interface TextFieldSchema<T extends FieldValues>
  extends FieldSchema,
    FormController<T> {
  type: 'text';
  htmlInputType?: string;
  inputLeftAddon?: InputAddonProps;
  inputRightAddon?: InputAddonProps;
  inputProps?: InputProps;
  styles?: TextFieldStyles;
}

export interface TextAreaFieldSchema<T extends FieldValues>
  extends FieldSchema,
    FormController<T> {
  type: 'textarea';
  textAreaProps?: TextareaProps;
  styles?: TextAreaFieldStyles;
}

export interface NumberFieldSchema<T extends FieldValues>
  extends FieldSchema,
    FormController<T> {
  type: 'number';
  styles?: NumberFieldStyles;
  numberProps?: NumberInputProps;
  min?: NumberInputProps['min'];
  max?: NumberInputProps['min'];
}

export interface SwitchFieldSchema<T extends FieldValues>
  extends FieldSchema,
    FormController<T> {
  type: 'switch';
  switchProps?: SwitchProps;
  styles?: SwitchFieldStyles;
  defaultChecked?: boolean;
}

export interface SliderFieldSchema<T extends FieldValues>
  extends FieldSchema,
    FormController<T> {
  type: 'slider';
  sliderProps?: SliderProps;
  styles?: SliderFieldStyles;
}

export interface CheckboxFieldSchema<T extends FieldValues>
  extends FieldSchema,
    FormController<T> {
  type: 'checkbox';
  label?: string;
  value?: string | number;
  checkboxProps?: CheckboxProps;
  defaultChecked?: boolean;
  styles?: CheckboxFieldStyles;
}

export interface MultiCheckboxFieldSchema<T extends FieldValues>
  extends FieldSchema,
    FormController<T> {
  type: 'multicheckbox';
  checkboxes: CheckboxFieldSchema<T>[];
  styles?: CheckboxFieldStyles;
}

export interface SelectFieldSchema<T extends FieldValues>
  extends FieldSchema,
    FormController<T> {
  type: 'select';
  options: SelectFieldOption<T>[];
  selectProps?: SelectProps;
  styles?: SelectFieldStyles;
}

export interface DateFieldSchema<T extends FieldValues>
  extends FieldSchema,
    FormController<T> {
  type: 'date';
  leftInputAddon?: InputAddonProps;
  rightInputAddon?: InputAddonProps;
  styles?: DateFieldStyles;
  inputProps?: InputProps;
  datepickerProps?: DatepickerProps;
}

export interface RadioFieldSchema<T extends FieldValues>
  extends FieldSchema,
    FormController<T> {
  type: 'radio';
  options: RadioFieldOption<T>[];
  styles?: RadioFieldStyles;
  radioGroupProps?: RadioGroupProps;
}

export interface ArrayFieldSchema<T extends FieldValues>
  extends FieldSchema,
    FormController<T> {
  type: 'array';
  isCollapsable?: boolean;
  itemField: ObjectFieldSchema<T>;
  styles?: ArrayFieldStyles;
}

export interface ObjectFieldSchema<T extends FieldValues>
  extends FieldSchema,
    FormController<T> {
  type: 'object';
  isCollapsable?: boolean;
  properties: Schema<Unpacked<T>>;
  styles?: ObjectFieldStyles;
}

export type RadioFieldOption<T extends FieldValues> = {
  value: FieldValue<T>;
  name?: Path<T>;
  label?: string;
  radioProps?: RadioProps;
  defaultChecked?: boolean;
};

export interface FieldProps<TFieldSchemas extends any> {
  field: TFieldSchemas;
  name: string;
}

export interface ArrayFieldProps<TFieldSchemas extends any> {
  field: TFieldSchemas;
  name: string;
}
