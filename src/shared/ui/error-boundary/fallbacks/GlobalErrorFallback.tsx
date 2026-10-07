import type { ReactNode } from 'react';
import type { ErrorFallback } from './type';
import { accessTokenStorage } from '@/shared/api';

export function GlobalErrorFallback({
  error,
  reset,
}: ErrorFallback): ReactNode {
  return (
    <div className="p-[16px]">
      <h2 className="text-[18px] font-semibold">Something went wrong</h2>
      <div className="mt-[8px] text-[12px] opacity-80">
        Try again or reload the page
      </div>
      <div className="mt-[12px] text-[12px] opacity-70">
        Info: {error.message}
      </div>
      <div className="mt-[16px] flex gap-[8px]">
        <button onClick={reset}>Try again</button>
        <button onClick={() => window.location.reload()}>
          Reload the page
        </button>
        <button
          onClick={() => {
            accessTokenStorage.clear();
            window.location.reload();
          }}
        >
          Clear the session
        </button>
      </div>
    </div>
  );
}
