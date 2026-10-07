import type { ProblemDetails } from '../../model/types/errorTypes';

export const getTextError = (
  error: ProblemDetails | string,
  errorsMap: Record<string, string>
): string => {
  if (!error) {
    return 'Не удалось выполнить запрос. Проверьте соединение.';
  }

  if (typeof error === 'string') {
    return errorsMap[error] ?? error;
  }

  if (errorsMap[error.detail]) {
    return errorsMap[error.detail];
  }

  if (error.status && error.status >= 500) {
    return 'Сервис временно недоступен. Повторите запрос позже';
  }

  return 'Что-то пошло не так. Повторите попытку позже';
};
