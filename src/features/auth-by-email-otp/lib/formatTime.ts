export const formatTime = (leftSec: number) => {
  const h = Math.floor(leftSec / 3600);
  const min = Math.floor((leftSec % 3600) / 60);
  const sec = leftSec % 60;

  const pad = (num: number) => String(num).padStart(2, '0');

  return h > 0
    ? `${pad(h)}:${pad(min)}:${pad(sec)}`
    : `${pad(min)}:${pad(sec)}`;
};
