import { createSelector } from '@reduxjs/toolkit';

export const selectBanInfo = (state: RootState) => state.otp.otp.banExpiresAt;

export const selectOtpUuid = (state: RootState) => state.otp.otp.otpUuid;

export const selectBanTimMs = createSelector([selectBanInfo], (ban) => {
  if (ban === null) return null;
  const banTime = Date.parse(ban);
  if (Number.isNaN(banTime)) return null;

  return banTime;
});
