export const selectTurnstileToken = (state: RootState) =>
  state.otp.turnstileToken;

export const selectTurnstileError = (state: RootState) =>
  state.otp.isLoading.turnstile.error;
