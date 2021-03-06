import {
  ChakraProvider,
  extendTheme,
  Flex,
  IconButton,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ColorModeToggleBar = () => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const nextMode = useColorModeValue('dark', 'light');

  return (
    <Flex justify="flex-end" mb={4}>
      <IconButton
        size="md"
        fontSize="lg"
        aria-label={`Switch to ${nextMode} mode`}
        variant="ghost"
        color="current"
        marginLeft="2"
        onClick={() => toggleColorMode()}
        icon={<SwitchIcon />}
      />
    </Flex>
  );
};

const theme = extendTheme({});

export const withChakra = (StoryFn) => {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <ColorModeToggleBar />
      <StoryFn />
    </ChakraProvider>
  );
};
