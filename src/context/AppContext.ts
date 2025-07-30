import { createContext, useContext } from 'react';
import type { AppContextProps } from '../types/interfaces';

export const AppContext = createContext<AppContextProps | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useSearchContext error');
  }

  return context;
};
