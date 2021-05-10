import { Button, ButtonProps } from '@chakra-ui/react';
import React from 'react';
import { useDatepickerContext } from '../../../context/DatepickerContext';

export const TodayButton = (props: ButtonProps) => {
  const { goToDate } = useDatepickerContext();

  return (
    <Button
      size="sm"
      {...props}
      onClick={() => goToDate(new Date())}
      onMouseUp={(e) => {
        e.currentTarget.blur();
      }}
    >
      {props.children || 'Today'}
    </Button>
  );
};

export default TodayButton;
