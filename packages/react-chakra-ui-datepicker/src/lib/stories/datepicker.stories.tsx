/* eslint-disable react-hooks/rules-of-hooks */
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  VStack,
} from '@chakra-ui/react';
import { DevTool } from '@hookform/devtools';
import { Meta } from '@storybook/react';
import React from 'react';
import {
  Datepicker,
  DatepickerCalendar,
  DatepickerInput,
  DatepickerProps,
} from 'react-chakra-ui-datepicker';
import { useForm } from 'react-hook-form';

const meta: Meta = {
  title: 'Datepicker',
  component: Datepicker,
  parameters: {
    controls: { expanded: true },
  },
  args: {
    showFormDebugger: true,
  },
};

export default meta;

export const Primary = (props: DatepickerProps) => {
  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    control,
  } = useForm();

  const startDate = watch('startDate');
  const endDate = watch('endDate');

  const onSubmit = (data: unknown) => console.log('onSubmit', data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Datepicker
          {...props}
          onDatesChange={(data) => {
            setValue('startDate', data.startDate);
            setValue('endDate', data.endDate);
          }}
        >
          <VStack spacing={6} alignItems="start">
            {/* START DATE */}
            <FormControl isInvalid={errors.startDate} isRequired>
              <FormLabel>Start Date</FormLabel>

              <DatepickerInput
                inputType="startDate"
                placeholder="Start Date"
                value={startDate}
              />
              <FormHelperText>Please enter a start date</FormHelperText>
              <FormErrorMessage>
                {errors.startDate && errors.startDate.message}
              </FormErrorMessage>
            </FormControl>
            {/* END DATE */}
            <FormControl isInvalid={errors.endDate} isRequired>
              <FormLabel>End Date</FormLabel>
              <DatepickerInput
                inputType="endDate"
                placeholder="End Date"
                value={endDate}
              />
              <FormHelperText>Please enter a end date</FormHelperText>
              <FormErrorMessage>{errors.endDate?.message}</FormErrorMessage>
            </FormControl>
          </VStack>
        </Datepicker>
        <Button type="submit">Submit</Button>
      </form>
      <DevTool control={control} />
    </>
  );
};

export const Simple = (props: DatepickerProps = {}) => {
  return (
    <Datepicker {...props}>
      <DatepickerInput inputType="startDate" placeholder="Start Date" />
      <DatepickerInput inputType="endDate" placeholder="End Date" />
    </Datepicker>
  );
};

export const WithFormControls = (props: DatepickerProps = {}) => {
  return (
    <Datepicker {...props}>
      <VStack spacing={6} alignItems="start">
        <FormControl isRequired isInvalid>
          <FormLabel>Start Date</FormLabel>
          <DatepickerInput inputType="startDate" placeholder="Start Date" />
          <FormHelperText>Please enter a start date</FormHelperText>
          <FormErrorMessage>Invalid date</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid>
          <FormLabel>End Date</FormLabel>
          <DatepickerInput inputType="endDate" placeholder="End Date" />
          <FormHelperText>Please enter a end date</FormHelperText>
          <FormErrorMessage>Invalid date</FormErrorMessage>
        </FormControl>
      </VStack>
    </Datepicker>
  );
};

export const Calendar = (props: DatepickerProps) => {
  return (
    <Datepicker
      {...props}
      showDatepicker
      focusedInput="startDate"
      onDatesChange={(data) => {
        console.log('---------- onDatesChange ----------');
        console.log('startDate', data.startDate);
        console.log('endDate', data.endDate);
        console.log('focusedInput', data.focusedInput);
      }}
    >
      <DatepickerCalendar />
    </Datepicker>
  );
};
