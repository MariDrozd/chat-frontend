import type { LoadingStatus, ProblemDetails } from '@/shared/model';

export type AuthStatus = 'unknown' | 'authorized' | 'unauthorized';

export interface AuthSchema {
  status: AuthStatus;
  refreshLoading: LoadingStatus;
  loginhLoading: LoadingStatus;
  logoutLoading: LoadingStatus;
  refreshError?: ProblemDetails | null;
  loginError?: ProblemDetails | null;
  logoutError?: ProblemDetails | null;
  sub: string | null;
}
