
import { createAsyncThunk } from '@reduxjs/toolkit';
import { solvePow } from '../../lib/solvePow';
import { isDev } from '@/shared/lib';
import { selectPowChallenge } from '../selectors/powSelectors';
import type { ProblemDetails } from '@/shared/model';
import { parseAxiosError } from '@/shared/lib';
import type { ThunkConfig } from '@/shared/config';

export const powSolveThunk = createAsyncThunk<
  string,
  void,
  ThunkConfig<ProblemDetails>
>('otpAuth/solvePow', async (_, thunkAPI) => {
  const { rejectWithValue, signal, getState } = thunkAPI;
  const state = getState();
  const powChallenge = selectPowChallenge(state);

  if (!powChallenge) {
    return rejectWithValue({ detail: 'pow challenge is missing' });
  }

  const { prefix, salt, difficulty } = powChallenge;

  try {
    const response = await solvePow(
      {
        prefix,
        salt,
        difficulty,
      },
      signal
    );

    return String(response.nonce);
  } catch (err) {
    if (signal.aborted) {
      return rejectWithValue({ detail: 'PoW canceled' });
    }

    if (isDev) console.error('[powSolveThunk] failed:', err);

    return rejectWithValue(parseAxiosError(err));
  }
});
