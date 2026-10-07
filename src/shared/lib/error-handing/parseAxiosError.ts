import type { AxiosError } from 'axios';
import type { ProblemDetails } from '../../model/types/errorTypes';

export const parseAxiosError = (error: unknown): ProblemDetails => {
  const axiosError = error as AxiosError<ProblemDetails>;

  return (
    axiosError.response?.data ?? {
      detail: 'unknow error',
    }
  );
};
