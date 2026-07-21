import { Color } from 'three';

export type QualityTier = 'low' | 'medium' | 'high';

export interface ThemeSceneValues {
  backgroundTop: Color;
  backgroundMid: Color;
  backgroundBot: Color;
  ambientIntensity: number;
  directionalIntensity: number;
  rimLightColor: Color;
  rimLightIntensity: number;
  fillLightIntensity: number;
  bloomIntensity: number;
  bloomThreshold: number;
  starOpacity: number;
  cloudOpacity: number;
  dustOpacity: number;
  dustColor: Color;
}

export function createDefaultValues(dark: boolean): ThemeSceneValues {
  if (dark) {
    return {
      backgroundTop: new Color('#05070d'),
      backgroundMid: new Color('#0b1020'),
      backgroundBot: new Color('#12182a'),
      ambientIntensity: 0.15,
      directionalIntensity: 0.8,
      rimLightColor: new Color('#4488ff'),
      rimLightIntensity: 0.6,
      fillLightIntensity: 0.1,
      bloomIntensity: 0.3,
      bloomThreshold: 0.6,
      starOpacity: 1,
      cloudOpacity: 0,
      dustOpacity: 0.6,
      dustColor: new Color('#88bbff'),
    };
  }
  return {
    backgroundTop: new Color('#ffffff'),
    backgroundMid: new Color('#f0f4fa'),
    backgroundBot: new Color('#e0eaf5'),
    ambientIntensity: 0.6,
    directionalIntensity: 1.2,
    rimLightColor: new Color('#aaccff'),
    rimLightIntensity: 0.15,
    fillLightIntensity: 0.3,
    bloomIntensity: 0.08,
    bloomThreshold: 0.85,
    starOpacity: 0,
    cloudOpacity: 0.5,
    dustOpacity: 0.15,
    dustColor: new Color('#ffffff'),
  };
}

export const TARGET_VALUES: Record<'dark' | 'light', ThemeSceneValues> = {
  dark: createDefaultValues(true),
  light: createDefaultValues(false),
};

export const THEME_TRANSITION_MS = 700;

export const STAR_CONFIG = {
  count: 600,
  size: 0.05,
  spread: 40,
  twinkleSpeed: 0.3,
  driftSpeed: 0.02,
};

export const MOBILE_STAR_CONFIG = {
  count: 200,
  size: 0.04,
  spread: 30,
  twinkleSpeed: 0.2,
  driftSpeed: 0.01,
};

export const DUST_CONFIG = {
  count: 120,
  size: 0.03,
  spread: 15,
  speed: 0.15,
};

export const MOBILE_DUST_CONFIG = {
  count: 50,
  size: 0.02,
  spread: 10,
  speed: 0.1,
};

export const CLOUD_CONFIG = {
  layers: 3,
  maxOpacity: 0.15,
  speed: 0.03,
  spread: 12,
};

export const CAMERA_CONFIG = {
  position: { x: 0, y: 0.5, z: 8 },
  parallaxSmoothFactor: 0.05,
  maxParallaxPixels: 8,
  scrollSmoothFactor: 0.03,
};

export const SHOOTING_STAR_CONFIG = {
  intervalMin: 20000,
  intervalMax: 40000,
  speed: 0.8,
};

export const FALLBACK_GRADIENT_DARK = 'linear-gradient(135deg, #05070d 0%, #0b1020 50%, #12182a 100%)';
export const FALLBACK_GRADIENT_LIGHT = 'linear-gradient(180deg, #ffffff 0%, #f0f4fa 50%, #e0eaf5 100%)';
