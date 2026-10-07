import { FormCard } from '@/shared/ui/form-card';
import { Button } from '@/shared/ui/button';
import { cn, getTextError } from '@/shared/lib';
import { logoutErrorMap } from '@/entities/auth';

interface LogoutFormProps {
  onLogout: () => void;
  onLogoutAll: () => void;
  onCancel: () => void;
  error?: string | null;
  isLoading?: boolean
}

export const LogoutForm = ({
  onLogout,
  onLogoutAll,
  onCancel,
  isLoading,
  error,
}: LogoutFormProps) => {
  return (
    <FormCard
      title="Выход из аккаунта"
      subtitle="Вы уверены, что хотите выйти?"
      size="lg"
    >
      <div className="flex flex-col gap-1 w-full">
        <div className="flex flex-col gap-2 sm:flex-row w-full justify-center">
          <Button variant="primary" onClick={onLogout} disabled={isLoading}>
            Выйти
          </Button>
          <Button
            variant="danger"
            onClick={onLogoutAll}
            className="text-xs"
            disabled={isLoading}
          >
            Выйти со всех устройств
          </Button>

          <Button variant="secondary" onClick={onCancel} disabled={isLoading}>
            Отмена
          </Button>

        </div>
        <div className="ui-hint">{isLoading && 'Выход...'}</div>
                  <div className={cn('ui-hint', error && 'ui-hint--error')}>
            {error && getTextError(error, logoutErrorMap)}
          </div>
      </div>
    </FormCard>
  );
};
