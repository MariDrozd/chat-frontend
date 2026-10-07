import { selectEmail, selectIsAuthorized } from '@/entities/auth';
import { useAppSelector } from '@/shared/lib';
import { useNavigate } from 'react-router';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Button } from '@/shared/ui/button';
import { routePath } from '@/shared/config';

export const Navbar = () => {
  const isAuth = useAppSelector(selectIsAuthorized);
  const email = useAppSelector(selectEmail);
  const navigate = useNavigate();

  const onLogoutHandler = () => {
    navigate(routePath.AUTH_LOGOUT);
  };

  return (
    <div className="flex flex-col w-full fixed top-0 left-0 right-0 h-navbar bg-surface-elevated z-[9999]">
      <div className="flex justify-between items-center w-full flex-1">
        <div className="flex gap-4">
          <span
            className="
            font-semibold tracking-tight
            bg-(image:--gradient-accent)
            bg-clip-text
            text-transparent
            ml-4
            text-2xl
            opacity-80
          "
          >
            Blabster
          </span>
          <ThemeSwitcher />
        </div>

        {isAuth && (
          <div className="flex justify-around items-center gap-4 mr-4">
            <div>{email}</div>
            <Button variant="secondary" size="m" onClick={onLogoutHandler}>
              Выйти
            </Button>
          </div>
        )}
      </div>

      <div className="w-full h-[2px] bg-(image:--gradient-accent) opacity-70"></div>
    </div>
  );
};
