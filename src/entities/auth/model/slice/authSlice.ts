import { createSlice, isAnyOf, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthSchema, AuthStatus } from '../types/authSchema';
import { refreshThunk } from '../thunks/refreshThunk';
import { loginThunk } from '../thunks/loginThunk';
import { logoutThunk } from '../thunks/logoutThunk';
import { logoutAllThunk } from '../thunks/logoutAllThunk';
import { getEmailFromToken } from '../../lib/getEmailFromToken';

const initialState: AuthSchema = {
  status: 'unknown',
  refreshLoading: 'idle',
  loginhLoading: 'idle',
  logoutLoading: 'idle',
  refreshError: null,
  loginError: null,
  logoutError: null,
  sub: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<AuthStatus>) {
      state.status = action.payload;
    },
    clearLoginError(state) {
      state.loginError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshThunk.pending, (state) => {
        state.refreshLoading = 'loading';
        state.refreshError = null;
      })
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.refreshLoading = 'idle';
        state.status = 'authorized';
        state.sub = getEmailFromToken(action.payload.access_token);
      })
      .addCase(refreshThunk.rejected, (state, action) => {
        state.refreshLoading = 'failed';
        state.status = 'unauthorized';
        state.refreshError = action.payload ?? { detail: 'refresh failed' };
      })
      .addCase(loginThunk.pending, (state) => {
        state.loginhLoading = 'loading';
        state.loginError = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loginhLoading = 'idle';
        state.status = 'authorized';
        state.sub = getEmailFromToken(action.payload.access_token);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loginhLoading = 'failed';
        state.status = 'unauthorized';
        state.loginError = action.payload ?? { detail: 'login failed' };
      })
      .addMatcher(
        isAnyOf(logoutThunk.pending, logoutAllThunk.pending),
        (state) => {
          state.logoutLoading = 'loading';
          state.logoutError = null;
        }
      )
      .addMatcher(
        isAnyOf(logoutThunk.fulfilled, logoutAllThunk.fulfilled),
        (state) => {
          state.logoutLoading = 'idle';
          state.status = 'unauthorized';
          state.sub = null;
        }
      )
      .addMatcher(
        isAnyOf(logoutThunk.rejected, logoutAllThunk.rejected),
        (state, action) => {
          state.logoutLoading = 'failed';
          state.status = 'unauthorized';
          state.sub = null;
          state.logoutError = action.payload ?? { detail: 'logout failed' };
        }
      );
  },
});

export const { setStatus, clearLoginError } = authSlice.actions;
export const authReducer = authSlice.reducer;
