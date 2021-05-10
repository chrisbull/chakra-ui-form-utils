import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react';
import { FieldValues, useController, useFormContext } from 'react-hook-form';
import { useStyles } from '../hooks/useStyles';
import { FieldProps, SliderFieldSchema } from '../types/form';
import { Control } from './Control';

export const SliderField = <T extends FieldValues>({
  name,
  field,
}: FieldProps<SliderFieldSchema<T>>) => {
  const { id, defaultValue, styles = {}, sliderProps, rules } = field;

  const fieldStyles = useStyles('sliderField', {}, styles);

  const { control } = useFormContext();

  const { field: fieldControl } = useController({
    name,
    defaultValue,
    control,
    rules,
  });

  return (
    <Control {...field} name={name} styles={fieldStyles}>
      <Slider
        {...fieldStyles?.slider}
        {...sliderProps}
        id={id}
        data-testid={id}
        aria-label={name}
        {...fieldControl}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Control>
  );
};
