import { jwtDecode } from 'jwt-decode';

type JwtPayload = {
  sub?: string;
};

export const getEmailFromToken = (token: string): string | null => {
  try {
    const { sub } = jwtDecode<JwtPayload>(token);
    return sub ?? null;
  } catch {
    return null;
  }
};
