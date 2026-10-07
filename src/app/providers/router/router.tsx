import { createBrowserRouter, Navigate } from 'react-router';
import { RootLayout } from './layouts/RootLayout';
import { RequireAuth } from './layouts/RequireAuth';
import { NotFoundPage } from '@/pages/not-found';
import { LogoutPage } from '@/pages/logout';
import { LoginPage, OtpRequestPage } from '@/pages/otp-auth';
import { routePath } from '@/shared/config';
import { MessengerPage } from '@/pages/messenger';

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        index: true,
        element: <Navigate to={routePath.MESSENGER_ACCOUNT} replace />,
      },
      {
        path: routePath.AUTH_EMAIL,
        Component: OtpRequestPage,
      },
      {
        path: routePath.AUTH_OTP,
        Component: LoginPage,
      },
      {
        Component: RequireAuth,
        children: [
          {
            path: routePath.AUTH_LOGOUT,
            Component: LogoutPage,
          },
          {
            path: routePath.MESSENGER_ACCOUNT,
            Component: MessengerPage,
          },
        ],
      },
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
]);
