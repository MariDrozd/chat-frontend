import { routePath } from '@/shared/config';
import { clearLoginError } from '@/entities/auth';
import { useAppDispatch } from '@/shared/lib';
import { Button } from '@/shared/ui/button';
import { useNavigate } from 'react-router';

export const RequestNewOtpButton = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onRequestNewOtpHandler = () => {
    dispatch(clearLoginError());
    navigate(routePath.AUTH_EMAIL);
  };
  return (
    <Button variant="primary" onClick={onRequestNewOtpHandler} type="button">
      Запросить новый код
    </Button>
  );
};
