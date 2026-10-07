import { selectAuthStatus } from '@/entities/auth';
import { routePath } from '@/shared/config';
import { useAppSelector } from '@/shared/lib';
import { Navigate, Outlet, useLocation } from 'react-router';

export const RequireAuth = () => {
  const status = useAppSelector(selectAuthStatus);
  const location = useLocation();

  if (status === 'unknown') {
    return <div>Loading...</div>;
  }

  if (status !== 'authorized') {
    return (
      <Navigate to={routePath.AUTH_EMAIL} replace state={{ from: location }} />
    );
  }

  return <Outlet />;
};
