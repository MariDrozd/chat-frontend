export const selectAuthStatus = (state: RootState) => state.auth.status;

export const selectIsAuthorized = (state: RootState) =>
  state.auth.status === 'authorized';

export const selectIsUnauthorized = (state: RootState) =>
  state.auth.status === 'unauthorized';

export const selectIsUnknown = (state: RootState) =>
  state.auth.status === 'unknown';

export const selectLoginError = (state: RootState) => state.auth.loginError;

export const selectIsLogoutLoading = (state: RootState) =>
  state.auth.logoutLoading === 'loading';
