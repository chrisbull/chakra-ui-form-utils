import { getInputValue } from '@datepicker-react/hooks';
import { DefaultValues } from 'react-hook-form';
import * as z from 'zod';
import { dateDefaultFormat } from '../components/DateField';
import { Schema } from '../types/form';

export const formValidation = z.object({
  textField: z.string(),
  numberField: z.number(),
  sliderField: z.number(),
  switchField: z.boolean(),
  checkboxField: z.boolean(),
  dateField: z.string(),
  objectField: z.object({
    firstName: z.string(),
    lastName: z.string(),
    friends: z.array(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
      })
    ),
  }),
  multicheckboxField: z.array(z.enum(['checkbox1', 'checkbox2', 'checkbox3'])),
  selectField: z.enum(['null', 'select1', 'select2', 'select3']),
  arrayField: z.array(
    z.object({
      firstName: z.string(),
      lastName: z.string(),
    })
  ),
  radioField: z.enum(['1', '2', '3', '4']),
});

export type FormValidation = z.infer<typeof formValidation>;

export const schema: Schema<FormValidation> = {
  textField: {
    type: 'text',
    label: 'textField',
    inputLeftAddon: {
      children: '+1',
    },
  },
  numberField: {
    type: 'number',
    label: 'numberField',
    numberProps: {},
  },
  sliderField: {
    type: 'slider',
    label: 'sliderField',
  },
  switchField: {
    type: 'switch',
    label: 'switchField',
  },
  checkboxField: {
    type: 'checkbox',
    label: 'checkboxField',
  },
  dateField: {
    type: 'date',
    label: 'dateField',
    inputProps: {
      // type: 'datetime-local',
    },
    datepickerProps: {
      // showDebugger: true,
    },
  },
  objectField: {
    type: 'object',
    label: 'objectField',
    properties: {
      firstName: {
        type: 'text',
        label: 'firstName',
      },
      lastName: {
        type: 'text',
        label: 'lastName',
      },
      friends: {
        type: 'array',
        itemField: {
          type: 'object',
          properties: {
            firstName: { type: 'text', label: 'firstName' },
            lastName: { type: 'text', label: 'lastName' },
          },
        },
      },
    },
  },
  multicheckboxField: {
    type: 'multicheckbox',
    label: 'multicheckboxField',
    checkboxes: [
      {
        type: 'checkbox',
        label: 'checkbox1',
        value: 'checkbox1',
      },
      {
        type: 'checkbox',
        label: 'checkbox2',
        value: 'checkbox2',
      },
      {
        type: 'checkbox',
        label: 'checkbox3',
        value: 'checkbox3',
      },
    ],
  },
  selectField: {
    type: 'select',
    placeholder: 'Please select a something',
    options: [
      {
        value: 'select1',
        label: 'Select 1',
      },
      {
        value: 'select2',
        label: 'Select 2',
      },
      {
        value: 'select3',
        label: 'Select 3',
      },
    ],
  },
  arrayField: {
    type: 'array',
    label: 'arrayField',
    isCollapsable: true,
    itemField: {
      type: 'object',
      properties: {
        firstName: { type: 'text', label: 'firstName' },
        lastName: { type: 'text', label: 'lastName' },
      },
    },
  },
  radioField: {
    type: 'radio',
    label: 'radioField',
    options: [
      {
        value: '1',
        label: '1',
      },
      {
        value: '2',
        label: '2',
      },
      {
        value: '3',
        label: '3',
      },
      {
        value: '4',
        label: '4',
      },
    ],
  },
};

export const defaultValues: DefaultValues<FormValidation> = {
  arrayField: [
    {
      firstName: 'John',
      lastName: 'Doe',
    },
    {
      firstName: 'Banks',
      lastName: 'Bull',
    },
  ],
  checkboxField: true,
  dateField: getInputValue(new Date(), dateDefaultFormat, ''),
  multicheckboxField: ['checkbox1', 'checkbox3'],
  numberField: 5,
  objectField: {
    firstName: 'Sam',
    lastName: 'Winter',
    friends: [
      {
        firstName: 'Jane',
        lastName: 'Doe',
      },
      {
        firstName: 'Bob',
        lastName: 'Marley',
      },
    ],
  },
  radioField: '3',
  selectField: 'select2',
  sliderField: 0.5,
  switchField: true,
  textField: 'Hello world',
};
