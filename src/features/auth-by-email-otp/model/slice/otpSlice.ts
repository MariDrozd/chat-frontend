import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { LoadingMap, OpState, OtpSchema } from '../types/otpSchema';
import { powChallengeThunk } from '../thunks/powChallengeThunk';
import { powSolveThunk } from '../thunks/solvePowThunk';
import { fingerprintThunk } from '../thunks/fingerprintThunk';
import { otpRequestThunk } from '../thunks/otpRequestThunk';
import { otpRequestFlowThunk } from '../thunks/optRequestFlowThunk';

const opIdle = (): OpState => ({ status: 'idle', error: null });

const initialLoading: LoadingMap = {
  powChallenge: opIdle(),
  powSolve: opIdle(),
  fingerprint: opIdle(),
  turnstile: opIdle(),
  otpRequest: opIdle(),
  otpFlow: opIdle(),
  login: opIdle(),
};

const initialState: OtpSchema = {
  isLoading: initialLoading,
  email: null,
  powChallenge: null,
  powNonce: null,
  fingerprint: null,
  turnstileToken: null,
  otp: {
    otpUuid: null,
    banExpiresAt: null,
  },
};

const otpAuthSlice = createSlice({
  name: 'otpAuth',
  initialState,
  reducers: {
    setEmailFromForm(state, action: PayloadAction<string>) {
      state.email = action.payload;
      state.otp.otpUuid = null;
      state.otp.banExpiresAt = null;
      state.isLoading.otpFlow.error = null;
      state.isLoading.otpRequest.error = null;
    },
    turnstileStarted(state) {
      state.isLoading.turnstile.status = 'loading';
      state.isLoading.turnstile.error = null;
      state.turnstileToken = null;
    },
    turnstileSucceeded(state, action: PayloadAction<string>) {
      state.isLoading.turnstile.status = 'succeeded';
      state.isLoading.turnstile.error = null;
      state.turnstileToken = action.payload;
    },
    turnstileFailed(state, action: PayloadAction<string>) {
      state.isLoading.turnstile.status = 'failed';
      state.isLoading.turnstile.error = action.payload;
      state.turnstileToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(powChallengeThunk.pending, (state) => {
        state.isLoading.powChallenge.status = 'loading';
        state.isLoading.powChallenge.error = null;
      })
      .addCase(powChallengeThunk.fulfilled, (state, action) => {
        state.isLoading.powChallenge.status = 'succeeded';
        state.powChallenge = action.payload.pow_challenge;
      })
      .addCase(powChallengeThunk.rejected, (state, action) => {
        state.isLoading.powChallenge.status = 'failed';
        state.isLoading.powChallenge.error =
          action.payload ?? action.error.message ?? 'pow challenge failed';
      })
      .addCase(powSolveThunk.pending, (state) => {
        state.isLoading.powSolve.status = 'loading';
        state.isLoading.powSolve.error = null;
      })
      .addCase(powSolveThunk.fulfilled, (state, action) => {
        state.isLoading.powSolve.status = 'succeeded';
        state.powNonce = action.payload;
      })
      .addCase(powSolveThunk.rejected, (state, action) => {
        state.isLoading.powSolve.status = 'failed';
        state.isLoading.powSolve.error =
          action.payload ?? action.error.message ?? 'pow solve failed';
      })
      .addCase(fingerprintThunk.pending, (state) => {
        state.isLoading.fingerprint.status = 'loading';
        state.isLoading.fingerprint.error = null;
      })
      .addCase(fingerprintThunk.fulfilled, (state, action) => {
        state.isLoading.fingerprint.status = 'succeeded';
        state.fingerprint = action.payload;
      })
      .addCase(fingerprintThunk.rejected, (state, action) => {
        state.isLoading.fingerprint.status = 'failed';
        state.isLoading.fingerprint.error =
          action.payload ?? action.error.message ?? 'fingerprint failed';
      })
      .addCase(otpRequestThunk.pending, (state) => {
        state.isLoading.otpRequest.status = 'loading';
        state.isLoading.otpRequest.error = null;
        state.otp.otpUuid = null;
        state.otp.banExpiresAt = null;
      })
      .addCase(otpRequestThunk.fulfilled, (state, action) => {
        state.isLoading.otpRequest.status = 'succeeded';
        state.otp.otpUuid = action.payload.otp_uuid ?? null;
        state.otp.banExpiresAt = action.payload.ban_expires_at ?? null;
      })
      .addCase(otpRequestThunk.rejected, (state, action) => {
        state.isLoading.otpRequest.status = 'failed';
        state.turnstileToken = null;
        state.isLoading.otpRequest.error =
          action.payload ?? action.error.message ?? 'otp request failed';
      })
      .addCase(otpRequestFlowThunk.pending, (state) => {
        state.isLoading.otpFlow.status = 'loading';
        state.isLoading.otpFlow.error = null;
      })
      .addCase(otpRequestFlowThunk.fulfilled, (state) => {
        state.isLoading.otpFlow.status = 'succeeded';
        state.isLoading.otpFlow.error = null;
      })
      .addCase(otpRequestFlowThunk.rejected, (state, action) => {
        state.isLoading.otpFlow.status = 'failed';
        state.turnstileToken = null;
        state.isLoading.otpFlow.error =
          action.payload ?? action.error.message ?? 'otp flow failed';
      });
  },
});

export const {
  setEmailFromForm,
  turnstileStarted,
  turnstileSucceeded,
  turnstileFailed,
} = otpAuthSlice.actions;
export const otpAuthReducer = otpAuthSlice.reducer;
