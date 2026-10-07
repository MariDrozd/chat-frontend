import { accessTokenStorage } from '@/shared/api';
import { isDev } from '@/shared/lib';
import type { ProblemDetails } from '@/shared/model';
import { parseAxiosError } from '@/shared/lib';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkConfig } from '@/shared/config';

export const logoutAllThunk = createAsyncThunk<
  void,
  void,
  ThunkConfig<ProblemDetails>
>('auth/logoutAll', async (_, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;
  try {
    await extra.api.auth.logoutAll({});

    return;
  } catch (err) {
    if (isDev) console.error('[logoutAllThunk] failed: ', err);
    return rejectWithValue(parseAxiosError(err));
  } finally {
    accessTokenStorage.clear();
  }
});
