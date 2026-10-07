import { accessTokenStorage, type UserLoginCommand, type UserLoginCommandResult } from '@/shared/api';
import { isDev } from '@/shared/lib';
import type { ProblemDetails } from '@/shared/model';
import { parseAxiosError } from '@/shared/lib';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkConfig } from '@/shared/config';

export const loginThunk = createAsyncThunk<
  UserLoginCommandResult,
  UserLoginCommand,
  ThunkConfig<ProblemDetails>
>('auth/login', async (loginData, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;

  const { email, otp_uuid, otp_code } = loginData;
  try {
    const response = await extra.api.auth.login({
      email,
      otp_uuid,
      otp_code,
    });

    if (!response.data.access_token) {
      return rejectWithValue({ detail: 'Login failed' });
    }

    accessTokenStorage.set(response.data.access_token);

    return response.data;
  } catch (err) {
    if (isDev) console.error('[loginThunk] failed: ', err);
    return rejectWithValue(parseAxiosError(err));
  }
});
