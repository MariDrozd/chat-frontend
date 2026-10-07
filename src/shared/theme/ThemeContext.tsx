import { createContext } from 'react';
import type { Theme } from './types';

export interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | null>(null);
