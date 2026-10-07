import { EmailOtpRequestStep } from '@/features/auth-by-email-otp';

export const OtpRequestPage = () => {
  return (
    <div className="page-center">
      <EmailOtpRequestStep />
    </div>
  );
};
