import { createContext, useContext } from 'react';
import { FormStyles } from '../types/styles';
export interface FormGeneratorContextProps {
  styles: FormStyles;
  overwriteDefaultStyles?: boolean;
}

export const FormGeneratorContext = createContext(
  {} as FormGeneratorContextProps
);

export const useFormGeneratorContext = () => useContext(FormGeneratorContext);

export const FormGeneratorProvider = FormGeneratorContext.Provider;
