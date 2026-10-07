import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from 'react';

interface useMessengerLoadStateProps {
  ref: RefObject<HTMLDivElement | null>;
  selector: string;
  timeoutMs?: number;
}

type MessengerLoadState = 'idle' | 'loading' | 'ready' | 'stuck';

export const useMessengerLoadState = ({
  ref,
  selector,
  timeoutMs = 10000,
}: useMessengerLoadStateProps) => {
  const [loadState, setLoadState] = useState<MessengerLoadState>('idle');
  const timerRef = useRef<number | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    timerRef.current = setTimeout(() => {
      setLoadState('stuck');
    }, timeoutMs);
  }, [timeoutMs, stopTimer]);

  const reloadTimer = useCallback(() => {
    setLoadState('loading');
    startTimer();
  }, [startTimer]);

  useEffect(() => {
    const root = ref.current;

    if (!root) return;

    const hasSpinner = () => Boolean(root.querySelector(selector));

    const obs = new MutationObserver(() => {
      if (hasSpinner()) {
        setLoadState((prev) =>
          prev === 'ready' || prev === 'idle' ? 'loading' : prev,
        );
        startTimer();
      } else {
        setLoadState('ready');
        stopTimer();
      }
    });

    obs.observe(root, {
      childList: true,
      subtree: true,
    });

    if (hasSpinner()) {
      setLoadState('loading');
      startTimer();
    }

    return () => {
      obs.disconnect();
      stopTimer();
    };
  }, [ref, selector, startTimer, stopTimer]);

  return { loadState, reloadTimer };
};
