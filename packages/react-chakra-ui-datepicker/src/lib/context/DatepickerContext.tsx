import { createContext, useContext } from 'react';
import { UseDatepickerReturnType } from '../hooks/useDatepicker';

export type UseDatepickerContext = UseDatepickerReturnType;
const DatepickerContext = createContext({} as UseDatepickerContext);

export const DatepickerProvider = DatepickerContext.Provider;
export const useDatepickerContext = () => useContext(DatepickerContext);
