import { IconProps } from '@chakra-ui/icons';
import {
  BoxProps,
  ButtonProps,
  CloseButtonProps,
  FlexProps,
  IconButtonProps,
  InputAddonProps,
  InputGroupProps,
  InputProps,
  SimpleGridProps,
  StackProps,
} from '@chakra-ui/react';

export type StateProp<T extends unknown> = { base: T; active?: T };

export interface DayState<T extends unknown> {
  base: T;
  normal: T;
  rangeHover: T;
  selected: T;
  firstOrLast: T;
  first: T;
  last: T;
}

type Omitted = 'css';

export interface DatepickerStyles {
  actionButton: Omit<Partial<IconButtonProps>, Omitted>;
  arrowIcon: Omit<Partial<IconProps>, Omitted>;
  buttonsWrapper: Omit<Partial<StackProps>, Omitted>;
  closeButton: Omit<Partial<CloseButtonProps>, Omitted>;
  datepickerContainer: Omit<Partial<BoxProps>, Omitted>;
  datepickerFooter: Omit<Partial<FlexProps>, Omitted>;
  dateRangeInputContainer: Omit<Partial<StackProps>, Omitted>;
  monthContainer: Omit<Partial<BoxProps>, Omitted>;
  monthDayGrid: Omit<Partial<SimpleGridProps>, Omitted>;
  monthMonthLabel: Omit<Partial<BoxProps>, Omitted>;
  monthsWrapper: Omit<Partial<StackProps>, Omitted>;
  monthWeekdayLabel: Omit<Partial<BoxProps>, Omitted>;
  resetDatesButton: Omit<Partial<ButtonProps>, Omitted>;
  selectDateContainer: StateProp<Omit<Partial<StackProps>, Omitted>>;
  selectDateDateText: StateProp<Omit<Partial<BoxProps>, Omitted>>;
  selectDateText: StateProp<Omit<Partial<BoxProps>, Omitted>>;
  day: DayState<Omit<Partial<ButtonProps>, Omitted>>;
  dayContainer: DayState<Omit<Partial<BoxProps>, Omitted>>;
  inputComponentIcon: StateProp<Omit<Partial<IconProps>, Omitted>>;
  inputComponentInput: StateProp<InputProps['style']>;
  inputComponentInputAddon: StateProp<Omit<Partial<InputAddonProps>, Omitted>>;
  inputComponentInputGroup: StateProp<Omit<Partial<InputGroupProps>, Omitted>>;
}
