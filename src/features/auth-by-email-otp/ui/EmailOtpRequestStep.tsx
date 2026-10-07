import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { useNavigate } from 'react-router';
import { routePath } from '@/shared/config';
import { useRef } from 'react';
import { useCountdown } from '@/shared/lib';
import { cn } from '@/shared/lib';
import { isDev } from '@/shared/lib';
import { FormCard } from '@/shared/ui/form-card';
import { getTextError } from '@/shared/lib';
import { Button } from '@/shared/ui/button';
import { IconButton } from '@/shared/ui/icon-button';
import { TurnstileWidget, type TurnstileWidgetHandle } from './TurnstileWidget';
import {
  selectTurnstileError,
  selectTurnstileToken,
} from '../model/selectors/turnstileSelectors';
import {
  selectOtpFlowError,
  selectOtpFlowStatus,
} from '../model/selectors/otpFlowSelectors';
import { selectBanTimMs } from '../model/selectors/otpRequestSelectors';
import { formatTime } from '../lib/formatTime';
import { setEmailFromForm } from '../model/slice/otpSlice';
import { otpRequestFlowThunk } from '../model/thunks/optRequestFlowThunk';
import { requestOtpErrorMap } from '../model/errors/requestOtpErrorMap';

const emailSchema = z.object({
  email: z.string().trim().email('Некорректный email'),
});

type EmailFormValues = z.infer<typeof emailSchema>;

export const EmailOtpRequestStep = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const turnstileRef = useRef<TurnstileWidgetHandle | null>(null);

  const turnstileToken = useAppSelector(selectTurnstileToken);
  const requestStatus = useAppSelector(selectOtpFlowStatus);
  const requestError = useAppSelector(selectOtpFlowError);
  const turnstileError = useAppSelector(selectTurnstileError);
  const banExpires = useAppSelector(selectBanTimMs);
  const leftSec = useCountdown(banExpires);
  const isBanned = banExpires !== null && leftSec > 0;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
    },
  });

  const isLoading = requestStatus === 'loading' || isSubmitting;

  const getDisabledReason = () => {
    if (isLoading) return 'Отправка…';
    if (isBanned)
      return `Код недоступен. Повторить запрос можно через ${formatTime(
        leftSec
      )}`;
    if (!isValid) return 'Введите email';
    if (!turnstileToken)
      return 'Пройдите проверку “Я не робот” (если не появляется — нажмите ↻)';
    return null;
  };

  const disabledReason = getDisabledReason();
  const canSubmit = disabledReason === null;

  const onRefreshTurnstile = () => {
    turnstileRef.current?.reset();
  };

  const onSubmitHandler = async (values: EmailFormValues) => {
    dispatch(setEmailFromForm(values.email));
    try {
      const response = await dispatch(otpRequestFlowThunk()).unwrap();

      if (response.otp_uuid && !response.ban_expires_at) {
        navigate(routePath.AUTH_OTP);
      }
    } catch (err) {
      turnstileRef.current?.reset();
      if (isDev) console.error('OtpFlowSubmit error', err);
    }
  };

	return (
    <FormCard title="Вход" subtitle="Для входа введите адрес электронной почты">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col items-center gap-8 w-full"
      >
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="email" className="text-sm text-fg-secondary">
            Email
          </label>
          <div className="ui-field">
            <input
              id="email"
              {...register('email')}
              placeholder="name@mail.com"
              autoFocus
              type="email"
              inputMode="email"
              autoComplete="email"
              className={cn('ui-input', errors.email && 'ui-input--error')}
            />
            <div className={cn('ui-hint', errors.email && 'ui-hint--error')}>
              {errors.email
                ? errors.email.message
                : 'Код подтверждения будет отправлен на указанный адрес'}
            </div>
          </div>
        </div>

        <div className="ui-field">
          <div className="flex gap-2 items-center">
            <TurnstileWidget ref={turnstileRef} />
            <IconButton
              type="button"
              size="s"
              variant="ghost"
              shape="pill"
              onClick={onRefreshTurnstile}
              disabled={isLoading}
              aria-label="Обновить проверку"
              title="Обновить проверку"
            >
              ↻
            </IconButton>
          </div>
          {/* убрать */}
          <div className={cn('ui-hint', turnstileError && 'ui-hint--error')}>
            {turnstileError && getTextError(turnstileError, requestOtpErrorMap)}
          </div>
        </div>
        <div className="ui-field">
          <Button type="submit" disabled={!canSubmit} variant="primary" className='w-full'>
            Отправить код
          </Button>
          <div className="ui-hint">{disabledReason}</div>
          <div className={cn('ui-hint', requestError && 'ui-hint--error')}>
            {requestError && getTextError(requestError, requestOtpErrorMap)}
          </div>
        </div>
      </form>
    </FormCard>
  );
};
