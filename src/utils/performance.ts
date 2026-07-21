import type { QualityTier } from '@/constants/scene';

export function getPixelRatio(tier: QualityTier): number {
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
  switch (tier) {
    case 'low': return Math.min(dpr, 1.5);
    case 'medium': return Math.min(dpr, 2);
    case 'high': return Math.min(dpr, 2);
  }
}

export function getSphereSegments(tier: QualityTier): number {
  switch (tier) {
    case 'low': return 48;
    case 'medium': return 64;
    case 'high': return 96;
  }
}

export function shouldBloom(tier: QualityTier): boolean {
  return tier !== 'low';
}
