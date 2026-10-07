export const selectOtpFlowStatus = (state: RootState) =>
  state.otp.isLoading.otpFlow.status;
export const selectOtpFlowError = (state: RootState) =>
  state.otp.isLoading.otpFlow.error;
