import { useEffect, useState } from 'react';

export const useCountdown = (expiresMs: number | null) => {
  const [leftTimeSec, setLeftTimeSec] = useState<number>(0);

  useEffect(() => {
    if (expiresMs === null) {
      setLeftTimeSec(0);
      return;
    }

    const tick = () => {
      const leftMs = expiresMs - Date.now();
      const leftSec = Math.max(0, Math.ceil(leftMs / 1000));
      setLeftTimeSec(leftSec);
      return leftSec;
    };

    let current = tick();
    if (current === 0) return;

    const tickInterval = setInterval(() => {
      current = tick();
      if (current === 0) clearInterval(tickInterval);
    }, 1000);

    return () => clearInterval(tickInterval);
  }, [expiresMs]);

  return leftTimeSec;
};
