import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      height: {
        navbar: 'var(--navbar-height)',
      },
    },
  },
};

export default config;
