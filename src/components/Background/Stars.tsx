import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useDeviceQuality } from '@/hooks/useDeviceQuality';
import { STAR_CONFIG, MOBILE_STAR_CONFIG } from '@/constants/scene';
import { useSceneTheme } from './useSceneTheme';

export function Stars() {
  const reduced = useReducedMotion();
  const quality = useDeviceQuality();
  const pointsRef = useRef<THREE.Points>(null);
  const theme = useSceneTheme();

  const config = quality === 'low' ? MOBILE_STAR_CONFIG : STAR_CONFIG;

  const geometry = useMemo(() => {
    const positions = new Float32Array(config.count * 3);
    const sizes = new Float32Array(config.count);
    // Store per-star random values in attributes for drift animation
    const speeds = new Float32Array(config.count);
    const phases = new Float32Array(config.count);
    const baseX = new Float32Array(config.count);

    for (let i = 0; i < config.count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = config.spread * 0.3 + Math.random() * config.spread * 0.7;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi) * 0.6 + 2;
      const z = -(r * Math.sin(phi) * Math.sin(theta)) - 5;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      sizes[i] = config.size;
      speeds[i] = 0.2 + Math.random() * 0.8;
      phases[i] = Math.random() * Math.PI * 2;
      baseX[i] = x;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
    geo.setAttribute('speed', new THREE.Float32BufferAttribute(speeds, 1));
    geo.setAttribute('phase', new THREE.Float32BufferAttribute(phases, 1));
    geo.setAttribute('baseX', new THREE.Float32BufferAttribute(baseX, 1));
    return geo;
  }, [config]);

  useFrame(({ clock }) => {
    const pts = pointsRef.current;
    if (!pts) return;

    const mat = pts.material as THREE.PointsMaterial;
    mat.opacity = theme.starOpacity;

    if (!reduced) {
      const t = clock.getElapsedTime();
      const pos = geometry.attributes.position;
      const spd = geometry.attributes.speed;
      const ph = geometry.attributes.phase;
      const bx = geometry.attributes.baseX;
      if (pos && spd && ph && bx) {
        for (let i = 0; i < config.count; i++) {
          const drift = Math.sin(t * (spd.array[i] as number) * config.twinkleSpeed + (ph.array[i] as number)) * config.driftSpeed * 0.005;
          pos.array[i * 3] = (bx.array[i] as number) + drift;
        }
        pos.needsUpdate = true;
      }
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={config.size}
        color="#ffffff"
        transparent
        opacity={1}
        sizeAttenuation
        blending={2}
        depthWrite={false}
      />
    </points>
  );
}
