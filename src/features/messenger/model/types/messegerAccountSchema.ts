import type { MessengerAccountGetQueryResult } from '@/shared/api';
import type { LoadingStatus, ProblemDetails } from '@/shared/model';

export interface MessegerAccountSchema {
  loading: LoadingStatus;
  error: ProblemDetails | string | null;
  messengerAccount: MessengerAccountGetQueryResult | null;
}
