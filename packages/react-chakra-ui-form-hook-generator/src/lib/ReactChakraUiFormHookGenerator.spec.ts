import { reactChakraUiFormHookGenerator } from './ReactChakraUiFormHookGenerator';

describe('reactChakraUiFormHookGenerator', () => {
  it('should work', () => {
    expect(reactChakraUiFormHookGenerator()).toEqual(
      'react-chakra-ui-form-hook-generator'
    );
  });
});
