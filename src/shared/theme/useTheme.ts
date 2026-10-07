import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

export const useTheme = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('ThemeContext must be used with ThemeProvider');
  }

  return themeContext;
};
