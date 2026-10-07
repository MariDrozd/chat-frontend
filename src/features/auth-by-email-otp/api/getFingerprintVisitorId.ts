import FingerprintJS from '@fingerprintjs/fingerprintjs';

const fpPromise = FingerprintJS.load();

export const getFingerprintVisitorId = async () => {
  const fp = await fpPromise;
  const result = await fp.get();

  return result.visitorId;
};
