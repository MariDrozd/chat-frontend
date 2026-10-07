import { createAsyncThunk } from '@reduxjs/toolkit';
import { isDev } from '@/shared/lib';
import type { ProblemDetails } from '@/shared/model';
import { parseAxiosError } from '@/shared/lib';
import { getFingerprintVisitorId } from '../../api/getFingerprintVisitorId';
import type { ThunkConfig } from '@/shared/config';

export const fingerprintThunk = createAsyncThunk<
  string,
  void,
  ThunkConfig<ProblemDetails>
>('otpAuth/fingerprint', async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await getFingerprintVisitorId();

    return response;
  } catch (err) {
    if (isDev) console.error('[fingerprintThunk] failed:', err);

    return rejectWithValue(parseAxiosError(err));
  }
});
