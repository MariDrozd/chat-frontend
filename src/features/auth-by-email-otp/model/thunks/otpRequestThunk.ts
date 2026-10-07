import { createAsyncThunk } from '@reduxjs/toolkit';
import { isDev } from '@/shared/lib';
import type { OtpCreateCommandResult } from '@/shared/api';
import { selectFormEmail } from '../selectors/emailSelector';
import { selectFingerprint } from '../selectors/fingerprintSelectors';
import { selectTurnstileToken } from '../selectors/turnstileSelectors';
import {
  selectPowChallengeNonce,
  selectPowUuid,
} from '../selectors/powSelectors';
import type { ProblemDetails } from '@/shared/model';
import { parseAxiosError } from '@/shared/lib';
import type { ThunkConfig } from '@/shared/config';

export const otpRequestThunk = createAsyncThunk<
  OtpCreateCommandResult,
  void,
  ThunkConfig<ProblemDetails>
>(
  'otpAuth/otpRequest',
  async (_, thunkAPI) => {
    const { rejectWithValue, getState, extra } = thunkAPI;

    const state = getState();

    const email = selectFormEmail(state);
    const fingerprint = selectFingerprint(state);
    const turnstileToken = selectTurnstileToken(state);
    const powUid = selectPowUuid(state);
    const powNonce = selectPowChallengeNonce(state);

    if (!email) return rejectWithValue({ detail: 'Email missing' });
    if (!fingerprint) return rejectWithValue({ detail: 'Fingerprint missing' });
    if (!turnstileToken)
      return rejectWithValue({ detail: 'Turnstile token missing' });
    if (!powUid) return rejectWithValue({ detail: 'Pow uuid missing' });
    if (!powNonce) return rejectWithValue({ detail: 'Pow nonce missing' });

    try {
      const response = await extra.api.otp.createOtp({
        email,
        pow_challenge_uuid: powUid,
        pow_challenge_nonce: powNonce,
        fingerprint,
        turnstile_token: turnstileToken,
      });

      return response.data;
    } catch (err) {
      if (isDev) console.error('[otpRequestThunk] failed:', err);

      return rejectWithValue(parseAxiosError(err));
    }
  },
  {
    condition: (_, { getState } ) => {
      const status = getState().otp.isLoading.otpRequest.status;

      return status !== 'loading';
    },
  }
);
