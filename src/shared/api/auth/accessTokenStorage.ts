let accessToken: string | null = null;

export const accessTokenStorage = {
  get(): string | null {
    return accessToken;
  },
  set(value: string) {
    accessToken = value;
  },
  clear() {
    accessToken = null;
  },
};
