import { routePath } from '@/shared/config';
import { clearLoginError, loginThunk, selectLoginError } from '@/entities/auth';
import { isDev } from '@/shared/lib';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { Button } from '@/shared/ui/button';
import { FormCard } from '@/shared/ui/form-card';
import { cn } from '@/shared/lib';
import { getTextError } from '@/shared/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import * as z from 'zod';
import { selectFormEmail } from '../model/selectors/emailSelector';
import { selectOtpUuid } from '../model/selectors/otpRequestSelectors';
import { verifyOtpErrorMap } from '../model/errors/verifyOtpErrorMap';
import { RequestNewOtpButton } from './RequestNewOtpButton';
import type { ProblemDetails } from '@/shared/model';

const otpCodeSchema = z.object({
  code: z.string().regex(/^\d{5}$/, 'Код должен содержать 5 цифр'),
});

type OtpCodeValues = z.infer<typeof otpCodeSchema>;

export const VerifyOtpStep = () => {
  const [isOtpExpired, setIsOtpExpired] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const email = useAppSelector(selectFormEmail);
  const otpUuid = useAppSelector(selectOtpUuid);
  const loginError = useAppSelector(selectLoginError);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<OtpCodeValues>({
    resolver: zodResolver(otpCodeSchema),
    mode: 'onTouched',
    defaultValues: { code: '' },
  });

  const onSubmitHandler = async (values: OtpCodeValues) => {
    if (!email || !otpUuid) {
      return;
    }

    try {
      await dispatch(
        loginThunk({
          email,
          otp_uuid: otpUuid,
          otp_code: String(values.code),
        }),
      );

      navigate(routePath.MESSENGER_ACCOUNT);
    } catch (err) {
      const problem = err as Partial<ProblemDetails>;

      if (problem.detail?.toLowerCase().includes('otp is expired')) {
        setIsOtpExpired(true);
        return;
      }

      if (isDev) console.error('OtpCodeSubmit error', err);
    }
  };

  const isSessionActive = Boolean(email && otpUuid);

  const canSubmit = isValid && !isSubmitting && isSessionActive;

  const getDisabledReason = () => {
    if (isSubmitting) return 'Выполняется вход...';
    if (!isValid) return 'Введите 5-ти значный код';
    return null;
  };

  const disabledReason = getDisabledReason();

  if (!isSessionActive) {
    return (
      <FormCard
        title="Сессия истекла"
        subtitle="Запросите код ещё раз, чтобы войти."
      >
        <RequestNewOtpButton />
      </FormCard>
    );
  }

  if (isOtpExpired) {
    return (
      <FormCard
        title="Срок действия кода истек"
        subtitle="Запросите код ещё раз, чтобы войти."
      >
        <RequestNewOtpButton />
      </FormCard>
    );
  }

  return (
    <FormCard
      title="Подтверждение"
      subtitle={
        <>
          Код отправлен{email && <span> на {email}</span>}. Если письмо не
          пришло, проверьте папку «Спам».
        </>
      }
    >
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex flex-col gap-8 w-full"
      >
        <div className="ui-field">
          <label htmlFor="code" className="text-sm text-fg-secondary">
            Введите 5-ти значный код
          </label>
          <input
            id="code"
            {...register('code', {
              onChange: (e) => {
                e.target.value = e.target.value.replace(/\D/g, '').slice(0, 5);
                if (loginError) dispatch(clearLoginError());
              },
            })}
            placeholder="12345"
            autoFocus
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={5}
            className={cn('ui-input', errors.code && 'ui-input--error')}
          />
          <div className={cn('ui-hint', errors.code && 'ui-hint--error')}>
            {errors.code?.message}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Button
            variant="secondary"
            onClick={() => navigate(routePath.AUTH_EMAIL)}
            type="button"
          >
            Назад
          </Button>
          <div className="ui-field">
            <Button type="submit" disabled={!canSubmit} variant="primary">
              Войти
            </Button>
            <div className="ui-hint">{disabledReason}</div>

            <div className="ui-hint ui-hint--error">
              {loginError && getTextError(loginError, verifyOtpErrorMap)}
            </div>
          </div>
        </div>
      </form>
    </FormCard>
  );
};
