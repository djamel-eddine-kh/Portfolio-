import { useState, useEffect } from 'react';
import type { QualityTier } from '@/constants/scene';

function getQuality(): QualityTier {
  if (typeof window === 'undefined') return 'high';
  const width = window.innerWidth;
  const dpr = window.devicePixelRatio || 1;

  if (width < 640 || dpr <= 1) return 'low';
  if (width < 1024 || dpr <= 2) return 'medium';
  return 'high';
}

export function useDeviceQuality(): QualityTier {
  const [quality, setQuality] = useState<QualityTier>(getQuality);

  useEffect(() => {
    let ticking = false;
    const handler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setQuality(getQuality());
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return quality;
}
