import { accessTokenStorage } from '@/shared/api';
import type { ProblemDetails } from '@/shared/model';
import { parseAxiosError } from '@/shared/lib';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkConfig } from '@/shared/config';

export const logoutThunk = createAsyncThunk<
  void,
  void,
  ThunkConfig<ProblemDetails>
>('auth/logout', async (_, thunkAPI) => {
  const { extra, rejectWithValue } = thunkAPI;
  try {
    await extra.api.auth.logout({});

    return;
  } catch (err) {
    const e = err as any;
    console.error('logoutThunk failed', {
      url: e?.config?.url,
      baseURL: e?.config?.baseURL,
      method: e?.config?.method,
      status: e?.response?.status,
      skipAuthRefresh: e?.config?.skipAuthRefresh,
    });
    return rejectWithValue(parseAxiosError(err));
  } finally {
    accessTokenStorage.clear();
  }
});
