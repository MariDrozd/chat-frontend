import { env } from '@/shared/config/env';
import {
  Configuration,
  MessengerAccountApiFactory,
  OtpApiFactory,
  PowChallengeApiFactory,
  UserApiFactory,
} from './services';
import { $api } from '../http';

export const openApiConfig = new Configuration({
  basePath: env.STATE_API_URL,
});

export const apiClient = {
  auth: UserApiFactory(openApiConfig, env.STATE_API_URL, $api),
  pow: PowChallengeApiFactory(openApiConfig, env.STATE_API_URL, $api),
  otp: OtpApiFactory(openApiConfig, env.STATE_API_URL, $api),
  messenger: MessengerAccountApiFactory(openApiConfig, env.STATE_API_URL, $api),
};

export type ApiClient = typeof apiClient;
