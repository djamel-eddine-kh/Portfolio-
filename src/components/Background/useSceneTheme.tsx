import React, { createContext, useContext, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { TARGET_VALUES, THEME_TRANSITION_MS, type ThemeSceneValues, createDefaultValues } from '@/constants/scene';

type Theme = 'dark' | 'light';

let _currentTheme: Theme = 'dark';

export function setSceneTheme(theme: Theme) {
  _currentTheme = theme;
}

const SceneThemeCtx = createContext<ThemeSceneValues | null>(null);

function lerpColor(
  current: { r: number; g: number; b: number },
  target: { r: number; g: number; b: number },
  t: number,
) {
  current.r += (target.r - current.r) * t;
  current.g += (target.g - current.g) * t;
  current.b += (target.b - current.b) * t;
}

function lerpNum(current: number, target: number, t: number): number {
  return current + (target - current) * t;
}

export function SceneThemeProvider({ children }: { children: React.ReactNode }) {
  const values = useRef(createDefaultValues(true));
  const { scene } = useThree();

  useFrame((_, delta) => {
    const target = TARGET_VALUES[_currentTheme];
    const t = Math.min(1, (delta * 1000) / THEME_TRANSITION_MS);

    const v = values.current;
    const trg = target;

    lerpColor(v.backgroundTop, trg.backgroundTop, t);
    lerpColor(v.backgroundMid, trg.backgroundMid, t);
    lerpColor(v.backgroundBot, trg.backgroundBot, t);
    lerpColor(v.rimLightColor, trg.rimLightColor, t);
    lerpColor(v.dustColor, trg.dustColor, t);

    v.ambientIntensity = lerpNum(v.ambientIntensity, trg.ambientIntensity, t);
    v.directionalIntensity = lerpNum(v.directionalIntensity, trg.directionalIntensity, t);
    v.rimLightIntensity = lerpNum(v.rimLightIntensity, trg.rimLightIntensity, t);
    v.fillLightIntensity = lerpNum(v.fillLightIntensity, trg.fillLightIntensity, t);
    v.bloomIntensity = lerpNum(v.bloomIntensity, trg.bloomIntensity, t);
    v.bloomThreshold = lerpNum(v.bloomThreshold, trg.bloomThreshold, t);
    v.starOpacity = lerpNum(v.starOpacity, trg.starOpacity, t);
    v.cloudOpacity = lerpNum(v.cloudOpacity, trg.cloudOpacity, t);
    v.dustOpacity = lerpNum(v.dustOpacity, trg.dustOpacity, t);

    scene.background = v.backgroundTop;
  });

  return (
    <SceneThemeCtx.Provider value={values.current}>
      {children}
    </SceneThemeCtx.Provider>
  );
}

export function useSceneTheme(): ThemeSceneValues {
  const ctx = useContext(SceneThemeCtx);
  if (!ctx) throw new Error('useSceneTheme must be used inside SceneThemeProvider');
  return ctx;
}
