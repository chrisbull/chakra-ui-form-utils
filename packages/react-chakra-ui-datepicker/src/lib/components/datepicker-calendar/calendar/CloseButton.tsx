import {
  CloseButton as ChakraCloseButton,
  CloseButtonProps as ChakraCloseButtonProps,
} from '@chakra-ui/react';
import React from 'react';
import { useDatepickerContext } from '../../../context/DatepickerContext';

export type CloseButtonProps = ChakraCloseButtonProps;

export const CloseButton = (props: CloseButtonProps) => {
  const { styles } = useDatepickerContext();
  return <ChakraCloseButton {...styles.closeButton} {...props} />;
};
