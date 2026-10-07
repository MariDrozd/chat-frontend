import { VerifyOtpStep } from '@/features/auth-by-email-otp';

export const LoginPage = () => {
  return (
    <div className="page-center">
      <VerifyOtpStep />
    </div>
  );
};
