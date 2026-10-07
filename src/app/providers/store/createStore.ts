import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '@/entities/auth';
import { apiClient } from '@/shared/api';
import { otpAuthReducer } from '@/features/auth-by-email-otp';
import type { ThunkExtraArg } from '@/shared/config';
import { messengerAccountReducer } from '@/features/messenger';

const extraArg: ThunkExtraArg = {
  api: apiClient,
};

export const createStore = () => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      otp: otpAuthReducer,
      messenger: messengerAccountReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
      }),
  });

  return store;
};
