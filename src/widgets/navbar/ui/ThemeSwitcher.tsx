
import { useTheme } from '@/shared/theme';
import { IconButton } from '@/shared/ui/icon-button';
import { Moon, Sun } from 'lucide-react';

export const ThemeSwitcher = () => {
  const { toggleTheme, theme } = useTheme();

  const Icon = theme === 'dark' ? Sun : Moon;

  return (
    <>
      <IconButton
        variant="secondary"
        shape="pill"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        <Icon size={18} />
      </IconButton>
    </>
  );
};
