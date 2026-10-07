import { useAppDispatch } from '@/shared/lib';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { turnstileFailed, turnstileSucceeded } from '../model/slice/otpSlice';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { isDev } from '@/shared/lib';
import { env } from '@/shared/config';

export type TurnstileWidgetHandle = { reset: () => void };

export const TurnstileWidget = forwardRef<TurnstileWidgetHandle>(
  function TurnstileWidget(_, ref) {
    const dispatch = useAppDispatch();
    const widgetRef = useRef<TurnstileInstance | null>(null);

    useImperativeHandle(
      ref,
      () => ({
        reset: () => {
          widgetRef.current?.reset?.();
        },
      }),
      []
    );

    const onSuccessHandler = useCallback(
      (token: string) => {
        dispatch(turnstileSucceeded(token));
      },
      [dispatch]
    );

    const onErrorHandler = useCallback(
      (errorCode: string) => {
        dispatch(turnstileFailed(errorCode));
        if (isDev) console.error('Turnstile failed:', errorCode);
      },
      [dispatch]
    );

    const onExpireHandler = useCallback(() => {
      dispatch(turnstileFailed('expired'));
      if (isDev) console.error('Turnstile token expired');
    }, [dispatch]);

    const onTimeoutHandler = useCallback(() => {
      dispatch(turnstileFailed('timeout'));
      if (isDev) console.error('Turnstile challenge timed out');
    }, [dispatch]);

    return (
      <Turnstile
        ref={widgetRef}
        siteKey={env.TURNSTILE_SITE_KEY}
        onSuccess={onSuccessHandler}
        onError={onErrorHandler}
        onExpire={onExpireHandler}
        onTimeout={onTimeoutHandler}
        options={{
          size: 'flexible',
        }}
      />
    );
  }
);
