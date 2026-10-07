import type { UserRefreshCommandResult } from '@/shared/api';
import { accessTokenStorage } from '@/shared/api';
import type { ThunkConfig } from '@/shared/config';
import { isDev, parseAxiosError } from '@/shared/lib';
import type { ProblemDetails } from '@/shared/model';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const refreshThunk = createAsyncThunk<
  UserRefreshCommandResult,
  { force?: boolean } | void,
  ThunkConfig<ProblemDetails>
>(
  'auth/refresh',
  async (_, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
      const response = await extra.api.auth.refresh(
        {},
        { skipAuthRefresh: true }
      );
      const token = response.data.access_token;
      if (!token) {
        return rejectWithValue({ detail: 'Refresh token is missing' });
      }
      accessTokenStorage.set(token);

      return response.data;
    } catch (err) {
      if (isDev) console.error('Refresh error: ', err);

      return rejectWithValue(parseAxiosError(err));
    }
  },
  {
    condition: (arg, { getState }) => {
      const loadingStatus = getState().auth.refreshLoading;
      const authStatus = getState().auth.status;

      if (loadingStatus === 'loading') return false;

      if (!arg?.force && authStatus !== 'unknown') return false;

      return true;
    },
  }
);
