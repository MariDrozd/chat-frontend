import { refreshThunk, selectAuthStatus } from '@/entities/auth';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { ScreenLoader } from '@/shared/ui/screen-loader';
import { Navbar } from '@/widgets/navbar';
import { useEffect } from 'react';
import { Outlet } from 'react-router';

export const RootLayout = () => {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectAuthStatus);

  useEffect(() => {
    if (authStatus === 'unknown') {
      dispatch(refreshThunk());
    }
  }, [dispatch, authStatus]);

  return (
    <div className="min-h-dvh w-full bg-bg-default text-fg-primary">
      <Navbar />
      <main className="pt-navbar min-h-dvh">
        <ScreenLoader
          isOpen={authStatus === 'unknown'}
          label="Загрузка…"
          mode="fullscreen"
        />
        <Outlet />
      </main>
    </div>
  );
};
