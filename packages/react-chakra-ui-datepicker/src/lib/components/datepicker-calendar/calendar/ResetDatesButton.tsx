import { RepeatIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import React, { FC } from 'react';
import { useDatepickerContext } from '../../../context/DatepickerContext';

export const ResetDatesButton: FC = ({ children }) => {
  const { phrases, styles, onResetDates } = useDatepickerContext();

  function handleMouseUp(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.currentTarget.blur();
  }

  return (
    <Button
      icon={<RepeatIcon />}
      tabIndex={-1}
      aria-label={phrases.resetDates}
      {...styles.resetDatesButton}
      onClick={onResetDates}
      onMouseUp={handleMouseUp}
    >
      {children || phrases.resetDates}
    </Button>
  );
};

export default ResetDatesButton;
