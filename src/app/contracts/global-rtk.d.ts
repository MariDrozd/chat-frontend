import type {
  RootState as AppRootState,
  AppDispatch as AppAppDispatch,
} from '@/app/providers/store/store';

declare global {
  type RootState = AppRootState;
  type AppDispatch = AppAppDispatch;
}

export {};
