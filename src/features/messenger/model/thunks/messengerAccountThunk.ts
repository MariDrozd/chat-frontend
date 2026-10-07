import type { MessengerAccountGetQueryResult } from '@/shared/api';
import type { ThunkConfig } from '@/shared/config';
import { isDev, parseAxiosError } from '@/shared/lib';
import type { ProblemDetails } from '@/shared/model';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const messengerAccountThunk = createAsyncThunk<
  MessengerAccountGetQueryResult,
  void,
  ThunkConfig<ProblemDetails>
>(
  'messenger/messengerAccount',
  async (_, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
      const response = await extra.api.messenger.getMessengerAccount();

      return response.data;
    } catch (err) {
      if (isDev) console.error('[messengerAccountThunk] failed', err);
      return rejectWithValue(parseAxiosError(err));
    }
  },
  {
    condition: (_, { getState }) => {
      const status = getState().messenger.loading;

      return status !== 'loading';
    },
  }
);
