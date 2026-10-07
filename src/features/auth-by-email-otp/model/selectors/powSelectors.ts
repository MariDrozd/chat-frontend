export const selectPowUuid = (state: RootState) => state.otp.powChallenge?.uuid;

export const selectPowChallengeNonce = (state: RootState) => state.otp.powNonce;

export const selectPowChallenge = (state: RootState) => state.otp.powChallenge;
