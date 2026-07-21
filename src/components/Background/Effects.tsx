import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useSceneTheme } from './useSceneTheme';
import { useDeviceQuality } from '@/hooks/useDeviceQuality';
import { shouldBloom } from '@/utils/performance';

export function Effects() {
  const quality = useDeviceQuality();
  const theme = useSceneTheme();
  const bloomRef = useRef<any>(null);

  useFrame(() => {
    if (bloomRef.current) {
      bloomRef.current.intensity = theme.bloomIntensity;
    }
  });

  if (!shouldBloom(quality)) return null;

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        ref={bloomRef}
        intensity={0.3}
        luminanceThreshold={0.6}
        luminanceSmoothing={0.8}
        mipmapBlur
      />
    </EffectComposer>
  );
}
