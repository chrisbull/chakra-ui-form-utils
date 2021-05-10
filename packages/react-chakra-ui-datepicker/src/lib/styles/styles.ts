import { useColorModeValue } from '@chakra-ui/color-mode';
import merge from '../utils/deepmerge';
import { DatepickerStyles } from './style.types';

export const useStyles = (
  overwriteDefaultStyles = false,
  overrideStyles: Partial<DatepickerStyles> = {}
): DatepickerStyles => {
  const baseStyles: DatepickerStyles = {
    actionButton: {
      position: 'relative',
      size: 'sm',
    },
    arrowIcon: {
      color: 'gray.500',
      my: [5, 15],
    },
    buttonsWrapper: {
      spacing: [1, 3],
    },
    closeButton: {
      position: 'absolute',
      right: 1,
      top: 1,
      zIndex: 1,
    },
    datepickerContainer: {
      background: useColorModeValue('white', 'gray.700'),
      borderRadius: 'md',
      position: 'relative',
      px: [3, 5],
      py: [5, 7],
      shadow: 'md',
      width: 'fit-content',
      zIndex: 1,
    },
    datepickerFooter: {
      justifyContent: 'space-between',
      pt: [1, 3],
    },
    dateRangeInputContainer: {
      spacing: 5,
    },
    day: {
      base: {
        _hover: {
          background: 'transparent',
          borderColor: 'transparent',
        },
        background: 'transparent',
        border: '2px solid',
        borderColor: 'transparent',
        borderRadius: '100%',
        fontSize: ['sm', 'md'],
        fontWeight: 'medium',
        height: ['32px', '48px'],
        minWidth: 'unset',
        overflow: 'hidden',
        textColor: useColorModeValue('gray.900', 'white'),
        width: ['32px', '48px'],
      },
      first: {},
      firstOrLast: {
        _hover: {
          background: useColorModeValue('black', 'white'),
          textColor: useColorModeValue('white', 'black'),
        },
        background: useColorModeValue('black', 'white'),
        textColor: useColorModeValue('white', 'black'),
      },
      last: {},
      normal: {
        _hover: {
          borderColor: useColorModeValue('black', 'white'),
        },
      },
      rangeHover: {
        _hover: {
          borderColor: useColorModeValue('black', 'white'),
        },
      },
      selected: {
        _hover: {
          borderColor: useColorModeValue('black', 'white'),
        },
      },
    },
    dayContainer: {
      base: {
        _hover: {
          borderRightRadius: '100%',
        },
        height: ['32px', '48px'],
        width: ['32px', '48px'],
      },
      first: {
        borderLeftRadius: '100%',
      },
      firstOrLast: {
        background: useColorModeValue('gray.100', 'gray.500'),
      },
      last: {
        _hover: {
          borderRightRadius: '100%',
        },
        borderRightRadius: '100%',
      },
      normal: {},
      rangeHover: {
        _hover: {
          borderRightRadius: '100%',
        },
        background: useColorModeValue('gray.100', 'gray.500'),
      },
      selected: {
        _hover: {
          borderRightRadius: '0%',
        },
        background: useColorModeValue('gray.100', 'gray.500'),
      },
    },
    inputComponentIcon: {
      active: {},
      base: {},
    },
    inputComponentInput: {
      active: {},
      base: {},
    },
    inputComponentInputAddon: {
      active: {},
      base: {},
    },
    inputComponentInputGroup: {
      active: {},
      base: {},
    },
    monthContainer: {},
    monthDayGrid: {
      rowGap: 1,
    },
    monthMonthLabel: {
      fontSize: ['md', 'lg'],
      fontWeight: 'bold',
      justifyContent: 'center',
      mb: 6,
    },
    monthsWrapper: {
      spacing: [0, 8],
    },
    monthWeekdayLabel: {
      color: 'gray.500',
      fontSize: ['sm', 'md'],
      justifyContent: 'center',
      mb: 4,
    },
    resetDatesButton: {
      size: 'sm',
    },
    selectDateContainer: {
      active: {
        borderColor: 'blue.400',
      },
      base: {
        borderBottom: '2px solid',
        borderColor: 'gray.300',
        paddingBottom: [1, 3],
        width: '100%',
      },
    },
    selectDateDateText: {
      active: {},
      base: {
        fontSize: ['sm', 'md', 'lg'],
        fontWeight: 'bold',
      },
    },
    selectDateText: {
      active: {},
      base: {
        color: 'gray.500',
        fontSize: 'xs',
      },
    },
  };

  return merge(
    overwriteDefaultStyles ? emptyStylesObject : baseStyles,
    overrideStyles
  );
};

export const emptyStylesObject: DatepickerStyles = {
  actionButton: {},
  arrowIcon: {},
  buttonsWrapper: {},
  closeButton: {},
  datepickerContainer: {},
  dateRangeInputContainer: {},

  day: {
    base: {},
    normal: {},
    rangeHover: {},
    selected: {},
    first: {},
    firstOrLast: {},
    last: {},
  },
  dayContainer: {
    base: {},
    normal: {},
    rangeHover: {},
    selected: {},
    first: {},
    firstOrLast: {},
    last: {},
  },
  inputComponentIcon: {
    active: {},
    base: {},
  },
  inputComponentInput: {
    active: {},
    base: {},
  },
  inputComponentInputAddon: {
    active: {},
    base: {},
  },
  inputComponentInputGroup: {
    active: {},
    base: {},
  },
  monthContainer: {},
  monthDayGrid: {},
  monthMonthLabel: {},
  monthsWrapper: {},
  monthWeekdayLabel: {},
  resetDatesButton: {},
  selectDateContainer: {
    active: {},
    base: {},
  },
  selectDateDateText: {
    active: {},
    base: {},
  },
  selectDateText: {
    active: {},
    base: {},
  },
  datepickerFooter: {},
};
