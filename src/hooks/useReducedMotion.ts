'use client';

import { REDUCED_MOTION } from '@/lib/motion';
import { useMediaQuery } from './useMediaQuery';

/** true quando a pessoa pediu ao sistema para reduzir movimento. */
export function useReducedMotion(): boolean {
  return useMediaQuery(REDUCED_MOTION);
}
