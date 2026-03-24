import { useRef } from 'react';

export const useScrollReveal = (_opts?: any) => {
  const ref = useRef<HTMLElement>(null);
  return { ref, isVisible: true };
};
