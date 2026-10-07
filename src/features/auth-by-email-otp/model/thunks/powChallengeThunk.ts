import type { PowChallengeCreateCommandResult } from '@/shared/api';
import type { ProblemDetails } from '@/shared/model';
import { parseAxiosError, isDev } from '@/shared/lib';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkConfig } from '@/shared/config';

export const powChallengeThunk = createAsyncThunk<
  PowChallengeCreateCommandResult,
  void,
  ThunkConfig<ProblemDetails>
>('otpAuth/powChallenge', async (_, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;
  try {
    const response = await extra.api.pow.createPowChallenge();

    if (!response) {
      return rejectWithValue({ detail: 'Otp pow failed' });
    }

    return response.data;
  } catch (err) {
    if (isDev) console.error('[powChallengeThunk] failed:', err);

    return rejectWithValue(parseAxiosError(err));
  }
});
