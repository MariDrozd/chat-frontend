import { isDev, useAppDispatch, useAppSelector } from '@/shared/lib';
import { LogoutForm } from './LogoutForm';
import { useNavigate } from 'react-router';
import {
  logoutAllThunk,
  logoutThunk,
  selectIsLogoutLoading,
} from '@/entities/auth';
import { routePath } from '@/shared/config';
import { useState } from 'react';

export const LogoutPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [logoutError, setLogoutError] = useState<string | null>(null);
  const isLogoutLoading = useAppSelector(selectIsLogoutLoading);

  const onLogout = async () => {
    try {
      setLogoutError(null);
      await dispatch(logoutThunk()).unwrap();
      navigate(routePath.AUTH_EMAIL);
    } catch (err) {
      if (isDev) console.error('Logout error', err);
      setLogoutError('Возникла непредвиденная ошибка. Попробуйте позже');
    }
  };

  const onLogoutAll = async () => {
    try {
      setLogoutError(null);
      await dispatch(logoutAllThunk()).unwrap();
      navigate(routePath.AUTH_EMAIL);
    } catch (err) {
      if (isDev) console.error('LogoutAll error', err);
      setLogoutError('Возникла непредвиденная ошибка. Попробуйте позже');
    }
  };

  const onCancel = () => {
    navigate(-1);
  };

  return (
    <div className="page-center">
      <div className="ui-field">
        <LogoutForm
          onLogout={onLogout}
          onLogoutAll={onLogoutAll}
          onCancel={onCancel}
          error={logoutError}
          isLoading={isLogoutLoading}
        />
      </div>
    </div>
  );
};
