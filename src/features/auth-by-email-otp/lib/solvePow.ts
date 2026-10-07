import type { PowChallengeDto } from '@/shared/api';
import { sha256Hex } from './sha256Hex';

export type SolvePowAnswer = {
  nonce: number;
  hash: string;
};

export const solvePow = async (
  {
    prefix,
    salt,
    difficulty,
  }: Pick<PowChallengeDto, 'prefix' | 'salt' | 'difficulty'>,
  abortSignal: AbortSignal
): Promise<SolvePowAnswer> => {
  const target = '0'.repeat(difficulty);
  let nonce = 0;

  while (true) {
    if (abortSignal?.aborted) {
      throw new Error('PoW aborted');
    }

    const input = `${prefix}${salt}${nonce}`;
    const hash = await sha256Hex(input);

    if (hash.startsWith(target)) {
      return { nonce, hash };
    }

    nonce++;
  }
};
