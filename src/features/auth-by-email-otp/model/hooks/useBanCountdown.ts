import { useCountdown } from '@/shared/lib';
import { useEffect, useRef } from 'react';

export const useBanCountdown = (expiresMs: number | null) => {
  const leftSec = useCountdown(expiresMs);
  const isBanned = leftSec > 0;

  const wasBannedRef = useRef(false);

  useEffect(() => {
    if (isBanned) {
      wasBannedRef.current = true;
    }
  }, [isBanned]);

  return { leftSec, isBanned, wasBannedRef };
};
