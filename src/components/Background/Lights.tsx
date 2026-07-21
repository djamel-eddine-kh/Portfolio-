import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { AmbientLight, DirectionalLight } from 'three';
import { useSceneTheme } from './useSceneTheme';

export function Lights() {
  const ambientRef = useRef<AmbientLight>(null);
  const dirRef = useRef<DirectionalLight>(null);
  const rimRef = useRef<DirectionalLight>(null);
  const fillRef = useRef<DirectionalLight>(null);
  const theme = useSceneTheme();

  useFrame(() => {
    if (ambientRef.current) ambientRef.current.intensity = theme.ambientIntensity;
    if (dirRef.current) dirRef.current.intensity = theme.directionalIntensity;
    if (rimRef.current) {
      rimRef.current.intensity = theme.rimLightIntensity;
      rimRef.current.color.copy(theme.rimLightColor);
    }
    if (fillRef.current) fillRef.current.intensity = theme.fillLightIntensity;
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.15} color="#ffffff" />
      <directionalLight ref={dirRef} position={[5, 5, 5]} intensity={0.8} color="#ffffff" castShadow={false} />
      <directionalLight ref={rimRef} position={[-3, 2, -4]} intensity={0.6} color="#4488ff" />
      <directionalLight ref={fillRef} position={[0, -3, 2]} intensity={0.1} color="#ffffff" />
    </>
  );
}
