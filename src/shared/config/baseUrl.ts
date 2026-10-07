import { env } from './env';

export const API_BASE_URL = env.IS_DEV ? '/api' : env.STATE_API_URL;
