import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useDeviceQuality } from '@/hooks/useDeviceQuality';
import { DUST_CONFIG, MOBILE_DUST_CONFIG } from '@/constants/scene';
import { useSceneTheme } from './useSceneTheme';

export function SpaceDust() {
  const reduced = useReducedMotion();
  const quality = useDeviceQuality();
  const pointsRef = useRef<THREE.Points>(null);
  const theme = useSceneTheme();

  const config = quality === 'low' ? MOBILE_DUST_CONFIG : DUST_CONFIG;

  const geometry = useMemo(() => {
    const positions = new Float32Array(config.count * 3);
    const speeds = new Float32Array(config.count);
    const phases = new Float32Array(config.count);

    for (let i = 0; i < config.count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * config.spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * config.spread * 0.5 + 1;
      positions[i * 3 + 2] = -(Math.random() * config.spread) - 2;
      speeds[i] = config.speed * (0.3 + Math.random() * 0.7);
      phases[i] = Math.random() * Math.PI * 2;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('speed', new THREE.Float32BufferAttribute(speeds, 1));
    geo.setAttribute('phase', new THREE.Float32BufferAttribute(phases, 1));
    return geo;
  }, [config]);

  useFrame(({ clock }) => {
    const pts = pointsRef.current;
    if (!pts) return;

    const mat = pts.material as THREE.PointsMaterial;
    mat.opacity = theme.dustOpacity;
    mat.color.copy(theme.dustColor);

    if (!reduced) {
      const t = clock.getElapsedTime();
      const pos = geometry.attributes.position;
      const spd = geometry.attributes.speed;
      const ph = geometry.attributes.phase;
      if (pos && spd && ph) {
        for (let i = 0; i < config.count; i++) {
          pos.array[i * 3 + 1] += Math.sin(t * (spd.array[i] as number) + (ph.array[i] as number)) * 0.001;
        }
        pos.needsUpdate = true;
      }
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={config.size}
        color="#88bbff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={2}
        depthWrite={false}
      />
    </points>
  );
}
