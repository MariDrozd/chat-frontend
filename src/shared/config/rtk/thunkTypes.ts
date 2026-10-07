import type { ApiClient } from '@/shared/api';

export interface ThunkExtraArg {
  api: ApiClient;
}

export interface ThunkConfig<T> {
  rejectValue: T;
  extra: ThunkExtraArg;
  state: RootState;
}
