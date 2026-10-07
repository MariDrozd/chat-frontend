import type { ReactNode } from 'react';
import type { ErrorFallback } from './type';
import { useNavigate } from 'react-router';
import { accessTokenStorage } from '@/shared/api';

export function AuthErrorFallback({ error, reset }: ErrorFallback): ReactNode {
  const navigate = useNavigate();

  return (
    <div className="p-[16px]">
      <h2 className="text-[18px] font-semibold">Error on authorization page</h2>
      <div className="mt-[8px] text-[12px] opacity-80">
        Try entering again or reload the page
      </div>
      <div className="mt-[12px] text-[12px] opacity-70">
        Info: {error.message}
      </div>
      <div className="mt-[16px] flex gap-[8px]">
        <button onClick={reset}>Try again</button>
        <button
          onClick={() => {
            accessTokenStorage.clear();
            navigate('/auth/mail', { replace: true });
          }}
        >
          Return to start authorization
        </button>
      </div>
    </div>
  );
}
