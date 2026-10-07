import type { OtpCreateCommandResult } from '@/shared/api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { powChallengeThunk } from './powChallengeThunk';
import { powSolveThunk } from './solvePowThunk';
import { fingerprintThunk } from './fingerprintThunk';
import { otpRequestThunk } from './otpRequestThunk';
import { isDev } from '@/shared/lib';
import type { ProblemDetails } from '@/shared/model';
import { parseAxiosError } from '@/shared/lib';
import type { ThunkConfig } from '@/shared/config';

export const otpRequestFlowThunk = createAsyncThunk<
  OtpCreateCommandResult,
  void,
  ThunkConfig<ProblemDetails>
>(
  'otpAuth/otpFlow',
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;

    try {
      await dispatch(powChallengeThunk()).unwrap();
      await dispatch(powSolveThunk()).unwrap();
      await dispatch(fingerprintThunk()).unwrap();
      const response = await dispatch(otpRequestThunk()).unwrap();
      return response;
    } catch (err) {
      if (isDev) console.error('[otpRequestFlowThunk] failed', err);

      return rejectWithValue(parseAxiosError(err));
    }
  },
  {
    condition: (_, { getState }) => {
      return getState().otp.isLoading.otpFlow.status !== 'loading';
    },
  }
);
