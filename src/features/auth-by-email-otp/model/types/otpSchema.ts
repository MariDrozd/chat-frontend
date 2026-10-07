import type { PowChallengeDto } from '@/shared/api';
import type { LoadingStatus, ProblemDetails } from '@/shared/model';

type OtpOp =
  | 'powChallenge'
  | 'powSolve'
  | 'fingerprint'
  | 'turnstile'
  | 'otpRequest'
  | 'otpFlow'
  | 'login';

export type OpState = {
  status: LoadingStatus;
  error: ProblemDetails | string | null;
};

export type LoadingMap = Record<OtpOp, OpState>;

export interface OtpSchema {
  isLoading: LoadingMap;
  email: string | null;
  powChallenge: PowChallengeDto | null;
  powNonce: string | null;
  fingerprint: string | null;
  turnstileToken: string | null;
  otp: {
    otpUuid: string | null;
    banExpiresAt: string | null;
  };
}
