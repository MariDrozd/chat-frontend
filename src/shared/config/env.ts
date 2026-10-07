const required = (value: string | undefined, name: string): string => {
  if (!value) {
    throw new Error(`Env variable ${name} is required but not set`);
  }
  return value;
};

export const env = {
  MODE: import.meta.env.MODE as 'development' | 'production',
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
  STATE_API_URL: required(
    import.meta.env.VITE_STATE_API_URL,
    'VITE_STATE_API_URL'
  ),
  TURNSTILE_SITE_KEY: required(
    import.meta.env.VITE_TURNSTILE_SITE_KEY,
    'VITE_TURNSTILE_SITE_KEY'
  ),
} as const;
