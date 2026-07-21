import React from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { FALLBACK_GRADIENT_DARK, FALLBACK_GRADIENT_LIGHT } from '@/constants/scene';

export function Fallback() {
  const { theme } = useTheme();
  return (
    <div
      className="fixed inset-0 z-0 transition-[background] duration-700 ease-in-out"
      style={{ background: theme === 'dark' ? FALLBACK_GRADIENT_DARK : FALLBACK_GRADIENT_LIGHT }}
      aria-hidden="true"
    />
  );
}
