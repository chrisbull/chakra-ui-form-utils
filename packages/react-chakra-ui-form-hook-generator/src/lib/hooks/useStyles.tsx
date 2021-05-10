import { createContext, useMemo } from 'react';
import { FormStyles } from '../types/styles';
import { useFormGeneratorContext } from './useFormGeneratorContext';

export const StyleContext = createContext({} as FormStyles);

export const useStyles = <T extends FormStyles[K], K extends keyof FormStyles>(
  key: K,
  defaultStyles: T,
  inlineStyles?: T
) => {
  const ctx = useFormGeneratorContext();

  return useMemo(() => {
    const customStyles = { ...ctx.styles?.[key], ...inlineStyles };

    return ctx.overwriteDefaultStyles
      ? customStyles
      : { ...defaultStyles, ...customStyles };
  }, [
    ctx.overwriteDefaultStyles,
    ctx.styles,
    defaultStyles,
    inlineStyles,
    key,
  ]);
};
